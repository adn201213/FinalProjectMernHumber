import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

import connectDB from './backend/config/db.js'
import productRoutes from './backend/routes/productRoutes.js'
import userRoutes from './backend/routes/userRoutes.js'
import orderRoutes from './backend/routes/orderRoutes.js'
import uploadRoutes from './backend/routes/uploadRoutes.js'
import employeeRoutes from './backend/routes/employeeRoutes.js'
import { notFound, errorHandler } from './backend/middleware/errorMiddleware.js'

dotenv.config()

const app = express()
connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/employees', employeeRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))