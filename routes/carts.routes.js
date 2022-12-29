import { Router } from "express";

const router = Router()

//Importar ProductManager

const carts = []

router.get('/', (req, res) => {
    res.status(200).json({ carts })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    res.status(200).json({ search: carts[Number(id) - 1] })
})


router.post('/', (req, res) => {

    const cartProducts = {
        id: carts.length === 0 ? 1 : carts.length + 1,
        products: []
    }

    carts.push(cartProducts)
    res.status(201).json({information:'created', carts})
})

router.post('/:cid/product/:pid', (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    const { quantity } = req.body

    const cartProduct = {
        id: parseInt(pid),
        quantity
    }

    if(!quantity){
        throw new Error("Quiantity is required")
    }

    if(isNaN(quantity)){
        throw new Error("Quantity required as Number")
    }

    const products = carts[Number(cid) - 1].products
    let productFound = false

    for (let i = 0; i < products.length; i++) {
    if (products[i].id === parseInt(pid)) {
    products[i].quantity += quantity
    productFound = true

    res.status(201).json({ information:'Quantity Added', products })
    break
    }
    }

    if (!productFound) {
    carts[Number(cid) - 1].products.push(cartProduct)

    res.status(201).json({ information:'created', products })
    }
    
})

router.put('/:pid', (req, res) => {
    const { pid } = req.params
    const { title, description, code, price, status, stock, thumbnails, category } = req.body

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

    carts[Number(pid) - 1] = uploadedProduct

    res.status(201).json({ information:'updated', uploadedProduct })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const deleted = carts.splice((Number(id) - 1), 1)
    
    res.status(201).json({ information: 'deleated', deleted })
    })


export default router