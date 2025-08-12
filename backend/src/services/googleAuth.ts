/*Antes de empezar, se tuvo que crear el servicio en google cloud donde se consumio la api, con sus credenciales, apra el .env, 
una vez realizado esto, se procedio a instalar la libreria de autenticacion con google con el comando npm install google-auth-library 
Esta libreria es segura para la autenticacion con los servicios de google, en el caso de OAuth2 valida los tokens 
o id_tokens que provienen del login de google, tambien verifica que el token sea legitimo y no falsificado rectificando que provenga de google
es buena porque facilita la integracion del inicio de sesion con google en apks de bakcned con nodej, siguiendo una forma segura y estandarizada  */


import { OAuth2Client } from "google-auth-library"
import { token } from "morgan"

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
)

/*OAuth2Client es una clase proporcionada por la librería google-auth-library.
al crear la instancia con client, lo que sucede es que se configura para que el 
cliente pueda interactiar con esl sitsma de autenticacion de google

En los parametros se le pasa el id publico del cliente que desde google clud es asignado
a mi app

En cueanto a google-client-secret, es un secreto que me da google cloud para atutenticar la app,
se usa para la verificacion de tokens slo si el id del cliente va a ser necesario
*/

export const verificarTokenGoogle = async (token: string) =>{
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload();
    if(!payload){
        throw new Error('Token de google Valido')
    }

    return {
        googleId: payload.sub,
        nombre: payload.given_name || "",
        apellido: payload.family_name || "",
        correo: payload.email || "",
        foto: payload.picture || ""
    }
}

/* */