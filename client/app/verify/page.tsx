"use client";
import { FormEvent, useEffect, useState } from "react";
import { checkTokenStatus } from "../utils/accessToken";
import { redirect, useRouter } from "next/navigation";
import { Button, FormLabel, HStack, Input, useToast } from "@chakra-ui/react";
import { getVerificationCode, verifyUser } from "../api/userApi";

const VerifyPage = () => {
    const toast = useToast();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [inputCode, setInputCode] = useState(""); // user input
    const [verificationCode, setVerificationCode] = useState(""); // Legit verification code
    const [password, setPassword] = useState("");

    const verifyAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (verificationCode !== inputCode) {
                setIsLoading(false);
                toast({
                    title: "Wrong verification code",
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                    position: "top",
                    variant: "top-accent",
                });
                return;
            }
            await verifyUser({ email, password });

            setIsLoading(false);
            setInputCode("");
            setEmail("");
            toast({
                title: "Your Account is now verified!",
                status: "info",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
            router.push("/");
        } catch (error: any) {
            setIsLoading(false);
            console.log(error);
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

    const sendCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await getVerificationCode(email);
            setVerificationCode(res.verificationCode);
            localStorage.setItem("token", res.token);

            setIsLoading(false);
            toast({
                title: "Verification sent to your email",
                status: "info",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
        } catch (error: any) {
            setIsLoading(false);
            console.log(error);
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
        if (!checkTokenStatus()) {
            redirect("/login");
        }
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[20rem] flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                <h1 className="w-full text-lg font-bold tracking-wide mb-4">
                    Verify your Account
                </h1>
                <form onSubmit={sendCode}>
                    <HStack>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <Button
                            colorScheme="blue"
                            fontSize="sm"
                            type="submit"
                            isLoading={isLoading}
                            spinnerPlacement="start"
                        >
                            Send Code
                        </Button>
                    </HStack>
                </form>

                <form onSubmit={verifyAccount}>
                    <Input
                        type="text"
                        textAlign="center"
                        placeholder="Verification code"
                        mt={4}
                        onChange={(e) => setInputCode(e.target.value)}
                        value={inputCode}
                        required
                    />
                    <Input
                        type="text"
                        textAlign="center"
                        placeholder="Password"
                        mt={4}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        w={"full"}
                        mt={4}
                        colorScheme="blue"
                        fontSize="sm"
                        type="submit"
                        isLoading={isLoading}
                        spinnerPlacement="start"
                    >
                        Verify
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPage;
