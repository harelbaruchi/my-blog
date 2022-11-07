import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import {JwtModule} from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers:[AuthController],
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn:'300s'}
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy]
    
})
export class AuthModule {}
