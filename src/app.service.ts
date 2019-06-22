import { Injectable, InternalServerErrorException, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { Wein } from './wein';

@Injectable()
export class AppService {
  private id: number = 0;
  private weine : Wein[] = [];

  get(id: number): Wein{
    let res: Wein[] = this.weine.filter(o => o.id === id);
    if(res.length === 1){
      return res[0];
    }else if(res.length === 0){
      throw new NotFoundException();
    }else{
      throw new InternalServerErrorException();
    }
  }

  getAll(): Wein[]{
    return this.weine;
  }

  insert(wein: Wein): void{
    wein.id = this.id++;
    this.weine.push(wein);
  }

  update(id: number, wein: Wein): void{
    this.delete(id);
    wein.id = id;
    this.weine.push(wein);
  }

  delete(id: number): void{
    this.weine = this.weine.filter(o=> o.id !== id);
  }

}
