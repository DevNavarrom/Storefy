import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
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
      this.handleExceptions( error );
    }

  }

  async getTotalProductsCount(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async findAll(skip: number, limit: number) {
    return await this.productModel.find().skip(skip).limit(limit).exec();
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

  async update( term: string, updateProductDto: UpdateProductDto) {

    const product = await this.findOne( term, 'sku' );
    if ( updateProductDto.name )
      updateProductDto.name = updateProductDto.name.toLowerCase();
    
    try {
      await product.updateOne( updateProductDto );
      return { ...product.toJSON(), ...updateProductDto };
      
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  async remove( id: string) {
    const { deletedCount } = await this.productModel.deleteOne({ _id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Product with id "${ id }" not found`);

    return;
  }

  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Product exists in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Product - Check server logs`);
  }

}
