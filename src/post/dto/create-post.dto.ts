import { Category } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class createPostDto{
 
  
  @IsString()
  @IsNotEmpty()
  postTitle:string;

  @IsString()
  @IsNotEmpty()
  description:string;
  
 
  @IsNumber()
  @IsOptional()
  Salary?:number;

  @IsNumber()
  @IsOptional()
  bonus?:number;


   //Can I make it to be the enum type?
   @IsString()
   @IsOptional()
   category?:string;








}