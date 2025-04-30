import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { GENERO } from "./genero.entity";
import { error } from "console";
import { v4 as uuid } from 'uuid';
import { CriaGeneroDTO } from "./dto/criaGenero.dto";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";

@Injectable()
export class GeneroService {
    constructor(
        @Inject('GENERO_REPOSITORY')
        private generoRepository: Repository<GENERO>
    ) { }

    async inserir(dados: CriaGeneroDTO): Promise<RetornoCadastroDTO> {
        let genero = new GENERO();
        genero.ID = uuid();
        genero.NOME = dados.NOME;
        genero.DESCRICAO = dados.DESCRICAO;

        return this.generoRepository.save(genero)
            .then((result) => {
                return <RetornoCadastroDTO>{
                    id: genero.ID,
                    message: 'Genero Cadastrado!'
                };
            })
            .catch((error) => {
                return <RetornoCadastroDTO>{
                    id: '',
                    message: 'Houve um erro ao cadastrar' + error.message
                }
            })

    }

    async remover(id: string): Promise<RetornoObjDTO> {
        const genero = await this.localizarID(id);

        return this.generoRepository.remove(genero)
            .then((result) => {
                return <RetornoObjDTO>{
                    return: genero,
                    message: 'Genero Excluido'
                }
            })
            .catch((error) => {
                return <RetornoObjDTO>{
                    return: genero,
                    message: 'Houve um erro ao excluir. ' + error.message
                }
            })
    }

    async localizarID(ID: string): Promise<GENERO> {
        const genero = await this.generoRepository.findOne({
            where: {
                ID
            }
        });

        if (!genero) {
            throw new Error(`Genero com ID ${ID} não encontrada`)
        }

        return genero
    }
}