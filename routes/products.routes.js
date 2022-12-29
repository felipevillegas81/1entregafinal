import { Router } from "express";

const router = Router()

//Importar ProductManager

const products = []


router.get('/', (req, res) => {
    res.status(200).json({ products })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    res.status(200).json({ search: products[Number(id) - 1] })
})

router.post('/', (req, res) => {
    const {title, description, code, price, status, stock, thumbnails, category} = req.body

    if(!title || !description || !code || !price || !stock || !category){
        throw new Error("Title, Description, Code, Price, Stock and Category are required")
    }

    if(typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string'){
        throw new Error("Title, Description, Code are required as String")
    }

    if(isNaN(price) || isNaN(stock)){
        throw new Error("Price and Stock are required as Number")
    }

    if(typeof status !== "boolean"){
        throw new Error("Status is required as boolean")
    }

    const product = {
        id: products.length === 0 ? 1 : products.length + 1,
        title,
        description,
        code,
        price,
        status,
        stock,
        thumbnails,
        category
    }

    products.push(product)

    res.status(201).json({information:'created', product})
})

router.put('/:pid', (req, res) => {
    const { pid } = req.params
    const { title, description, code, price, status, stock, thumbnails, category } = req.body

    if(!title || !description || !code || !price || !stock || !category){
        throw new Error("Title, Description, Code, Price, Stock and Category are required")
    }

    if(typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string'){
        throw new Error("Title, Description, Code are required as String")
    }

    if(isNaN(price) || isNaN(stock)){
        throw new Error("Price and Stock are required as Number")
    }

    if(typeof status !== 'boolean' && status !== false && status !== true){
        throw new Error("Status is required as boolean")
    }

    if( !status ){
        status = true
    }

    const uploadedProduct = {
        id: pid,
        title,
        description,
        code,
        price,
        status:
        stock,
        thumbnails,
        category
    }

    products[Number(pid) - 1] = uploadedProduct

    res.status(201).json({ information:'updated', uploadedProduct })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const deleted = products.splice((Number(id) - 1), 1)
    
    res.status(201).json({ information: 'deletaed', deleted })
    })


export default router