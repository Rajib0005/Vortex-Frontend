import { decodeToken, getUserRole, type DecodedToken } from "@/lib/auth-utils";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthState {
    isAuthenticated: boolean;
    userEmail: string | null;
    role: string | string[] | null;
    token: string | null;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        userEmail: null,
        role: null,
        token: null,
        isLoading: true,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = decodeToken(token);
            const isExpired = decodedUser && decodedUser.exp ? decodedUser.exp <= (Date.now() / 1000) : true;

            if (!isExpired && decodedUser) {
                setAuthState({
                    isAuthenticated: true,
                    userEmail: decodedUser.email ?? null,
                    role: getUserRole(decodedUser),
                    token,
                    isLoading: false,
                });
            } else {
                localStorage.removeItem("token");
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        const decodedUser = decodeToken(newToken);
        console.log(decodedUser);
        setAuthState({
            isAuthenticated: true,
            userEmail: decodedUser?.email ?? null,
            role: getUserRole(decodedUser),
            token: newToken,
            isLoading: false,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthState({
            isAuthenticated: false,
            userEmail: null,
            role: null,
            token: null,
            isLoading: false,
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