import { Box, Stack } from "@chakra-ui/react";
import React from "react";

import CategoriesListItem, { Category } from "./CategoriesListItem";

function CategoriesList({ categories }: { categories: Category[] }) {
  return (
    <Stack>
      {categories.map((category) => (
        <Box mb="15px">
          <CategoriesListItem label={category.label} imgUrl={category.imgUrl} />
        </Box>
      ))}
    </Stack>
  );
}

export default CategoriesList;
