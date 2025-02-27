import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  GridItem,
  createListCollection,
  ListCollection,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";

import GameCard, { GameProps, Platform } from "./components/GameCard";
import NavBar, { SearchForm } from "./components/NavBar";
import GenreList from "./components/GenreList";
import { GenreProps } from "./components/GenreListItem";
import rawgClient from "./service/apiClient";
import platformIcons from "./uiConfigs/platformIcons";
import Entity from "./components/Entity";
import RawgHTTPService from "./service/rawgHttpService";
import Selection, { SelectionInfo } from "./components/Selection";

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

interface RawgPlatform extends Entity {
  name: string;
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [platformOptions, setPlatformOptions] =
    useState<ListCollection<SelectionInfo>>();

  const gamesHttpService = new RawgHTTPService<RawgGame>("/games", rawgClient);
  const genresHttpService = new RawgHTTPService<RawgGenre>(
    "/genres",
    rawgClient
  );
  const platformsHttpService = new RawgHTTPService<RawgPlatform>(
    "/platforms/lists/parents",
    rawgClient
  );

  const rawgGameToGameProps = (game: RawgGame): GameProps => {
    return {
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
    };
  };

  const updateGames = (games: RawgGame[]) => {
    const newGames: GameProps[] = [];
    for (let game of games) newGames.push(rawgGameToGameProps(game));
    setGames(newGames);
  };

  const populateGames = () => {
    gamesHttpService.getAll().then((games) => updateGames(games));
  };

  const rawgGenreToGenreProps = (genre: RawgGenre): GenreProps => {
    return { label: genre.name, imgSrc: genre.image_background };
  };

  const populateGenres = () => {
    genresHttpService.getAll().then((genres) => {
      const newGenres: GenreProps[] = [];
      for (let genre of genres) newGenres.push(rawgGenreToGenreProps(genre));
      setGenres(newGenres);
    });
  };

  const populatePlatformOptions = () => {
    platformsHttpService.getAll().then((platforms) => {
      setPlatformOptions(
        createListCollection({
          items: platforms.map((platform) => {
            return {
              id: platform.id,
              label: platform.name,
              value: platform.name,
            };
          }),
        })
      );
    });
  };

  useEffect(populateGames, []);
  useEffect(populateGenres, []);
  useEffect(populatePlatformOptions, []);

  const searchHandler: SubmitHandler<SearchForm> = (data) => {
    gamesHttpService
      .find({ search: data.searchValue })
      .then((games) => updateGames(games));
  };

  const platformSelectHandler = (id: number) => {
    gamesHttpService
      .find({ parent_platforms: id })
      .then((games) => updateGames(games));
  };

  return (
    <>
      <Box mb="30px">
        <NavBar onSubmit={searchHandler} />
      </Box>
      <Flex justifyContent="center">
        <Flex maxW="1500px" w="100%">
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
                {platformOptions && (
                  <Selection
                    onSelect={platformSelectHandler}
                    collection={platformOptions}
                    placeholder="Platforms"
                  />
                )}
              </Box>
            </GridItem>
            {games.map((game) => {
              return <GameCard key={game.id} {...game} />;
            })}
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
