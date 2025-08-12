import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

import { fileURLToPath } from 'url';
// https://vite.dev/config/

const __filename = fileURLToPath(import.meta.url); // ruta del archivo actual
const __dirname = path.dirname(__filename); 
export default defineConfig({
  plugins: [ tailwindcss(),react() ],
  resolve:{
    alias:{
      ReactBits:path.resolve(__dirname,'src/ReactBits')
    },
  },
})

