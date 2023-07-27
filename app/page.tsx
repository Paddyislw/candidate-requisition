"use client";
import HomeLayout from "@/containers/home/HomeLayout";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <div>
      <ChakraProvider>
        <HomeLayout />
      </ChakraProvider>
    </div>
  );
};

export default Home;
