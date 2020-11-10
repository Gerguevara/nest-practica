import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5444,
    username: 'postgres',
    password: 'mypass',
    database: 'taskmanagment',
    entities:[__dirname + '/../*.entity{.ts,.js}'],
    synchronize: true
}
/**synchronize run a mapping everytime the app start to run
 * but is just for dev enviromento, for production
 * must be a migration
 */

 /* esta configuracio sera pasada al TypeOrm module que es usado en 
 la ruta principal */