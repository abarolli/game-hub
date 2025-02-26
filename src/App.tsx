import React, { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { GenreProps } from "./components/GenreListItem";
import GameCard, { GameProps, Platform } from "./components/GameCard";
import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  GridItem,
  createListCollection,
} from "@chakra-ui/react";

import rawgClient from "./service/apiClient";
import platformIcons, { PlatformType } from "./uiConfigs/platformIcons";

import Entity from "./components/Entity";
import RawgHTTPService from "./service/rawgHttpService";
import Selection from "./components/Selection";

interface RawgGame extends Entity {
  name: string;
  metacritic: number;
  background_image: string;
  parent_platforms: { platform: Platform }[];
}

interface RawgGenre extends Entity {
  name: string;
  image_background: string;
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const gamesHttpService = new RawgHTTPService<RawgGame>("/games", rawgClient);
  const genresHttpService = new RawgHTTPService<RawgGenre>(
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

  const populateGenres = () => {
    const newGenres: GenreProps[] = [];
    genresHttpService.getAll().then((genres) => {
      for (let genre of genres) {
        console.log(genre.image_background);
        newGenres.push({ label: genre.name, imgSrc: genre.image_background });
      }
      setGenres(newGenres);
    });
  };

  useEffect(populateGames, []);
  useEffect(populateGenres, []);

  const getPlatforms = () => {
    const platforms: PlatformType[] = [];
    for (let platform in platformIcons)
      platforms.push(platform as PlatformType);
    return platforms;
  };
  const platformOptions = createListCollection({
    items: getPlatforms().map((platform) => {
      return { label: platform, value: platform };
    }),
  });
  return (
    <>
      <Box mb="30px">
        <NavBar />
      </Box>
      <Flex>
        <Box w="300px" p="20px">
          <Heading mb="30px">Genres</Heading>
          <GenreList genres={genres} />
        </Box>
        <SimpleGrid
          minChildWidth="xs"
          columnGap="20px"
          rowGap="20px"
          padding="20px"
          flex="1"
        >
          <GridItem gridColumn="1 / -1">
            <Heading mb="20px" fontSize="2rem" fontWeight="bolder">
              Games
            </Heading>
            <Box w="175px">
              <Selection collection={platformOptions} placeholder="Platforms" />
            </Box>
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
