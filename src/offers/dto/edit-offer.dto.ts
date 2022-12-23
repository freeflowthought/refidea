import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsEnum,
  } from 'class-validator';
  
  import {  Pstatus } from '@prisma/client';

  export class editOfferDto {

    @IsEnum(Pstatus)
    pStatus?:Pstatus;
}