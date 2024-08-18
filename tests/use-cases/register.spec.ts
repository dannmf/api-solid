import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Resgister Use Case', () => {

    beforeEach(() => {
         usersRepository = new InMemoryUsersRepository()
         sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register a new user', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: '12345',
            password: 'daniel@gmail.com'
        })

        expect(user.id).toEqual(expect.any(String))
    }),

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    it('should not be able to register with same email twice', async () => {
        const email = 'daniel@gmail.com'

        await sut.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        })

        await expect(() => sut.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        }) ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})