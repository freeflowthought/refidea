import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';


  export class createAppDto {
    @IsString()
    @IsNotEmpty()
    interest: string

  }