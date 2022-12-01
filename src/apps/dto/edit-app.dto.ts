import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsEnum,
  } from 'class-validator';
  
  import { Category, Status } from '@prisma/client';

  export class editAppsDto {

    @IsEnum(Category)
    status?:Status;

  }