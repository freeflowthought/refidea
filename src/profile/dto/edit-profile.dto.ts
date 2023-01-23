import {
    IsNotEmpty,
    IsString,
    IsOptional
  } from 'class-validator';

  export class editProfileDto{
    @IsNotEmpty()
    @IsString()
    introduction: string;

    @IsString()
    @IsOptional()
    country?:string
  }