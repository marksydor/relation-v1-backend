import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FindWorldParamsDto extends PaginationDto {
  name?: string;
  description?: string;
}
