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
    
    return response;
  }

  @Post(':filter')
  findOne( @Param('filter') filter: string, @Body() body: { term: string} ) {
    return this.productService.findOne(body.term, filter);
  }

  @Get('filter')
  async search(
    @Query('search') search: string = ''
  ): Promise<ProductsResponseDTO> {
    let options = {}

    if (search) {
      options = {
        $or: [
          { sku: new RegExp(search, 'i') },
          { name: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { tags: new RegExp(search, 'i') }
        ]
      }
    }
    
    const products: Product[] = await this.productService.find(options);

    const total = await this.productService.count(options);

    const response: ProductsResponseDTO = {
      products,
      total,
      skip: 0,
      limit: 10
    }

    return response;
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
