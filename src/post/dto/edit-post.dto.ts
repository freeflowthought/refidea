import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class editPostDto{
  @IsString()
  @IsNotEmpty()
  postTitle:string;

  @IsString()
  @IsNotEmpty()
  description:string;

}
