import { Controller, Get, Post, Body, HttpStatus, HttpCode, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Wein } from './wein';

@Controller('wein')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  get(@Param('id') id:string): Wein{
    return this.appService.get(+id);
  }

  @Get()
  getAll(): Wein[] {
    return this.appService.getAll();
  }

  @Post('insert')
  @HttpCode(HttpStatus.CREATED)
  insert(@Body()wein: Wein): Wein{
    let weinObject : Wein = new Wein(null, wein.sorte, wein.gebiet, wein.jahr);
    this.appService.insert(weinObject);
    return weinObject;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  put(@Param('id') id:string, @Body() wein): void{
    let weinObject : Wein = new Wein(null, wein.sorte, wein.gebiet, wein.jahr);
    this.appService.update(+id, weinObject);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id:string): void{
    this.appService.delete(+id);
  }


}
