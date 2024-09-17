import { Controller, Get, Res, HttpStatus, Param, HttpCode, UseFilters} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { PokemonsService } from './pokemons.service';
import { ListOfPokemonsResponseDTO } from './dtos/listOfPokemonResponse.dto';
import { GetPokemonResponseDTO } from './dtos/getPokemonResponse.dto';
import { HttpErrorException } from '../http/http.exception';

@Controller('api')
@ApiTags("pokemons")
@UseFilters(HttpErrorException)
export class PokemonsController {

    constructor(
        private readonly pokemonService: PokemonsService
    ) {}

    @Get('pokemon')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ListOfPokemonsResponseDTO })
    @ApiOperation({ summary: 'List all first 100 Pokemons and return its name and URL.' })
    async listOfPokemons(@Res() res: Response) {
        const results = await this.pokemonService.getAllPokemons()
        res.status(HttpStatus.OK).json({ results });
    }

    @Get('pokemon/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: GetPokemonResponseDTO })
    @ApiOperation({ summary: 'Get a specific Pokemon and return its name and types.' })
    async oneOfPokemon(@Param("id") id: string, @Res() res: Response) {
        const results = await this.pokemonService.getOnePokemon(id)
        res.status(HttpStatus.OK).json(results);
    }

    @Get('/pokemonAndTypes/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: GetPokemonResponseDTO })
    @ApiOperation({ summary: 'Get a specific Pokemon and return its name, types, and the translations of Spanish and Japanese for each of its types.' })
    async getSpecificPokemonWithTypesAndTranslations(@Param("id") id: string, @Res() res: Response) {
        const results = await this.pokemonService.getOnePokemonWithTypesAndTranslations(id)
        res.status(HttpStatus.OK).json(results);
    } 
}
