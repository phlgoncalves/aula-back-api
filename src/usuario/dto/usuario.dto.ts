import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";

export class criaUsuarioDTO {
    @IsString()
    @IsNotEmpty({ message: 'nome nao pode ser vazio' })
    nome: string;

    @IsInt()
    idade: Number;

    @IsString()
    cidade: string;

    @IsEmail(undefined, { message: 'email é inválido' })
    @EmailUnico({ message: 'Email já cadastrado, tente novamente' })
    email: string;

    @IsString()
    telefone: string;

    @MinLength(6, { message: 'Senha precisa de pelo menos 6 digitos' })
    @SenhaForte({ message: 'Senha muito fraca, tente novamente' })
    senha: string;
}