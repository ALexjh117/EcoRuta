import { Router } from "express";

const router = Router()

router.get('/', (req,res)=>{
    res.send('hola mundo')
})

router.get('/nosotros', (req,res)=>{
    res.send('nosotros')
})
router.get('/blog', (req,res)=>{
    res.send('blog')
})

export default router
