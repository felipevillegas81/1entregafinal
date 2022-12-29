import fs from 'fs'

class CartsManager {
    constructor() {
        if (fs.existsSync('./Carts.json')){
            this.carts = JSON.parse(fs.readFileSync('./Carts.json', 'utf-8'))
        } else {
            this.carts = []
        }
    }

async createCart( {title, stock} ) {
    const cart = {
        title,
        stock
    }

    this.carts.push(cart)

    await fs.promises.writeFile('./Carts.json', JSON.stringify(this.carts, null, '\t'))

    console.log('Carrito Creado')
}
    async getCart(){
        return JSON.parse(await fs.promises.readFile('./Carts.json'))
    }
}

const cartManager = new CartsManager()

cartManager.createCart({
    title: 'Nuevo',
    stock: '25'
})

cartManager.getCart()
    .then(data => console.log(data))
