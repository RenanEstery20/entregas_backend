import { prisma } from '../../../database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Receber username, password

    // Verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    // se o usuario nao existir da msg de erro
    if (!client) {
      throw new Error('Username or password invalid!')
    }
    // Verificar se senha corresponde ao username

    // compare é uma funcao do bycript que permite comparar a senha que o usuario ta passando com a senha ja incriptografada
    const passwordMatch = await compare(password, client.password)

    // se as senhas nao baterem (iguais)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }
    // Gerar o token

    // no sign tem que passar duas informações email ou usuario e um hash, (usar o md5 hash generetor)

    const token = sign({ username }, 'bab138e1417df56b214ebd11dad7b1fe', {
      subject: client.id, // passar o id do usuario
      expiresIn: '1d' // delimitar um tempo para expirar o token
    })

    return token
  }
}
