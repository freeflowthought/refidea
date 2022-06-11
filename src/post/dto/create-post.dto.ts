import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class createPostDto{
  @IsString()
  @IsNotEmpty()
  postEmail:string;
  
  @IsString()
  @IsNotEmpty()
  postTitle:string;
  
  @IsString()
  @IsOptional()
  category?:string;
  
  @IsString()
  @IsNotEmpty()
  description:string;
  
  @IsNumber()
  @IsOptional()
  minSalary?:number;

  @IsNumber()
  @IsOptional()
  maxSalary?:number;




}