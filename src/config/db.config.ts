import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',       
  port: 3306,              
  username: 'root', 
  password: '', 
  database: 'todo', 
  autoLoadModels: true,    
  synchronize: true,       
};

export default databaseConfig