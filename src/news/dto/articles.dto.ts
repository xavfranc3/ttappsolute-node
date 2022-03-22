import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SearchInEnum } from './searchIn.enum';

export class ArticlesDto {
  @ApiPropertyOptional({
    description: 'Search terms',
  })
  @IsOptional()
  @IsString()
  q: string;

  @ApiPropertyOptional({
    description: 'Search in title, description or content',
    enum: SearchInEnum,
    isArray: true,
  })
  @IsString()
  @IsEnum(SearchInEnum)
  @IsOptional()
  searchIn: SearchInEnum;

  @ApiPropertyOptional({
    description: 'Earliest date for results',
  })
  @IsOptional()
  @IsDate()
  from: Date;

  @ApiPropertyOptional({
    description: 'Latest date for results',
  })
  @IsOptional()
  @IsDate()
  to: Date;

  @ApiPropertyOptional({
    description: 'Language of article',
  })
  @IsOptional()
  @IsString()
  language: string;
}
