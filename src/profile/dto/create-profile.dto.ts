import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

  export class createProfileDto{
    @IsNotEmpty()
    @IsString()
    introduction: string;
  }