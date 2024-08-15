import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

describe('Resgister Use Case', () => {
    it('should be able to register a new user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: '12345',
            password: 'daniel@gmail.com'
        })

        expect(user).toHaveProperty('id')
    }),

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
        const email = 'daniel@gmail.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        })

        expect(() => registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        }) ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})