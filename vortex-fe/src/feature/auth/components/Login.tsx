import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { useNavigate, useLocation } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed, Github, Gitlab, Slack } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginSchema, type LoginModel } from "../model/login.type"
import { useState } from "react"
import { useLoginMutation } from "../services/api"
import { useAuth } from "@/context/AuthContext"
import { useQueryClient } from "@tanstack/react-query"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { mutate: loginUser, isPending, error } = useLoginMutation();
    const queryClient = useQueryClient();

    const form = useForm<LoginModel>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
        mode: 'onChange'
    });

    const onLogin = (values: LoginModel) => {
        loginUser(
            { email: values.email, password: values.password },
            {
                onSuccess: (response) => {
                    if (response.data) {
                        login(response.data);
                        queryClient.invalidateQueries({ queryKey: ["me"] });
                        queryClient.invalidateQueries({ queryKey: ["projects"] });
                        let from = location.state?.from?.pathname || "/projects";
                        if (from === "/") from = "/projects";
                        navigate(from, { replace: true });
                    }
                },
                onError: (err) => {
                    console.error("Login Error:", err);
                }
            }
        );
    }

    return (
        <div className="flex justify-center items-center">
            <Card className="w-full max-w-sm my-30">
                <CardHeader className="space-y-3 items-center text-center">
                    <div className="flex flex-col items-center gap-2 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-indigo-500 text-white font-bold text-xl shadow-sm">
                            V
                        </div>
                        <span className="font-semibold text-lg tracking-tight">Vortex</span>
                    </div>
                    <div>
                        <CardTitle className="text-xl">Login to your account</CardTitle>
                        <CardDescription className="mt-1">
                            Enter your email below to login to your account
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{ required: 'email is invalid' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="username@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Password</FormLabel>
                                            <Button
                                                type="button"
                                                variant="link"
                                                size="sm"
                                                className="px-0 font-normal"
                                            >
                                                Forgot your password ?
                                            </Button>
                                        </div>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    className="pr-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {!showPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error ? (
                                <div className="text-sm font-medium text-destructive">
                                    {error.message || "An error occurred during login."}
                                </div>
                            ) : null}
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <span>or sign in with</span>
                    <ButtonGroup className="flex justify-center items-center gap-3">
                        <Button variant="outline" disabled={true} size={'icon'}>
                            <Github />
                        </Button>
                        <ButtonGroupSeparator />
                        <Button variant="outline" disabled={true} size={'icon'}>
                            <Slack />
                        </Button>
                        <ButtonGroupSeparator />
                        <Button variant="outline" disabled={true} size={'icon'}>
                            <Gitlab />
                        </Button>
                        <ButtonGroupSeparator />
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login;
