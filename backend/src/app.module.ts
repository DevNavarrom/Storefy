import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/storefy'),
    ProductModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}