/*import server from './server';
const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`el servidor escuchando en el puerto ${port}`)
})*/

import server from './server';
import colors from 'colors'; 
import db from './config/db'

 const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await db.authenticate(); 
         console.log(colors.blue.bold('Conexión exitosa a la Base de datos'));

       // Sincroniza la base de datos
         await db.sync()
        console.log(colors.blue.bold('Base de datos y modelos sincronizados.'));

        // Inicia el servidor en el puerto especificado
         server.listen(port, () => {
            console.log(`✅ El servidor se está escuchando en el puerto http://localhost:${port}`);
         });

     } catch (error) {
         console.error('Error al conectar a la base de datos:', error);
     }
 }

 startServer();

