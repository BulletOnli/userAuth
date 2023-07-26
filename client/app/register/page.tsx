"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerUser } from "../api/userApi";
import { useRouter } from "next/navigation";
import { Button, useToast } from "@chakra-ui/react";

export type RegisterCredentials = {
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterPage = () => {
    const toast = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [registerDetails, setRegisterDetails] = useState<RegisterCredentials>(
        {
            email: "",
            password: "",
            confirmPassword: "",
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setRegisterDetails((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await registerUser(registerDetails);
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
            setRegisterDetails({
                email: "",
                password: "",
                confirmPassword: "",
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

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-full max-w-xs">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            // for="email"
                        >
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            // for="password"
                        >
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            // for="password"
                        >
                            Confirm Password
                        </label>
                        <input
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm password"
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
                            Sign up
                        </Button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
