import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class LoginUsuarioDTO {

    @IsEmail(undefined, { message: 'email inválido' })
    @ApiProperty({
        example: 'pedro@hotmail.com',
        description: 'Esse é para validação do email de login'
    })
    email: string;

    @MinLength(6, { message: 'senha deve ter no minimo 6 digitos' })
    @ApiProperty({
        example: 'senhaForte483',
        description: 'Esse campo é para validação da senha'
    })
    senha: string;
}