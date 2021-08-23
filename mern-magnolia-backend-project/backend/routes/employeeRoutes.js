import express from 'express'
import {
    getEmployees,
    getEmployee,
    insertEmployee,
    deleteEmployee,
    updateEmployee
} from '../controllers/employeeController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
    .route('/')
    .get(protect, admin, getEmployees)
    .post(protect, admin, insertEmployee)
    .put(protect, admin, updateEmployee)
    .delete(protect, admin, deleteEmployee)
router
    .route('/:id')
    .get(protect, admin, getEmployee)


export default router