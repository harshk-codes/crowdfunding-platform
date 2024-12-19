// lib/prisma.js
import { PrismaClient } from '@prisma/client'

// Ensure a single Prisma client instance
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma
}

export default prisma