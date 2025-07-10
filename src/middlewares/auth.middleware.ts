import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly jwtService: JwtService
  ){}

  async use(req: Request&{session: any}, res: Response, next: NextFunction) {
    if(!req.headers.authorization) {
      next();
      return;
    }
    const [type, token] = req.headers.authorization.split(' ');
    if(type !== 'Bearer') {
      next();
      return;
    }
    try {
      req.session = await this.jwtService.verifyAsync(token);
    } finally {
      next();
    }
  }
}
