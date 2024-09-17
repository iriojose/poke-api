import { ApiProperty } from '@nestjs/swagger';
import { GenericType } from './pokemos.interfaces';

export class ListOfPokemonsResponseDTO {
	@ApiProperty()
	results: GenericType[];
}
