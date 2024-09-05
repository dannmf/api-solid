
// import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
// import { CheckInUseCase } from '@/use-cases/check-in'
// import { expect, describe, it, beforeEach } from 'vitest'

// let checkInsRepository: InMemoryCheckInsRepository
// let gymsRepository: InMemoryCheckInsRepository
// let sut: CheckInUseCase

// describe('Authenticate Use Case', () => {

//     beforeEach(() => {
//         checkInsRepository = new InMemoryCheckInsRepository()
//         gymsRepository = new InMemoryCheckInsRepository()
//         sut = new CheckInUseCase(checkInsRepository, gymsRepository)
//     })

//     it('should be able to check in', async () => {
//         const { checkIn } = await sut.execute({
//             userId: 'user-id',
//             gymId: 'gym-id',
//             userLatitude: 0,
//             userLongitude: 0,
//         })

//         expect(checkIn.id).toEqual(expect.any(String))
//     })
    
    
// })