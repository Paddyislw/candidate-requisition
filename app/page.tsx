"use client";
import ParentForm from "@/components/ParentForm";
import HomeLayout from "@/containers/home/HomeLayout";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <div>
      {/* <ParentForm /> */}
      <ChakraProvider>
        <HomeLayout />
      </ChakraProvider>
    </div>
  );
};

export default Home;
