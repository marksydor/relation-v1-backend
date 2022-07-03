import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FindLifeEventParamsDto extends PaginationDto {
  name?: string;
  description?: string;
}
