import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsEnum,
  } from 'class-validator';
  
  import {  Status } from '@prisma/client';

  export class editAppsDto {

    @IsEnum(Status)
    status?:Status;
}