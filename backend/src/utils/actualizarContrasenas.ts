import sequelize from '../config/db'; // Ajusta la ruta según dónde está tu archivo sequelize.ts
import Usuarios from '../models/Usuarios'; // Ajusta la ruta a tu modelo Usuarios
import bcrypt from 'bcrypt';

async function actualizarContrasenas() {
  try {
    // Registra el modelo en la instancia sequelize
    sequelize.addModels([Usuarios]);

    await sequelize.authenticate();
    console.log('Conexión a BD exitosa');

    const usuarios = await Usuarios.findAll();

    for (const usuario of usuarios) {
      // Verifica si la contraseña ya está hasheada (bcrypt hash empieza con $2b$ o $2a$)
      if (!usuario.contrasena.startsWith('$2b$') && !usuario.contrasena.startsWith('$2a$')) {
        const hash = await bcrypt.hash(usuario.contrasena, 10);
        usuario.contrasena = hash;
        await usuario.save();
        console.log(`Contraseña actualizada para usuario ${usuario.id_usuario}`);
      }
    }

    console.log('Actualización de contraseñas finalizada');
    process.exit(0);
  } catch (error) {
    console.error('Error en actualización:', error);
    process.exit(1);
  }
}

actualizarContrasenas();
