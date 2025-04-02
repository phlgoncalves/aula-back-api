import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuariosArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";

import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/altera.usuario";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { ApiBadRequestResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";

@ApiTags('usuario')
@Controller('/usuarios') //serve como link para chamar o Controller usuario  localhost:3000/usuarios
export class UsuarioController {
    constructor(private classeUsuariosArmazenados: UsuariosArmazenados, private httpService: HttpService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Retorna que houve sucesso ao criar um usuário' })
    @ApiBadRequestResponse({ description: "Retorna que algum dado está errado" })
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO) { //async: significa que a função é asincrona. 
        var msgError = ''

        try {
            var retornoCep = await lastValueFrom(this.httpService
                .get(`https://viacep.com.br/ws/${dadosUsuario.cep}/json/`)
                .pipe(
                    map((response) => response.data)
                ))
            if (retornoCep.error == 'true') {
                throw new Error('CEP não encontrado')
            }
        } catch (error) {
            msgError = 'Erro ao consultar o CEP, informa um CEP valido'
            return {
                message: msgError,
                status: 'Erro no cadastro do usuário'
            }
        }

        var novoUsuario = new UsuarioEntity(uuid(),
            dadosUsuario.nome,
            dadosUsuario.idade,
            dadosUsuario.cep,
            retornoCep.logradouro ? retornoCep.logradouro : '',
            dadosUsuario.complemento,
            retornoCep.localidade,
            dadosUsuario.email,
            dadosUsuario.telefone,
            dadosUsuario.senha)

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
        var msgError = ''
        if (novosDados.cep) {
            try {
                var retornoCep = await lastValueFrom(this.httpService
                    .get(`https://viacep.com.br/ws/${novosDados.cep}/json/`)
                    .pipe(
                        map((response) => response.data)
                    ))
                if (retornoCep.erro) {
                    retornoCep = null
                    throw new Error('CEP não encontrado')
                }
            } catch (error) {
                msgError = ` | Erro ao buscar CEP - ${error.message}`
            }

            var dadosEndereco = {
                endereco: retornoCep ? retornoCep.logradouro : '',
                cidade: retornoCep ? retornoCep.localidade : '',
                cep: novosDados.cep
            }

            await this.classeUsuariosArmazenados.atualizaUsuario(id, dadosEndereco)
        }
        
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