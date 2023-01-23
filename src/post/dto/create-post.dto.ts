import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';

import { Category,IsOnsite} from '@prisma/client';

export class createPostDto{
  
  
  @IsString()
  @IsNotEmpty()
  postTitle:string;

  @IsString()
  @IsNotEmpty()
  description:string;

  @IsString()
  @IsOptional()
  country?:string;
  
 
  @IsNumber()
  @IsOptional()
  salary?:number;

  @IsNumber()
  @IsOptional()
  bonus?:number;

 

   @IsEnum(Category)
   @IsOptional()
   category?:Category;

   @IsEnum(IsOnsite)
   @IsOptional()
   isOnsite?: IsOnsite;
   





}


