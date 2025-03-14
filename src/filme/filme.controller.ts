import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FilmesArmazenados } from "./filme.dm";
import { criaFilmeDTO } from "./dto/filme.dto";

import { v4 as uuid } from "uuid";
import { FilmeEntity } from "./filme.entity";
import { ListaFilmeDTO } from "./dto/consulta.dto";
import { alteraFilmeDTO } from "./dto/altera.filme";

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

    @Get('/:id')
    async listaFilme(@Param('id') id: string) {
        const filmePorID = await this.classeFilmesArmazenados.getFilmePorId(id);

        const filmeUnico = new ListaFilmeDTO(
            filmePorID.id,
            filmePorID.nome,
            filmePorID.sinopse,
            filmePorID.ano
        );

        return filmeUnico;
    }

    @Get('/:id/compartilhar')
    async compartilharFilme(@Param('id') id: string) {

        const filmePorID = this.classeFilmesArmazenados.getFilmePorId(id);

        const compartilhamento = filmePorID.compartilhar();

        return { mensagem: compartilhamento };
    }

    @Put('/:id')
    async atualizaFilme(@Param('id') id: string, @Body() novosDados: alteraFilmeDTO) {
        const filmeAtualizado = await this.classeFilmesArmazenados.atualizaFilme(id, novosDados)

        return {
            filme: filmeAtualizado,
            message: 'Filme atualizado'
        }
    }

    @Delete('/:id')
    async removeFilme(@Param('id') id: string) {
        const filmeRemovido = await this.classeFilmesArmazenados.removeFilme(id)

        return {
            filme: filmeRemovido,
            message: 'Filme removido'
        }

    }
}