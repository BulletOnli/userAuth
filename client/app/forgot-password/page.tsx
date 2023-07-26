"use client";
import { FormEvent, useEffect, useState } from "react";
import { checkTokenStatus } from "../utils/accessToken";
import { redirect, useRouter } from "next/navigation";
import { Button, FormLabel, HStack, Input, useToast } from "@chakra-ui/react";
import { getVerificationCode } from "../api/userApi";

const ForgotPasswordPage = () => {
    const toast = useToast();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [inputCode, setInputCode] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    const verifyEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (verificationCode === inputCode) {
            setInputCode("");
            setEmail("");

            toast({
                title: "Your email is verified!",
                status: "info",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
            router.push("/change-password");
        } else {
            toast({
                title: "Wrong verification code",
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
        if (checkTokenStatus()) {
            redirect("/");
        }
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[20rem] flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                <h1 className="w-full text-lg font-bold tracking-wide mb-4">
                    Verify your Email
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

                <form onSubmit={verifyEmail}>
                    <FormLabel mt={8}>Verification Code: </FormLabel>
                    <Input
                        type="text"
                        textAlign="center"
                        onChange={(e) => setInputCode(e.target.value)}
                        value={inputCode}
                        required
                    />
                    <Button
                        w={"full"}
                        mt={4}
                        colorScheme="blue"
                        fontSize="sm"
                        isDisabled={inputCode.length < 5}
                        type="submit"
                    >
                        Verify Email
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
