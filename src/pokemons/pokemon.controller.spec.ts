import { PokemonsController } from './pokemons.controller';
import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { PokemonsService } from './pokemons.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { pokemon, pokemons, pokemonWithTypesAndTranslations } from '../../test/data';

describe("Pokemon Controller", () => {
    let pokemonsController: PokemonsController;
    let pokemonService: PokemonsService;
    let mockResponse: Partial<Response>;

    beforeEach(async() => {
        const moduleRef = await Test.createTestingModule({
			controllers: [PokemonsController],
            providers: [
                {
                    provide: PokemonsService,
                    useValue: {
                        getAllPokemons: jest.fn().mockResolvedValue(pokemons),
                        getOnePokemon: jest.fn().mockResolvedValue(pokemon),
                        getOnePokemonWithTypesAndTranslations: jest.fn().mockResolvedValue(pokemonWithTypesAndTranslations),
                    },
                },
            ]
        }).compile()

        pokemonsController = moduleRef.get<PokemonsController>(PokemonsController);
        pokemonService = moduleRef.get<PokemonsService>(PokemonsService);

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    })


    describe("pokemons functions controllers",() => {

        it("return a list of pokemons", async() => {
			await pokemonsController.listOfPokemons(mockResponse as Response)
            expect(pokemonService.getAllPokemons).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({ results: pokemons });
        })

        it("return a pokemon with types", async() => {
            const id: string = "20" //id of pokemon
            await pokemonsController.oneOfPokemon(id, mockResponse as Response)
            expect(pokemonService.getOnePokemon).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith(pokemon);
        })

        it("return a pokemon with types and translations", async() => {
            const id: string = "20" //id of pokemon
            await pokemonsController.getSpecificPokemonWithTypesAndTranslations(id, mockResponse as Response)
            expect(pokemonService.getOnePokemonWithTypesAndTranslations).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith(pokemonWithTypesAndTranslations);
        })
    })

    describe("Check errors" , () => {

        it("return error if pokemon not exist", async() => {
            jest.spyOn(pokemonService, "getOnePokemon").mockImplementation(() => {
				throw new HttpException("getAllPokemons PokemonsService error:", 404);
			});

            try {
                const id: string = "20" //id of pokemon
                await pokemonsController.oneOfPokemon(id, mockResponse as Response)
            }catch (e) {
                expect(404).toEqual(e.status)
            }
        })

        it("return error if pokemon with types and translations not exist", async() => {
            jest.spyOn(pokemonService, "getOnePokemonWithTypesAndTranslations").mockImplementation(() => {
				throw new HttpException("getOnePokemonWithTranslations PokemonsService error:", 404);
			});

            try {
                const id: string = "20" //id of pokemon
                await pokemonsController.getSpecificPokemonWithTypesAndTranslations(id, mockResponse as Response)  
            } catch (e) {
                expect(404).toEqual(e.status)
            }
        })
    })
})