import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { error } from "console";

@Injectable()
export class UsuariosArmazenados {
    #usuarios: UsuarioEntity[] = [
        { id: '1', nome: 'Pedro', idade: 35, cidade: 'Bauru', email: 'pedro@gmail.com', telefone: '32342245', senha: '123Abc' },
        { id: '2', nome: 'rodrigo', idade: 38, cidade: 'Bauru', email: 'rodrigo@gmail.com', telefone: '32342245', senha: '123Abc' },
        { id: '3', nome: 'caio', idade: 40, cidade: 'Bauru', email: 'caio@gmail.com', telefone: '32342245', senha: '123Abc' },
        { id: '4', nome: 'juliane', idade: 28, cidade: 'Bauru', email: 'juliane@gmail.com', telefone: '32342245', senha: '123Abc' },
        { id: '5', nome: 'wellington', idade: 25, cidade: 'Bauru', email: 'wellington@gmail.com', telefone: '32342245', senha: '123Abc' },
        { id: '6', nome: 'barbara', idade: 38, cidade: 'Bauru', email: 'barbara@gmail.com', telefone: '32342245', senha: '123Abc' }

    ];

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