import { DataSource } from "typeorm";
import { GENERO } from "./genero.entity";

export const generoProviders = [
    {
        provide: 'GENERO_REPOSITORY',
        userFactory: (dataSource: DataSource) => dataSource.getRepository(GENERO),
        inject: ['DATA_SOURCE']
    }
]