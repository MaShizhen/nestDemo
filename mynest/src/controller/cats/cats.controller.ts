
import { Controller, Get, Req ,Headers,Post, HttpCode, Header, Body} from '@nestjs/common';
import {Request} from 'express';

import {MyD} from '../../decorators/MyD.decorator'
import {CreateCatDto} from '../../decorators/cat.dto'
import { create } from 'domain';

@Controller('cats')
//this is the path name, now GET /cats will return the result
export class CatsController {
  @Get()
  // this decorator tells Nest to create a handler for a http get request 
  findAll(): string {
    return 'This action returns all cats';
  }
  @Get('one')
  //now GET /cats/one will return the result
  findOne(): string {
    return 'this is one cat';
  }
  @Get('request')
  findByName(@Req() request:Request,@Headers('cookie') cookie:string):any {
    //get request object by decorator Req
    console.log(request)
    console.log(cookie)
    //there are some buildin decorators to handle request ,
    //read here: https://docs.nestjs.com/custom-decorators#param-decorators
  }
  //use a custom decorator, which is created in /decorators/MyD.decorator
  @Get('useOwnDecorator')
  useOwnDecorator(@MyD('hello') str:string):string{
    console.log(str)
    return str
  }
  //a post methods
  //there are others such as Put,Delete,Path,Options...
  //read here for more details: https://docs.nestjs.com/controllers#resources
  @Post('create')
  @HttpCode(200)   //http code ,default is 200
  @Header('Cache-Control','none') //http header
  create():string{
    return 'this is a new created cat by post method'
  }
   
  @Post('createByDecorator')
  async createByDecorator(@Body() createCatDto:CreateCatDto){
    return `this is adds a new cat,${createCatDto.name} ${createCatDto.age} ${createCatDto.bread}`
  }

}