import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';

import { Category } from '@prisma/client';

export class createPostDto{
  
  
  @IsString()
  @IsNotEmpty()
  postTitle:string;

  @IsString()
  @IsNotEmpty()
  description:string;
  
 
  @IsNumber()
  @IsOptional()
  salary?:number;

  @IsNumber()
  @IsOptional()
  bonus?:number;

   
   //Can I make it to be the enum type?
   @IsEnum(Category)
   @IsOptional()
   category?:Category;




}


