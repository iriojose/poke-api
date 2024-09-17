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
}
