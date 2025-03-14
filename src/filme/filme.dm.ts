import { Injectable } from "@nestjs/common";
import { FilmeEntity } from "./filme.entity";

@Injectable()
export class FilmesArmazenados {
    #filmes: FilmeEntity[] = [];

    AdicionarFilme(filme: FilmeEntity) {
        this.#filmes.push(filme)
    }

    get Filmes() {
        return this.#filmes
    }

    getFilmePorId(id: string): FilmeEntity {
        const filme = this.#filmes.find(f => f.id === id);
        if (!filme) {
            throw new Error('Filme não encontrado');
        }
        return filme;
    }

    atualizaFilme(id: string, dadosAtualizacao: Partial<FilmeEntity>) {
        const filme = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return
                }
                if (valor === undefined) {
                    return
                }

                filme[chave] = valor
            }
        )

        return filme
    }

    private buscaPorID(id: string) {
        const possivelFilme = this.#filmes.find(
            filmeSalvo => filmeSalvo.id === id
        )

        if (!possivelFilme) {
            throw new Error('Filme não encontrado')
        }
        return possivelFilme;
    }

    removeFilme(id: string) {
        const filme = this.buscaPorID(id);

        this.#filmes = this.#filmes.filter(
            filmeSalvo => filmeSalvo.id === id
        )

        return filme
    }
}