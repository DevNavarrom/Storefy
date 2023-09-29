import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService {

  constructor( 
    @InjectModel(Product.name) 
    private readonly productModel: Model<Product> 
  ) {}

  async create( createProductDto: CreateProductDto ) {
    createProductDto.name = createProductDto.name.toLocaleLowerCase();
    try {
      const product = await this.productModel.create(createProductDto);

      return product;
    } catch (error) {
      if ( error.code === 11000) {
        throw new BadRequestException(`Product exists in DB ${JSON.stringify(error.keyValue)}`)
      }
      throw new InternalServerErrorException(`Can't create product`);
    }

  }

  findAll() {
    return {products: []}
  }

  async findOne(term: string, filter: string) {
    let product: Product;

    if ( filter==='sku' ) {
      product = await this.productModel.findOne({ sku: term });
    }

    if ( !product && isValidObjectId( term ) ) {
      product = await this.productModel.findById( term );
    }

    if ( !product && filter==='name') {
      product = await this.productModel.findOne({ name: term.toLowerCase().trim() })
    }


    if ( !product ) 
      throw new NotFoundException(`Product with sku, name or id "${ term }" not found`);
    

    return product;
  }

}
