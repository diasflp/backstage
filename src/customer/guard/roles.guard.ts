import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../environment';
import { tokeMessageError } from '../constants/jwtErros.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const token = _.find(context.getArgs(), 'headers').headers.authorization;

    jwt.verify(token, environment.privateKeyJWT, (error, encode) => {
      if (error) {
        switch (error.name) {
          case tokeMessageError.jsonWebTokenError:
            throw new BadRequestException({
              message: 'Token invalid.',
            });
          case tokeMessageError.tokenExpiredError:
            throw new UnauthorizedException();
        }
      }
    });
    return true;
  }
}
