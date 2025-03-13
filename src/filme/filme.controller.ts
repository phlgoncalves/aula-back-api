import { Body, Controller, Get, Post } from "@nestjs/common";
import { FilmesArmazenados } from "./filme.dm";
import { criaFilmeDTO } from "./dto/filme.dto";

import { v4 as uuid } from "uuid";
import { FilmeEntity } from "./filme.entity";
import { ListaFilmeDTO } from "./dto/consulta.dto";

@Controller('/filmes')
export class FilmeController {
    constructor(private classeFilmesArmazenados: FilmesArmazenados) { }

    @Post()
    async criaFilme(@Body() dadosFilme: criaFilmeDTO) {

        var novoFilme = new FilmeEntity(uuid(), dadosFilme.nome,
            dadosFilme.duracao, dadosFilme.sinopse, dadosFilme.ano,
            dadosFilme.genero)

        this.classeFilmesArmazenados.AdicionarFilme(novoFilme)

        var filme = {
            dadosFilme: dadosFilme,
            status: 'Filme criado'
        }

        return filme
    }

    @Get()
    async listaFilmes() {
        this.classeFilmesArmazenados.Filmes

        const filmesListados = this.classeFilmesArmazenados.Filmes
        const filmeRetorno = filmesListados.map(
            filme => new ListaFilmeDTO(
                filme.id,
                filme.nome,
                filme.sinopse,
                filme.ano
            )
        )

        return filmeRetorno
    }
}