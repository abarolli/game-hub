import React, { JSX } from "react";
import { IconType } from "react-icons";
import { Badge, Card, HStack, Image, Text } from "@chakra-ui/react";

import { PlatformType } from "@/uiConfigs/platformIcons";
import Entity from "./Entity";
import { LuGamepad } from "react-icons/lu";

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
	const platformsAsIcons = () => {
		const MAX_ICONS = 5;
		const platformsAsIcons: JSX.Element[] = [];

		for (let i = 0; i < Math.min(platforms.length, MAX_ICONS); i++) {
			const platform = platforms[i];
			platformsAsIcons.push(
				platform.icon ? <platform.icon key={platform.id} /> : <LuGamepad />
			);
		}
		if (platforms.length - MAX_ICONS > 0)
			platformsAsIcons.push(
				<Text key={-1}>+{platforms.length - MAX_ICONS}</Text>
			);

		return platformsAsIcons;
	};

	const criticScoreBadgeColor = (score: number): string => {
		if (score === undefined || score === null) return "gray";
		return criticScore > 60 ? "green" : "red";
	};

	return (
		<Card.Root rounded="xl">
			<Image h="xs" src={imgSrc} alt={gameTitle} roundedTop="xl" />
			<Card.Body>
				<HStack mb="20px" justifyContent="space-between">
					<HStack>{platformsAsIcons()}</HStack>
					<Badge
						w="fit"
						paddingX="10px"
						colorPalette={criticScoreBadgeColor(criticScore)}
					>
						{criticScore ?? <Text>Score Unavailable</Text>}
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
