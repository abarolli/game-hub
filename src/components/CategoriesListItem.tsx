import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

export type Category = { label: string; imgSrc: string };

function CategoriesListItem({ label, imgSrc: imgUrl }: Category) {
  return (
    <HStack>
      <Image mr="15px" w="60px" h="60px" src={imgUrl} borderRadius="xl" />
      <Text>{label}</Text>
    </HStack>
  );
}

export default CategoriesListItem;
