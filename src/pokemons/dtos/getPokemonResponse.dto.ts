import { ApiProperty } from '@nestjs/swagger';
import { Types } from './pokemos.interfaces';
import { pokemonWithTypesAndTranslations } from '../../../test/data';

export class GetPokemonResponseDTO {
	@ApiProperty({
        example: "drizzle",
        required: true
    })
	name: string
    
    @ApiProperty({
        example: pokemonWithTypesAndTranslations.types,
        required: true
    })
    types: Types[]

    @ApiProperty({
        example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg",
        required: true
    })
    image: string
}
