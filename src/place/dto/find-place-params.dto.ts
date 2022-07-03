import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FindPlaceParamsDto extends PaginationDto {
  name?: string;
  description?: string;
}
