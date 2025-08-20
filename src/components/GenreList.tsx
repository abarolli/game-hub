import { Box, Stack } from "@chakra-ui/react";
import React from "react";

import GenreListItem, { GenreProps } from "./GenreListItem";

interface GenreListProps {
	genres: GenreProps[];
	selected: number | null;
	onClick: (id: number) => void;
}

function GenreList({ genres, selected, onClick }: GenreListProps) {
	return (
		<Stack>
			{genres.map((genre) => (
				<Box key={genre.id} mb="5px" >
					<GenreListItem
						id={genre.id}
						label={genre.label}
						imgSrc={genre.imgSrc}
						onClick={onClick}
						className={genre.id === selected ? "selected" : ""}
					/>
				</Box>
			))}
		</Stack>
	);
}

export default GenreList;
