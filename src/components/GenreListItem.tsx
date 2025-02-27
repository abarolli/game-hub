import React from "react";
import { HStack, Image, Text, Button } from "@chakra-ui/react";

import Entity from "./Entity";

export interface GenreProps extends Entity {
  label: string;
  imgSrc: string;
  onClick?: (id: number) => void;
}

function GenreListItem({ id, label, imgSrc, onClick }: GenreProps) {
  return (
    <Button p="10px" variant="ghost" onClick={() => onClick(id)} h="fit">
      <HStack>
        <Image mr="15px" w="50px" h="50px" src={imgSrc} borderRadius="xl" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
}

export default GenreListItem;
