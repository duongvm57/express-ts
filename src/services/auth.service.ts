import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils/db.config';
import { RefreshTokens, User } from '@prisma/client';
import { CreateUserInput, createUserSchema, LoginInput, LoginSchema } from '../schema/user.schema';
import { RefreshTokenInput, RefreshTokenSchema } from '../schema/refreshToken.schema';
import validate from '../utils/validate';
import { Status } from '../constants/constant';
import divisionService from './division.service';

class AuthService {

  async signup(data: CreateUserInput) {
    const dataInput = validate(createUserSchema, data);

    const existedUser = await db.user.findFirst({
      where: {
        email: dataInput.email
      }
    });

    if (existedUser) {
      throw ({ status: 409, message: 'User already exists.' });
    }

    await divisionService.findById(dataInput.divisionId);
    const encryptedPassword = bcrypt.hashSync(dataInput.password, 8);
    dataInput.password = encryptedPassword;

    await db.user.create({
      data: dataInput
    });

    return {
      message: 'Create user successfully.'
    };
  }

  async login(data: LoginInput) {
    const dataInput = validate(LoginSchema, data);

    const user = await db.user.findFirst({
      where: {
        email: dataInput.email,
        status: Status.ACTIVE
      }
    });

    if (!user) {
      throw ({ status: 404, message: 'User not found.' });
    }

    const validPassword = bcrypt.compareSync(dataInput.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password.');
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: Number(process.env.ACESS_TOKEN_EXPIRATION)
      }
    );

    const refreshToken = await this.createRefreshToken(user);

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  async refreshToken(data: RefreshTokenInput) {
    const dataInput = validate(RefreshTokenSchema, data);

    if (!dataInput.refreshToken) {
      throw new Error('Refresh token is required!');
    }

    const refreshToken = await db.refreshTokens.findFirst({
      where: {
        token: dataInput.refreshToken
      },
      include: {
        user: true
      }
    });

    if (!refreshToken) {
      throw new Error('Refresh token not valid!');
    }

    if (this.verifyExpiration(refreshToken)) {
      db.refreshTokens.delete({
        where: {
          id: refreshToken.id
        }
      });
      throw new Error('Refresh token was expired!');
    }

    const newAccessToken = jwt.sign(
      {
        id: refreshToken.user.id,
        name: refreshToken.user.name,
        email: refreshToken.user.email
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: Number(process.env.ACESS_TOKEN_EXPIRATION)
      }
    );

    return {
      accessToken: newAccessToken,
      refreshToken: {
        token: refreshToken.token,
        expireDate: refreshToken.expireDate
      }
    };
  }

  async createRefreshToken(user: User): Promise<string> {
    const expiredAt = new Date();
    expiredAt.setSeconds(
      expiredAt.getSeconds() + Number(process.env.REFRESH_TOKEN_EXPIRATION)
    );
    const token = uuidv4();
    const refreshToken = await db.refreshTokens.create({
      data: {
        token: token,
        userId: user.id,
        expireDate: expiredAt
      }
    });
    return refreshToken.token;
  }

  verifyExpiration(refreshToken: RefreshTokens): boolean {
    return refreshToken.expireDate.getTime() < new Date().getTime();
  }
}

export default new AuthService();
