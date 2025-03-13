export class ListaFilmeDTO {
    constructor(
        readonly id: string,
        readonly nome: string,
        readonly sinopse: string,
        readonly ano: string,
    ) { }
}