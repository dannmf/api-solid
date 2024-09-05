import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/gym/create-gym'
import { expect, describe, it, beforeEach } from 'vitest'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Resgister Use Case', () => {

    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
         sut = new CreateGymUseCase(gymRepository)
    })

    it('should be able to create a new gym', async () => {
        const { gym } = await sut.execute({
            title: 'Sportzone',
            description: 'The best gym in the world',
            phone: '12345',
            latitude: 0,
            longitude: 0
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})
