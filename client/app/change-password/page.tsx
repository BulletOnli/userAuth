"use client";
import { Button, FormLabel, HStack, Input, useToast } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { checkTokenStatus } from "../utils/accessToken";
import { redirect, useRouter } from "next/navigation";
import { changePassword } from "../api/userApi";

const ChangePasswordPage = () => {
    const toast = useToast();
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await changePassword({ oldPassword, newPassword });

            setIsLoading(false);
            toast({
                title: "You've changed your password",
                status: "info",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });

            localStorage.removeItem("token");
            router.push("/login");
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
        if (!checkTokenStatus()) {
            redirect("/login");
        }
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[20rem] flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                <h1 className="w-full text-lg font-bold tracking-wide">
                    Change your password
                </h1>
                <form onSubmit={handleSubmit}>
                    <FormLabel mt={4}>Old Password: </FormLabel>
                    <Input
                        type="password"
                        textAlign="center"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <FormLabel mt={4}>New Password: </FormLabel>
                    <Input
                        type="password"
                        textAlign="center"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        Change password
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
