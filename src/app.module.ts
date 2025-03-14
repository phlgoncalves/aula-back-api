import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { FilmeModule } from './filme/filme.module';


@Module({
  imports: [UsuarioModule, FilmeModule],
})
export class AppModule { }
