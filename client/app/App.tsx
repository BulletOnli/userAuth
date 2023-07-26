"use client";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

const App = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <main className="w-full min-h-screen flex justify-center bg-gray-100">
                        {children}
                    </main>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
};

export default App;
