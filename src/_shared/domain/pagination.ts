export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Convertit page/limit en skip/take TypeORM
 */
export function paginationOptions(query: PaginationQuery): { skip: number; take: number; page: number; limit: number } {
  const page = Math.max(1, Number(query?.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query?.limit) || 20));
  return { skip: (page - 1) * limit, take: limit, page, limit };
}

/**
 * Construit un résultat paginé à partir des données et du total
 */
export function buildPaginatedResult<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T> {
  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function paginateQuery<T>(
  repository: { findAndCount: (options?: any) => Promise<[T[], number]> },
  query?: PaginationQuery,
  findOptions: Record<string, any> = {},
): Promise<PaginatedResult<T>> {
  const { skip, take, page, limit } = paginationOptions(query ?? {});
  const [data, total] = await repository.findAndCount({ ...findOptions, skip, take });
  return buildPaginatedResult(data, total, page, limit);
}

export function mapPaginated<T, R>(
  result: PaginatedResult<T>,
  mapper: (item: T) => R,
): PaginatedResult<R> {
  return {
    ...result,
    data: result.data.map(mapper),
  };
}
