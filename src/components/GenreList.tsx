import { Box, Stack } from "@chakra-ui/react";
import React from "react";

import GenreListItem, { GenreProps } from "./GenreListItem";

function GenreList({ genres }: { genres: GenreProps[] }) {
  return (
    <Stack>
      {genres.map((genre) => (
        <Box key={genre.label} mb="15px">
          <GenreListItem label={genre.label} imgSrc={genre.imgSrc} />
        </Box>
      ))}
    </Stack>
  );
}

export default GenreList;
