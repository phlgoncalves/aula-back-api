import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { error } from "console";

@Injectable()
export class UsuariosArmazenados {
    #usuarios: UsuarioEntity[] = [];

    AdicionarUsuario(usuario: UsuarioEntity) {
        this.#usuarios.push(usuario)
    }

    get Usuarios() {
        return this.#usuarios
    }

    atualizaUsuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>) {
        const usuario = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return
                }
                if (valor === undefined) {
                    return
                }

                usuario[chave] = valor;
            }
        )

        return usuario
    }


    private buscaPorID(id: string) {
        const prossivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        )

        if (!prossivelUsuario) {
            throw new Error('Usuario não encontrado')
        }
        return prossivelUsuario;
    }

    async removeUsuario(id: string) {
        const usuario = this.buscaPorID(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return usuario
    }

    async validaEmail(email: string): Promise<boolean> {
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        )
        return (possivelUsuario !== undefined)
    }
}