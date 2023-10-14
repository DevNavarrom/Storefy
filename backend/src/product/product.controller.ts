import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { ProductsResponseDTO } from 'src/dto/response.dto';
import { Product } from 'src/entities/product.entity';

@Controller('product')
export class ProductController {

  constructor( private readonly productService: ProductService ) {}

  @Post()
  create( @Body() createProductDto: CreateProductDto ) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10
  ): Promise<ProductsResponseDTO> {
    const products: Product[] = await this.productService.findAll(skip, limit);
    
    const total: number = await this.productService.getTotalProductsCount();

    const response: ProductsResponseDTO = {
      products,
      limit,
      total,
      skip,
    };
    console.log(response);
    
    return response;
  }

  @Post(':filter')
  findOne( @Param('filter') filter: string, @Body() body: { term: string} ) {
    return this.productService.findOne(body.term, filter);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update( term, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.productService.remove( id );
  }
  
}
