import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import bcrypt from 'bcryptjs';
import { FastifyReply, FastifyRequest } from "fastify"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { User } from "@prisma/client"

interface ResgisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegiserUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }
  async execute({ name, email, password }: ResgisterUseCaseRequest) : Promise<RegiserUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return { user }

  }

}

