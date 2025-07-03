import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { UserModule } from './models/user/user.module';
import { PostModule } from './models/post/post.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule],
})
export class AppModule {}
