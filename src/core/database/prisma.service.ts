import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Connected to the database');
    } catch (error) {
      this.logger.error('❌ Database connection failed', error);
      process.exit(1);
    }
  }
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('🛑 Disconnected from the database');
    } catch (error) {
      this.logger.error('❌ Error during database disconnect', error);
    }
  }
}
