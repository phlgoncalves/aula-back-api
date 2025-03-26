import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class criaFilmeDTO {
    @IsString()
    @IsNotEmpty({ message: 'campo obrigatório' })
    @ApiProperty({
        example: 'Tropa de Elite',
        description: 'Esse campo vai ser utilizado como identificação do nome do filme, deve ser informado um nome completo'
    })
    nome: string;

    @IsInt()
    @ApiProperty({
        example: 145,
        description: 'Esse campo irá identificar a duração do filme em minutos'
    })
    duracao: Number;

    @IsString()
    @ApiProperty({
        example: 'Policial de Elite do RJ em operações',
        description: 'Esse campo vai ser utilizado para um breve resumo do filme'
    })
    sinopse: string;

    @IsString()
    @ApiProperty({
        example: '2015',
        description: 'Esse campo vai ser utilizado como identificação do ano de lançamento do filme'
    })
    ano: string;

    @IsString()
    @ApiProperty({
        example: 'Drama/Policial',
        description: 'Esse campo vai ser utilizado como identificação do genero do filme'
    })
    genero: string;

}