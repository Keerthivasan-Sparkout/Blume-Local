import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.user.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthModules } from '../auth/auth.module';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'secret123',
    //   signOptions: { expiresIn: '1d' },
    // }),
    PrismaModule,AuthModules
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
