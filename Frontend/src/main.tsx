import { StrictMode } from 'react'
import 'leaflet/dist/leaflet.css'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='655710895185-lq4j3qte5j3dbo570i64vipgootsjemf.apps.googleusercontent.com'> {/*Tener en cuenta algo aqui */}
     <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
