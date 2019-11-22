import * as jwt from 'jsonwebtoken';
import { environment } from '../../environment';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';

export const createJwt = req => {
  return jwt.verify(
    req.headers.authorization,
    environment.privateKeyJWT,
    (error, encode) => {
      if (!encode) {
        throw new UnauthorizedException();
      }
      const data: JwtPayload = {
        email: encode.email,
      };

      const newJwt = jwt.sign(data, environment.privateKeyJWT);
      return {
        expiresIn: 3600,
        token: newJwt,
      };
    },
  );
};
