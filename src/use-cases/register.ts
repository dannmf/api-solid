import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-user-repository"
import { hash } from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify"

interface ResgisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) { }
  async execute({ name, email, password }: ResgisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })

  }

}

