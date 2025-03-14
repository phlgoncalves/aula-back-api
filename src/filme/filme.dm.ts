import { Injectable } from "@nestjs/common";
import { FilmeEntity } from "./filme.entity";

@Injectable()
export class FilmesArmazenados {
    #filmes: FilmeEntity[] = [
        { id: '1', nome: 'Tropa de Elite', duracao: 135, sinopse: 'Historia de um capitão do BOPE', ano: '2015', genero: 'policial/drama' },
        { id: '2', nome: 'Harry Potter', duracao: 165, sinopse: 'Historia de um garoto bruxo', ano: '2005', genero: 'policial/drama' }
    ];

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