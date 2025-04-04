import * as bcrypt from 'bcrypt'

export class UsuarioEntity {
    id: string;
    nome: string;
    idade: Number;
    endereco: string;
    cidade: string;
    cep: string;
    complemento: string;
    email: string;
    telefone: string;
    senha: string;
    constructor(id: string, nome: string, idade: Number, endereco: string, cidade: string, cep: string, complemento: string, email: string, telefone: string, senha: string) {
        const saltOrRounds = 10;

        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.endereco = endereco;
        this.cidade = cidade;
        this.cep = cep;
        this.complemento = complemento;
        this.email = email;
        this.telefone = telefone;
        this.senha = bcrypt.hashSync(senha, saltOrRounds);
    }

    trocarSenha(senhaNova) {
        const saltOrRounds = 10;
        this.senha = bcrypt.hashSync(senhaNova, saltOrRounds);
    }

    login(senha) {
        return bcrypt.compareSync(senha, this.senha)
    }
}