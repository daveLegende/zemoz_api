import { FindOptionsOrderValue } from './custom.type';

/**
 * Make all properties in T optional and with boolean type
 */
export type PartialBool<T> = {
  [A in keyof T]?: boolean;
};

/**
 * Make all properties in T optional with a type FindOptionsOrderValue
 */
export type PartialOrder<T> = {
  [A in keyof T]?: FindOptionsOrderValue;
};

export type PartialDeep<T> =
  | T
  | (T extends (infer U)[]
      ? PartialDeep<U>[]
      : T extends Map<infer K, infer V>
        ? Map<PartialDeep<K>, PartialDeep<V>>
        : T extends Set<infer M>
          ? Set<PartialDeep<M>>
          : T extends object
            ? {
                [K in keyof T]?: PartialDeep<T[K]>;
              }
            : T);

export type PartialDeepBool<T> =
  | boolean
  | (T extends (infer U)[]
      ? PartialDeepBool<U>
      : T extends Map<infer K, infer V>
        ? Map<PartialDeepBool<K>, PartialDeepBool<V>>
        : T extends Set<infer M>
          ? Set<PartialDeepBool<M>>
          : T extends object
            ? {
                [K in keyof T]?: PartialDeepBool<T[K]>;
              }
            : boolean);
