import React, { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import CategoriesList from "./components/CategoriesList";
import { Category } from "./components/CategoriesListItem";
import GameCard, { GameProps, Platform } from "./components/GameCard";
import { Box, Flex, SimpleGrid, Heading, GridItem } from "@chakra-ui/react";
import rawgClient from "./service/apiClient";

import platformIcons from "./uiConfigs/platformIcons";
import Entity from "./components/Entity";

const categories: Category[] = [
  {
    label: "Indie",
    imgSrc:
      "https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg",
  },
  {
    label: "Action",
    imgSrc:
      "https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
  },
];

interface RawgGame extends Entity {
  name: string;
  metacritic: number;
  background_image: string;
  parent_platforms: { platform: Platform }[];
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    const newGames: GameProps[] = [];
    rawgClient.get<{ results: RawgGame[] }>("/games").then(({ data }) => {
      for (let result of data.results) {
        const game = {
          id: result.id,
          gameTitle: result.name,
          imgSrc: result.background_image,
          criticScore: result.metacritic,
          platforms: result.parent_platforms.map((p) => {
            return {
              id: p.platform.id,
              name: p.platform.name,
              icon: platformIcons[p.platform.name],
            } as Platform;
          }),
        };
        newGames.push(game);
      }

      setGames(newGames);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Flex>
        <Box w="300px" p="20px">
          <Heading mb="30px">Genres</Heading>
          <CategoriesList categories={categories} />
        </Box>
        <SimpleGrid
          minChildWidth="sm"
          columnGap="40px"
          rowGap="20px"
          padding="20px"
          flex="1"
        >
          <GridItem gridColumn="1 / -1">
            <Heading fontSize="2rem" fontWeight="bolder">
              Games
            </Heading>
          </GridItem>
          {games.map((game) => {
            return <GameCard key={game.id} {...game} />;
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
}

export default App;
