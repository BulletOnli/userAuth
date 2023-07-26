"use client";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { checkTokenStatus } from "./utils/accessToken";
import { redirect, useRouter } from "next/navigation";
import { getUser } from "./api/userApi";
import { Button, HStack } from "@chakra-ui/react";
import Link from "next/link";

const Homepage = () => {
    const router = useRouter();
    const userQuery = useQuery("user", getUser);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    useEffect(() => {
        if (!checkTokenStatus()) {
            redirect("/login");
        }
    }, []);

    if (userQuery.isLoading) {
        return <div>Loading user...</div>;
    }

    return (
        <div className="w-full h-screen flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mt-4">{userQuery.data}</h1>
            <HStack mt={4}>
                <Button as={Link} href="/change-password" colorScheme="blue">
                    Change password
                </Button>
                <Button colorScheme="red" onClick={handleLogout}>
                    Logout
                </Button>
            </HStack>
        </div>
    );
};

export default Homepage;
