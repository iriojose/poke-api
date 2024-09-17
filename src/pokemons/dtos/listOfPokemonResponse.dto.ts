import { ApiProperty } from '@nestjs/swagger';
import { GenericType } from './pokemos.interfaces';
import { pokemons } from '../../../test/data';

export class ListOfPokemonsResponseDTO {
	@ApiProperty({
		example: pokemons,
		required: true
	})
	results: GenericType[];
}
