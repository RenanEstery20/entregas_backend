import { prisma } from '../../../database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Receber username, password

    // Verificar se username cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    // se o usuario nao existir da msg de erro
    if (!deliveryman) {
      throw new Error('Username or password invalid!')
    }
    // Verificar se senha corresponde ao username

    // compare é uma funcao do bycript que permite comparar a senha que o usuario ta passando com a senha ja incriptografada
    const passwordMatch = await compare(password, deliveryman.password)

    // se as senhas nao baterem (iguais)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }
    // Gerar o token

    // no sign tem que passar duas informações email ou usuario e um hash, (usar o md5 hash generetor)

    const token = sign({ username }, 'bab138e1417df77b214ebd11dad7b1fe', {
      subject: deliveryman.id, // passar o id do usuario
      expiresIn: '1d' // delimitar um tempo para expirar o token
    })

    return token
  }
}
