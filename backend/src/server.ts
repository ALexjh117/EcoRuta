import express from 'express';
import  router from './router';
import { bold } from 'colors';
import colors from 'colors'
import sequelize from './config/db';
import db from './config/db'
import UsuarioRouter from './routes/Usuario.Routes'
import ReporteUsusarioRouter from './routes/ReporteUsuarios.Routes'
import Rutas from './routes/Rutas.Routes'
import Recorrido from './routes/Recorrido.Routes';
import SystemLogros from './routes/SistemaLogros.Routes'

async function connectDB() {
    try{
        await db.authenticate();
        console.log(colors.blue.bold('Conexion exitosa a la DB'))

        try{
            const [results, metadata] = await db.query('select * from usuarios limit 2')
            console.log('Datos de ejemplo:', results);
        }catch(error){
            console.error('Error al ejecutar la consulta:', error);
        }
    }catch(error){
        console.error('Error al conectar a la BD:', error);
        console.log(colors.red.bold('Falló la conexión a la BD'));
    }
    
}

connectDB()

const app= express()
app.use(express.json())

app.use('/', router)
app.use('/api/usuarios', UsuarioRouter)
app.use('/api/reportes_usuarios', ReporteUsusarioRouter)
app.use('/api/rutas', Rutas)
app.use('/api/recorridos', Recorrido)
app.use('/api/sistemalogros', SystemLogros)

export default app;