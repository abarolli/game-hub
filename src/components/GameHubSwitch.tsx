import React from "react";
import { Switch } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

function GameHubSwitch({ label }: { label: string }) {
	return (
		<Switch.Root>
			<Switch.HiddenInput />
			<Switch.Control>
				<Switch.Thumb></Switch.Thumb>
			</Switch.Control>
			<Switch.Label whiteSpace="nowrap">{label}</Switch.Label>
		</Switch.Root>
	);
}

export default GameHubSwitch;
