import express from 'express';
import  router from './router';
import { bold } from 'colors';
import colors from 'colors'
import { pool } from './config/db';
async function connectDB() {
    try{
        const connection =await pool.getConnection();
        console.log(colors.blue.bold('Conexion exitosa a la base de datos'))
        const[rows,fields] =await connection.query('');
        console.log("datos de ejemplo",rows)

        connection.release();

    }catch(error){
        console.error('Error al conectar la base de datos',error)
        console.log(colors.red.bold('Fallo la conexion a la base de datos'))
    
    }
    
}

connectDB()

const app= express()

app.use('/', router)
export default app;