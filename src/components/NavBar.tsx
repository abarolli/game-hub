import { HStack, Image, Input } from "@chakra-ui/react";
import React from "react";

import GameHubSwitch from "./GameHubSwitch";

import logo from "../assets/logo.webp";

function NavBar() {
  return (
    <HStack paddingX="100px">
      <Image src={logo} h="80px" />
      <Input placeholder="Search..." borderRadius="50px" />
      <GameHubSwitch label="Dark Mode" />
    </HStack>
  );
}

export default NavBar;
