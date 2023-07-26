"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { loginUser } from "../api/userApi";
import { checkTokenStatus } from "../utils/accessToken";
import { redirect, useRouter } from "next/navigation";
import { Button, useToast } from "@chakra-ui/react";

export type LoginCredentials = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const toast = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState<LoginCredentials>({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setLoginDetails((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await loginUser(loginDetails);
            setIsLoading(false);

            toast({
                title: "Login Success",
                status: "success",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
            router.push("/");
            setLoginDetails({
                email: "",
                password: "",
            });
        } catch (error: any) {
            console.log(error);
            setIsLoading(false);
            const err =
                error.response.data.error.message || "An error occurred";
            toast({
                title: err,
                status: "error",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
        }
    };

    useEffect(() => {
        if (checkTokenStatus()) {
            redirect("/");
        }
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-full max-w-xs">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            colorScheme="blue"
                            type="submit"
                            isLoading={isLoading}
                            spinnerPlacement="start"
                        >
                            Login
                        </Button>
                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    Dont have an acount?{" "}
                    <Link
                        href="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
