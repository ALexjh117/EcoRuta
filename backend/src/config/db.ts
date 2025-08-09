import mysql2,{Pool,PoolOptions} from 'mysql2/promise'
import *as  dotenv from 'dotenv'


dotenv.config()
const poolOptions:PoolOptions={
    host: process.env.DB_HOST  || 'localhost',
    user:process.env.DB_USER   || 'root',
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port:Number(process.env.DB_PORT) || 3306,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
};

export const pool:Pool =mysql2.createPool(poolOptions);