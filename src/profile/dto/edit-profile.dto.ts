import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

  export class editProfileDto{
    @IsNotEmpty()
    @IsString()
    introduction: string;
  }