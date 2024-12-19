// repositories/userRepository.js
import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'

class UserRepository {
  // Create a new user
  async createUser(userData) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10)

      // Create user
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword
        }
      })

      // Remove password from return
      delete user.password
      return user
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }
  }

  // Find user by email
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    })
  }

  // Get user by ID
  async getUserById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        campaigns: true,
        contributions: true
      }
    })
  }
}

export default new UserRepository()