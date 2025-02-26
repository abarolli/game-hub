import React, { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import CategoriesList from "./components/CategoriesList";
import { Category } from "./components/CategoriesListItem";
import GameCard, { GameProps, Platform } from "./components/GameCard";
import { Box, Flex, SimpleGrid, Heading, GridItem } from "@chakra-ui/react";

import rawgClient from "./service/apiClient";
import platformIcons from "./uiConfigs/platformIcons";

import Entity from "./components/Entity";
import RawgHTTPService from "./service/rawgHttpService";

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

interface RawgGenre extends Entity {
  name: string;
  background_image: string;
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);
  const gamesHttpService = new RawgHTTPService<RawgGame>("/games", rawgClient);
  const genresHttpService = new RawgHTTPService<RawgGame>(
    "/genres",
    rawgClient
  );

  const populateGames = () => {
    const newGames: GameProps[] = [];
    gamesHttpService.getAll().then((games) => {
      for (let game of games) {
        newGames.push({
          id: game.id,
          gameTitle: game.name,
          imgSrc: game.background_image,
          criticScore: game.metacritic,
          platforms: game.parent_platforms.map((p) => {
            return {
              id: p.platform.id,
              name: p.platform.name,
              icon: platformIcons[p.platform.name],
            } as Platform;
          }),
        });
      }
      setGames(newGames);
    });
  };

  useEffect(populateGames, []);

  return (
    <>
      <NavBar />
      <Flex>
        <Box w="300px" p="20px">
          <Heading mb="30px">Genres</Heading>
          <CategoriesList categories={categories} />
        </Box>
        <SimpleGrid
          minChildWidth="xs"
          columnGap="20px"
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
