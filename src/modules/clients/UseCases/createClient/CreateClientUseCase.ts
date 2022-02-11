import { prisma } from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    // Validar se o usuario existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    })

    // se existir mostra o erro
    if (clientExists) {
      throw new Error('Client already exists')
    }

    // se nao gera o hash da senha
    const hashPassword = await hash(password, 10)
    // criptografar a senha

    // salvar o client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })
    return client
  }
}
