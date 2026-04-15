import { IsOptional, IsString } from 'class-validator';

export class GetArticlesQueryDto {
  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  favorited?: string;
}

