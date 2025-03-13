import { Module } from "@nestjs/common";


@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [UsuariosArmazenados]
})

export class UsuarioModule { }