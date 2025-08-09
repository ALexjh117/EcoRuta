import server from './server';
const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`el servidor escuchando en el puerto ${port}`)
})
