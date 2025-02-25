import { HStack, Image, Input } from "@chakra-ui/react";
import React from "react";
import { InputGroup } from "./ui/input-group";
import { BsSearch } from "react-icons/bs";

import GameHubSwitch from "./GameHubSwitch";
import logo from "../assets/logo.webp";

function NavBar() {
  return (
    <HStack paddingX="100px">
      <Image src={logo} h="80px" />
      <InputGroup flex="1" startElement={<BsSearch />}>
        <Input placeholder="Search..." borderRadius="full" />
      </InputGroup>
      <GameHubSwitch label="Dark Mode" />
    </HStack>
  );
}

export default NavBar;
