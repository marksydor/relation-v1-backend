import { IsInt, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(0)
  skip: number;

  @IsInt()
  @Min(0)
  take: number;
}
