import fs from 'fs'

class ProductsManager {
    constructor() {
        if (fs.existsSync('/Products.json')){
            this.products = JSON.parse(fs.readFileSync('/Products.json', 'utf-8'))
        } else {
            this.products = []
        }
    }

async createProduct( { id, title, description, code, price, status, stock, thumbnails, category } ) {
    const product = {
        id,
        title, 
        description, 
        code, 
        price, 
        status, 
        stock, 
        thumbnails, 
        category
    }

    this.products.push(product)

    await fs.promises.writeFile('/Products.json', JSON.stringify(this.products, null, '\t'))

    console.log('Producto Creado')
}
    async getProduct(){
        return JSON.parse(await fs.promises.readFile('/Products.json'))
    }
}

const productManager = new ProductsManager()

productManager.createProduct({
        id: 1,
        title:"Gafas Color Negro Marco Acetato",
        description: "Marco Acetato",
        code:"AA1",
        price:250000,
        status: true,
        stock:50,
        thumbnails:"image",
        category:"Gafas"
})

productManager.getProduct()
    .then(data => console.log(data))

