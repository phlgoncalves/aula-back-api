import { Body, Controller, Post } from "@nestjs/common";


@Controller('/usuarios') //serve como link para chamar o Controller usuario  localhost:3000/usuarios
export class UsuarioController{

    @Post()
    async criaUsuario(@Body() dadosUsuario){ //async: significa que a função é asincrona. 
        var usuario = {
            dadosUsuario : dadosUsuario,
            status: 'Usuario Criado'
        }
        return usuario
    }

}