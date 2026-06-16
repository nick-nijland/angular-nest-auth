import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DB_HOST'] ?? 'localhost',
      port: Number(process.env['DB_PORT'] ?? 5432),
      username: process.env['DB_USER'] ?? 'postgres',
      password: process.env['DB_PASS'] ?? 'postgres',
      database: process.env['DB_NAME'] ?? 'angular_nest_auth',
      entities: [User, Product],
      synchronize: true, // disable and use migrations in production
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
