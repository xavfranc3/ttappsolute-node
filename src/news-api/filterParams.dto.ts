import {
  IsBoolean,
  IsObject,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class FilterParamsDto {
  @IsBoolean()
  topHeadlines: boolean;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  params: object;
}
