import { PokemonsService } from "./pokemons.service";
import { Test, TestingModule } from '@nestjs/testing';
import { pokemon, pokemonWithTypesAndTranslations, pokemons, names } from "../../test/data";
import axios from "axios";
import { HttpException } from "@nestjs/common";

describe("Pokemon Service", () => {
    let pokemonService: PokemonsService;

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PokemonsService],
        }).compile();
      
        pokemonService = module.get<PokemonsService>(PokemonsService);
    })

    describe("Pokemon services funtions", () => {

        it("return a list of pokemons", async() => {
            const mockedData = {
                data: {
                    results: pokemons
                }
            };

            jest.spyOn(axios, "get").mockResolvedValueOnce(mockedData);
            const result = await pokemonService.getAllPokemons();
            expect(result).toEqual(mockedData.data.results);
        })

        it("Return error if external api fail getAllPokemons", async() => {
            const error = {
                response: {
                  status: 500,
                },
                message: 'Internal Server Error',
            };

            jest.spyOn(axios, 'get').mockImplementation(() => {
				throw new HttpException("getAllPokemons PokemonsService error:", 500);
			});


            try {
                await pokemonService.getAllPokemons();
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.getStatus()).toBe(500);
            }
        })

        it("return a pokemon with types", async() => {
            const mockedData = { data: pokemon };

            jest.spyOn(axios, "get").mockResolvedValueOnce(mockedData);
            const result = await pokemonService.getOnePokemon("20")
            expect(result).toEqual(mockedData.data);
        })

        it("Return error if external pokemon not exist with getOnePokemon", async() => {
            jest.spyOn(axios, 'get').mockImplementation(() => {
				throw new HttpException("getOnePokemon PokemonsService error:", 404);
			});

            try {
                await pokemonService.getOnePokemon("20");
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.getStatus()).toBe(404);
            }
        })

        it("return types and translations", async() => {
            const mockedData = { data: { names }};

            jest.spyOn(axios, "get").mockResolvedValueOnce(mockedData);
            const result = await pokemonService.getTypeTranslation("20")
            expect(result).toEqual(mockedData.data.names);
        })

        it("Return error if external type not exist with getTypeTranslation", async() => {
            jest.spyOn(axios, 'get').mockImplementation(() => {
				throw new HttpException("getTypeTranslation PokemonsService error:", 404);
			});

            try {
                await pokemonService.getTypeTranslation("20");
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.status).toBe(404);
            }
        })


        it("return a pokemon with types and translations", async() => {
            const expected = pokemonWithTypesAndTranslations;
            
            jest.spyOn(pokemonService, "getOnePokemon").mockResolvedValueOnce(pokemon);
            jest.spyOn(pokemonService, "getTypeTranslation").mockResolvedValueOnce(names);

            const result = await pokemonService.getOnePokemonWithTypesAndTranslations("20")

            expect(result).toEqual(expected);
        })

        it("Return error if external api failt", async() => {
            jest.spyOn(axios, 'get').mockImplementation(() => {
				throw new HttpException("getOnePokemonWithTypesAndTranslations PokemonsService error:", 404);
			});

            try {
                await pokemonService.getOnePokemonWithTypesAndTranslations("20");
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.status).toBe(404);
            }
        })
    })
})


