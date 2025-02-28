import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuariosArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";

import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";


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
            dadosUsuario: dadosUsuario,
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




}