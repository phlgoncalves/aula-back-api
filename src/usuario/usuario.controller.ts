import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuariosArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";


@Controller('/usuarios') //serve como link para chamar o Controller usuario  localhost:3000/usuarios
export class UsuarioController {
    constructor(private classeUsuariosArmazenado: UsuariosArmazenados) { }

    @Post()
    async criaUsuario(@Body() dadosUsuario) { //async: significa que a função é asincrona. 

        var validacoes = this.classeUsuariosArmazenado.validaUsuario(dadosUsuario)

        if (validacoes.length > 0) {
            return {
                status: 'Erro',
                validacoes: validacoes
            }
        }

        var novoUsuario = new UsuarioEntity(dadosUsuario.id, dadosUsuario.name, dadosUsuario.idade,
            dadosUsuario.cidade, dadosUsuario.email,
            dadosUsuario.telefone, dadosUsuario.senha)

        this.classeUsuariosArmazenado.AdicionarUsuario(novoUsuario)

        var usuario = {
            dadosUsuario: dadosUsuario,
            status: 'Usuario Criado'
        }
        return usuario
    }

    @Get()
    async listaUsuarios() {
        return this.classeUsuariosArmazenado.Usuario;
    }




}