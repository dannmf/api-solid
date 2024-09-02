
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { RegisterUseCase } from '@/use-cases/register'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get iuser profile', async () => {
       const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user).toHaveProperty('id')
        expect(user.name).toEqual('John Doe')
    })
    // it('should be able to get user profile with wrong id', async () => {
    //     expect(() => sut.execute({
    //         userId: 'wrong-id'
    //     })).rejects.toBeInstanceOf(InvalidCredentialsError)
    // })


})