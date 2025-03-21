import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuariosArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";

import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/altera.usuario";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";


@Controller('/usuarios') //serve como link para chamar o Controller usuario  localhost:3000/usuarios
export class UsuarioController {
    constructor(private classeUsuariosArmazenados: UsuariosArmazenados) { }

    @Post()
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO) { //async: significa que a função é asincrona. 

        var novoUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.idade,
            dadosUsuario.cidade, dadosUsuario.email,
            dadosUsuario.telefone, dadosUsuario.senha)

        this.classeUsuariosArmazenados.AdicionarUsuario(novoUsuario)

        var usuario = {
            dadosUsuario: novoUsuario,
            status: 'Usuario Criado'
        }
        return usuario
    }

    @Get()
    async listaUsuarios() {
        this.classeUsuariosArmazenados.Usuarios

        const usuariosListados = this.classeUsuariosArmazenados.Usuarios
        const listaRetorno = usuariosListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        )

        return listaRetorno
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: alteraUsuarioDTO) {
        const usuarioAtualizado = await this.classeUsuariosArmazenados.atualizaUsuario(id, novosDados)

        return {
            usuario: usuarioAtualizado,
            message: 'Usuário Atualizado'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.classeUsuariosArmazenados.removeUsuario(id)

        return {
            usuario: usuarioRemovido,
            message: 'Usuário removido'
        }
    }

    @Post('/login')
    async login(@Body() dadosLogin: LoginUsuarioDTO) {
        var login = this.classeUsuariosArmazenados.validarLogin(dadosLogin.email, dadosLogin.senha);
        return {
            status: login.login,
            usuario: login.login ? login.usuario : null,
            message: login.login ? 'login efetuado' : 'usuario ou senha inválidos'
        }
    }


}