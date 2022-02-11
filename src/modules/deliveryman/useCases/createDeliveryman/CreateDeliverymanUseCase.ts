import { prisma } from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

interface ICreateDeliveryman {
  username: string
  password: string
}

export class CreateDeliverymanUseCase {
  async execute({ password, username }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    })

    // se existir mostra o erro
    if (deliverymanExists) {
      throw new Error('deliveryman already exists')
    }

    // se nao gera o hash da senha
    const hashPassword = await hash(password, 10)
    // criptografar a senha

    // salvar o deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })
    return deliveryman
  }
}
