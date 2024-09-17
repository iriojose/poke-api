import { ApiProperty } from '@nestjs/swagger';
import { Types } from './pokemos.interfaces';

export class GetPokemonResponseDTO {
	@ApiProperty()
	name: string
    @ApiProperty()
    types: Types[]
}
