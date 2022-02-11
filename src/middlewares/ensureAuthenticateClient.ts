import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //receber o token que vem de header.authorization
  const authHeader = request.headers.authorization
  // se nao tiver nada de token msg de erro com a stuts 401 de erro
  if (!authHeader) {
    return response.status(401).json({
      message: 'Token missing'
    })
  }

  //Bearer 7838792478932894-787823478324
  //[0] - Bearer
  // - 7838792478932894-787823478324
  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(
      token,
      'bab138e1417df56b214ebd11dad7b1fe'
    ) as IPayload

    request.id_client = sub
    return next()
  } catch (err) {
    return response.status(401).json({
      message: 'Invalid Token'
    })
  }
}
