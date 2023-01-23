import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

  export class createProfileDto{
    @IsNotEmpty()
    @IsString()
    introduction: string;

    @IsString()
    @IsOptional()
    country?:string
  }