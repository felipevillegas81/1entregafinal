import express from "express"
import productRoutes from "./routes/products.routes.js"
import cartRoutes from "./routes/carts.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Enpoints
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)


app.listen(8080, () => console.log('listening on port 8080'))


