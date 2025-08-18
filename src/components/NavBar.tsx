import React from "react";
import { HStack, Image, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColorModeButton } from "./ui/color-mode";

import { InputGroup } from "./ui/input-group";
import { BsSearch } from "react-icons/bs";
import GameHubSwitch from "./GameHubSwitch";
import logo from "../assets/logo.webp";
import { Field } from "./ui/field";

export interface SearchForm {
	searchValue: string;
}

interface NavBarProps {
	onSubmit: SubmitHandler<SearchForm>;
}

function NavBar({ onSubmit }: NavBarProps) {
	const { register, handleSubmit } = useForm<SearchForm>();

	return (
		<HStack paddingX="100px">
			<Image src={logo} h="80px" />
			<form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
				<Field>
					<InputGroup w="100%" startElement={<BsSearch />}>
						<Input
							{...register("searchValue")}
							placeholder="Search..."
							borderRadius="full"
						/>
					</InputGroup>
				</Field>
			</form>
			<ColorModeButton />

		</HStack>
	);
}

export default NavBar;
