import { Badge, Card, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

export interface Platform {
  name: string;
  icon: IconType;
}

export interface GameProps {
  imgSrc: string;
  gameTitle: string;
  criticScore: number;
  platforms: Platform[];
}

function GameCard({ gameTitle, imgSrc, criticScore, platforms }: GameProps) {
  return (
    <Card.Root maxW="sm">
      <Image src={imgSrc} alt={gameTitle} />
      <Card.Body>
        <HStack mb="20px" justifyContent="space-between">
          <HStack>
            {platforms.map((platform) => (
              <platform.icon />
            ))}
          </HStack>
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
