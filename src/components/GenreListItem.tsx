import React from "react";
import { HStack, Image, Text } from "@chakra-ui/react";

export interface GenreProps {
  label: string;
  imgSrc: string;
}

function GenreListItem({ label, imgSrc }: GenreProps) {
  return (
    <HStack>
      <Image mr="15px" w="60px" h="60px" src={imgSrc} borderRadius="xl" />
      <Text>{label}</Text>
    </HStack>
  );
}

export default GenreListItem;
