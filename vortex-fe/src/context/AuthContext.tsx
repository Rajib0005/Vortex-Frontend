import { useMeQuery } from "@/feature/auth/services/api";
import { decodeToken, getUserRole, type DecodedToken } from "@/lib/auth-utils";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthState {
    isAuthenticated: boolean;
    userEmail: string | null;
    role: string | string[] | null;
    token: string | null;
    isLoading: boolean;
    userId: string | null;
}

interface AuthContextType extends AuthState {
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const [authState, setAuthState] = useState<AuthState>(() => {
        const token = localStorage.getItem("token");
        return {
            isAuthenticated: !!token,
            userEmail: null,
            role: null,
            token: token,
            isLoading: !!token,
            userId: null,
        };
    });

    const { data: user, isLoading: isUserLoading, isError } = useMeQuery({
        enabled: !!authState.token,
    });

    useEffect(() => {
        if (user?.data) {
            setAuthState(prev => ({
                ...prev,
                userId: user.data.id,
                userEmail: user.data.email,
                role: getUserRole(user.data.roleName),
                isLoading: false,
            }));
        } else if ((!isUserLoading && authState.token && !user) || isError) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, [user, isUserLoading, authState.token, isError]);

    useEffect(() => {
        const token = authState.token;
        if (token) {
            const decodedUser = decodeToken(token);
            const isExpired = decodedUser && decodedUser.exp ? decodedUser.exp <= (Date.now() / 1000) : true;

            if (isExpired) {
                logout();
            }
        } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setAuthState({
            isAuthenticated: true,
            userEmail: null,
            role: null,
            token: newToken,
            isLoading: true,
            userId: null,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        queryClient.clear();
        setAuthState({
            isAuthenticated: false,
            userEmail: null,
            role: null,
            token: null,
            isLoading: false,
            userId: null,
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;