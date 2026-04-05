import { ApiProperty } from '@nestjs/swagger';

export class PaginationResultDto<T> {
  @ApiProperty({ isArray: true })
  readonly items: T[];

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly totalPages: number;

  constructor(items: T[], total: number, page: number, limit: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
