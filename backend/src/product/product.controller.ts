import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  constructor( private readonly productService: ProductService ) {}

  @Post()
  create( @Body() createProductDto: CreateProductDto ) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':filter')
  findOne( @Param('filter') filter: string, @Body() body: { term: string} ) {
    return this.productService.findOne(body.term, filter);
  }
  
}
