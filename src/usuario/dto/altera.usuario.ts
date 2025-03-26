import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class alteraUsuarioDTO {
    @IsString()
    @IsNotEmpty({ message: 'nome nao pode ser vazio' })
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Pedro Gonçalves',
        description: 'Esse campo vai ser utilizado como identificação do usuário, deve ser informado um nome completo'
    })
    nome: string;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({
        example: 32,
        description: 'Esse campo identifica a idade do usuário, deve ser enviado um número'
    })
    idade: Number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Bauru',
        description: 'Deve ser enviado apenas a cidade'
    })
    cidade: string;

    @IsEmail(undefined, { message: 'email é inválido' })
    @EmailUnico({ message: 'Email já cadastrado, tente novamente' })
    @IsOptional()
    @ApiPropertyOptional({
        example: 'pedro@gmail.com',
        description: 'Esse campo irá ser login do usuário, deve ser um email válido e único'
    })
    email: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: '981872022',
        description: 'Esse campo identifica o telefone do usuário'
    })
    telefone: string;

    @MinLength(6, { message: 'Senha precisa de pelo menos 6 digitos' })
    @SenhaForte({ message: 'Senha muito fraca, tente novamente' })
    @IsOptional()
    @ApiPropertyOptional({
        example: 'SenhaForte186',
        description: 'A senha deve ter números, letras maiúsculas e caracteres especiais'
    })
    senha: string;
}