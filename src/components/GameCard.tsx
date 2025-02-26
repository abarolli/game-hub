import React from "react";
import { IconType } from "react-icons";
import { Badge, Card, HStack, Image } from "@chakra-ui/react";

import { PlatformType } from "@/uiConfigs/platformIcons";
import Entity from "./Entity";

export interface Platform extends Entity {
  name: PlatformType;
  icon: IconType;
}

export interface GameProps extends Entity {
  imgSrc: string;
  gameTitle: string;
  criticScore: number;
  platforms: Platform[];
}

function GameCard({ gameTitle, imgSrc, criticScore, platforms }: GameProps) {
  const platformsAsIcons = platforms.map((platform) => (
    <platform.icon key={platform.id} />
  ));

  return (
    <Card.Root rounded="xl">
      <Image h="xs" src={imgSrc} alt={gameTitle} roundedTop="xl" />
      <Card.Body>
        <HStack mb="20px" justifyContent="space-between">
          <HStack>{platformsAsIcons}</HStack>
          <Badge w="fit" paddingX="10px" colorPalette="green">
            {criticScore}
          </Badge>
        </HStack>
        <Card.Title fontWeight="bolder" fontSize="1.5rem">
          {gameTitle}
        </Card.Title>
      </Card.Body>
    </Card.Root>
  );
}

export default GameCard;
