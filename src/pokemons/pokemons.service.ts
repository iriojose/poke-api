import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { GenericType, Names } from './dtos/pokemos.interfaces';
import { GetPokemonResponseDTO } from './dtos/getPokemonResponse.dto';

@Injectable()
export class PokemonsService {
    private url

    constructor() {
        this.url = "https://pokeapi.co/api/v2/"
    }

    async getAllPokemons(): Promise<GenericType[]> {
        try {
            const response = await axios.get(`${this.url}ability/?limit=100`)
            return response.data.results
        }catch (e) {
            throw new HttpException('getAllPokemons PokemonsService error:' + e, e.status)
        }
    }

    async getOnePokemon(id: string): Promise<GetPokemonResponseDTO> {
        try {
            const response = await axios.get(`${this.url}pokemon/${id}`)
            return { name: response.data.name, types: response.data.types }
        }catch (e) {
            throw new HttpException('getAllPokemons PokemonsService error:' + e, e.status)
        }
    }   

    async getTypeTranslation(url: string): Promise<Names[]>  {
        try {
            const response = await axios.get(url)
            return response.data.names.filter((name) => name.language.name == "es" || name.language.name == "ja")
        } catch(e) {
            throw new HttpException('getTypeTranslation PokemonsService error: '+ e, e.status)
        }
    }

    async getOnePokemonWithTypesAndTranslations(id: string): Promise<GetPokemonResponseDTO> {
        try {
            //get pokemon
            const pokemon = await this.getOnePokemon(id)

            //finds translations for each type
            pokemon.types = await Promise.all(
                pokemon.types.map(async(type) => {
                    const translations = await this.getTypeTranslation(type.type.url)

                    return {
                        ...type,
                        names: translations
                    }
                })
            )

            return pokemon
        }catch (e) {
            throw new HttpException('getOnePokemonWithTranslations PokemonsService error: '+ e, e.status)
        }
    }
}
