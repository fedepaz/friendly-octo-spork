
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Mes
 * 
 */
export type Mes = $Result.DefaultSelection<Prisma.$MesPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Ingreso
 * 
 */
export type Ingreso = $Result.DefaultSelection<Prisma.$IngresoPayload>
/**
 * Model Gasto
 * 
 */
export type Gasto = $Result.DefaultSelection<Prisma.$GastoPayload>
/**
 * Model Pago
 * 
 */
export type Pago = $Result.DefaultSelection<Prisma.$PagoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Mes
 * const mes = await prisma.mes.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Mes
   * const mes = await prisma.mes.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.mes`: Exposes CRUD operations for the **Mes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mes
    * const mes = await prisma.mes.findMany()
    * ```
    */
  get mes(): Prisma.MesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ingreso`: Exposes CRUD operations for the **Ingreso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingresos
    * const ingresos = await prisma.ingreso.findMany()
    * ```
    */
  get ingreso(): Prisma.IngresoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gasto`: Exposes CRUD operations for the **Gasto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gastos
    * const gastos = await prisma.gasto.findMany()
    * ```
    */
  get gasto(): Prisma.GastoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pago`: Exposes CRUD operations for the **Pago** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagos
    * const pagos = await prisma.pago.findMany()
    * ```
    */
  get pago(): Prisma.PagoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.0
   * Query Engine version: c0aafc03b8ef6cdced8654b9a817999e02457d6a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Mes: 'Mes',
    Category: 'Category',
    Ingreso: 'Ingreso',
    Gasto: 'Gasto',
    Pago: 'Pago'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "mes" | "category" | "ingreso" | "gasto" | "pago"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Mes: {
        payload: Prisma.$MesPayload<ExtArgs>
        fields: Prisma.MesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>
          }
          findFirst: {
            args: Prisma.MesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>
          }
          findMany: {
            args: Prisma.MesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>[]
          }
          create: {
            args: Prisma.MesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>
          }
          createMany: {
            args: Prisma.MesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>[]
          }
          delete: {
            args: Prisma.MesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>
          }
          update: {
            args: Prisma.MesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>
          }
          deleteMany: {
            args: Prisma.MesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>[]
          }
          upsert: {
            args: Prisma.MesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesPayload>
          }
          aggregate: {
            args: Prisma.MesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMes>
          }
          groupBy: {
            args: Prisma.MesGroupByArgs<ExtArgs>
            result: $Utils.Optional<MesGroupByOutputType>[]
          }
          count: {
            args: Prisma.MesCountArgs<ExtArgs>
            result: $Utils.Optional<MesCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Ingreso: {
        payload: Prisma.$IngresoPayload<ExtArgs>
        fields: Prisma.IngresoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IngresoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IngresoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>
          }
          findFirst: {
            args: Prisma.IngresoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IngresoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>
          }
          findMany: {
            args: Prisma.IngresoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>[]
          }
          create: {
            args: Prisma.IngresoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>
          }
          createMany: {
            args: Prisma.IngresoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IngresoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>[]
          }
          delete: {
            args: Prisma.IngresoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>
          }
          update: {
            args: Prisma.IngresoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>
          }
          deleteMany: {
            args: Prisma.IngresoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IngresoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IngresoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>[]
          }
          upsert: {
            args: Prisma.IngresoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngresoPayload>
          }
          aggregate: {
            args: Prisma.IngresoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIngreso>
          }
          groupBy: {
            args: Prisma.IngresoGroupByArgs<ExtArgs>
            result: $Utils.Optional<IngresoGroupByOutputType>[]
          }
          count: {
            args: Prisma.IngresoCountArgs<ExtArgs>
            result: $Utils.Optional<IngresoCountAggregateOutputType> | number
          }
        }
      }
      Gasto: {
        payload: Prisma.$GastoPayload<ExtArgs>
        fields: Prisma.GastoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GastoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GastoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>
          }
          findFirst: {
            args: Prisma.GastoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GastoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>
          }
          findMany: {
            args: Prisma.GastoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>[]
          }
          create: {
            args: Prisma.GastoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>
          }
          createMany: {
            args: Prisma.GastoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GastoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>[]
          }
          delete: {
            args: Prisma.GastoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>
          }
          update: {
            args: Prisma.GastoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>
          }
          deleteMany: {
            args: Prisma.GastoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GastoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GastoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>[]
          }
          upsert: {
            args: Prisma.GastoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GastoPayload>
          }
          aggregate: {
            args: Prisma.GastoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGasto>
          }
          groupBy: {
            args: Prisma.GastoGroupByArgs<ExtArgs>
            result: $Utils.Optional<GastoGroupByOutputType>[]
          }
          count: {
            args: Prisma.GastoCountArgs<ExtArgs>
            result: $Utils.Optional<GastoCountAggregateOutputType> | number
          }
        }
      }
      Pago: {
        payload: Prisma.$PagoPayload<ExtArgs>
        fields: Prisma.PagoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findFirst: {
            args: Prisma.PagoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findMany: {
            args: Prisma.PagoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          create: {
            args: Prisma.PagoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          createMany: {
            args: Prisma.PagoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PagoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          delete: {
            args: Prisma.PagoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          update: {
            args: Prisma.PagoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          deleteMany: {
            args: Prisma.PagoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PagoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          upsert: {
            args: Prisma.PagoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          aggregate: {
            args: Prisma.PagoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePago>
          }
          groupBy: {
            args: Prisma.PagoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagoCountArgs<ExtArgs>
            result: $Utils.Optional<PagoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    mes?: MesOmit
    category?: CategoryOmit
    ingreso?: IngresoOmit
    gasto?: GastoOmit
    pago?: PagoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MesCountOutputType
   */

  export type MesCountOutputType = {
    ingresos: number
    gastos: number
    pagos: number
  }

  export type MesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingresos?: boolean | MesCountOutputTypeCountIngresosArgs
    gastos?: boolean | MesCountOutputTypeCountGastosArgs
    pagos?: boolean | MesCountOutputTypeCountPagosArgs
  }

  // Custom InputTypes
  /**
   * MesCountOutputType without action
   */
  export type MesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MesCountOutputType
     */
    select?: MesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MesCountOutputType without action
   */
  export type MesCountOutputTypeCountIngresosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngresoWhereInput
  }

  /**
   * MesCountOutputType without action
   */
  export type MesCountOutputTypeCountGastosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GastoWhereInput
  }

  /**
   * MesCountOutputType without action
   */
  export type MesCountOutputTypeCountPagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    ingresos: number
    gastos: number
    pagos: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingresos?: boolean | CategoryCountOutputTypeCountIngresosArgs
    gastos?: boolean | CategoryCountOutputTypeCountGastosArgs
    pagos?: boolean | CategoryCountOutputTypeCountPagosArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountIngresosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngresoWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountGastosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GastoWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountPagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Mes
   */

  export type AggregateMes = {
    _count: MesCountAggregateOutputType | null
    _avg: MesAvgAggregateOutputType | null
    _sum: MesSumAggregateOutputType | null
    _min: MesMinAggregateOutputType | null
    _max: MesMaxAggregateOutputType | null
  }

  export type MesAvgAggregateOutputType = {
    id: number | null
    año: number | null
    mes: number | null
    totalIngresos: Decimal | null
    totalGastos: Decimal | null
    totalPagos: Decimal | null
    saldoFinal: Decimal | null
  }

  export type MesSumAggregateOutputType = {
    id: number | null
    año: number | null
    mes: number | null
    totalIngresos: Decimal | null
    totalGastos: Decimal | null
    totalPagos: Decimal | null
    saldoFinal: Decimal | null
  }

  export type MesMinAggregateOutputType = {
    id: number | null
    año: number | null
    mes: number | null
    fechaInicio: Date | null
    fechaFin: Date | null
    totalIngresos: Decimal | null
    totalGastos: Decimal | null
    totalPagos: Decimal | null
    saldoFinal: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MesMaxAggregateOutputType = {
    id: number | null
    año: number | null
    mes: number | null
    fechaInicio: Date | null
    fechaFin: Date | null
    totalIngresos: Decimal | null
    totalGastos: Decimal | null
    totalPagos: Decimal | null
    saldoFinal: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MesCountAggregateOutputType = {
    id: number
    año: number
    mes: number
    fechaInicio: number
    fechaFin: number
    totalIngresos: number
    totalGastos: number
    totalPagos: number
    saldoFinal: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MesAvgAggregateInputType = {
    id?: true
    año?: true
    mes?: true
    totalIngresos?: true
    totalGastos?: true
    totalPagos?: true
    saldoFinal?: true
  }

  export type MesSumAggregateInputType = {
    id?: true
    año?: true
    mes?: true
    totalIngresos?: true
    totalGastos?: true
    totalPagos?: true
    saldoFinal?: true
  }

  export type MesMinAggregateInputType = {
    id?: true
    año?: true
    mes?: true
    fechaInicio?: true
    fechaFin?: true
    totalIngresos?: true
    totalGastos?: true
    totalPagos?: true
    saldoFinal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MesMaxAggregateInputType = {
    id?: true
    año?: true
    mes?: true
    fechaInicio?: true
    fechaFin?: true
    totalIngresos?: true
    totalGastos?: true
    totalPagos?: true
    saldoFinal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MesCountAggregateInputType = {
    id?: true
    año?: true
    mes?: true
    fechaInicio?: true
    fechaFin?: true
    totalIngresos?: true
    totalGastos?: true
    totalPagos?: true
    saldoFinal?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mes to aggregate.
     */
    where?: MesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mes to fetch.
     */
    orderBy?: MesOrderByWithRelationInput | MesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mes
    **/
    _count?: true | MesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MesMaxAggregateInputType
  }

  export type GetMesAggregateType<T extends MesAggregateArgs> = {
        [P in keyof T & keyof AggregateMes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMes[P]>
      : GetScalarType<T[P], AggregateMes[P]>
  }




  export type MesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MesWhereInput
    orderBy?: MesOrderByWithAggregationInput | MesOrderByWithAggregationInput[]
    by: MesScalarFieldEnum[] | MesScalarFieldEnum
    having?: MesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MesCountAggregateInputType | true
    _avg?: MesAvgAggregateInputType
    _sum?: MesSumAggregateInputType
    _min?: MesMinAggregateInputType
    _max?: MesMaxAggregateInputType
  }

  export type MesGroupByOutputType = {
    id: number
    año: number
    mes: number
    fechaInicio: Date
    fechaFin: Date
    totalIngresos: Decimal
    totalGastos: Decimal
    totalPagos: Decimal
    saldoFinal: Decimal
    createdAt: Date
    updatedAt: Date
    _count: MesCountAggregateOutputType | null
    _avg: MesAvgAggregateOutputType | null
    _sum: MesSumAggregateOutputType | null
    _min: MesMinAggregateOutputType | null
    _max: MesMaxAggregateOutputType | null
  }

  type GetMesGroupByPayload<T extends MesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MesGroupByOutputType[P]>
            : GetScalarType<T[P], MesGroupByOutputType[P]>
        }
      >
    >


  export type MesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    año?: boolean
    mes?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    totalIngresos?: boolean
    totalGastos?: boolean
    totalPagos?: boolean
    saldoFinal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ingresos?: boolean | Mes$ingresosArgs<ExtArgs>
    gastos?: boolean | Mes$gastosArgs<ExtArgs>
    pagos?: boolean | Mes$pagosArgs<ExtArgs>
    _count?: boolean | MesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mes"]>

  export type MesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    año?: boolean
    mes?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    totalIngresos?: boolean
    totalGastos?: boolean
    totalPagos?: boolean
    saldoFinal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mes"]>

  export type MesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    año?: boolean
    mes?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    totalIngresos?: boolean
    totalGastos?: boolean
    totalPagos?: boolean
    saldoFinal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mes"]>

  export type MesSelectScalar = {
    id?: boolean
    año?: boolean
    mes?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    totalIngresos?: boolean
    totalGastos?: boolean
    totalPagos?: boolean
    saldoFinal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "año" | "mes" | "fechaInicio" | "fechaFin" | "totalIngresos" | "totalGastos" | "totalPagos" | "saldoFinal" | "createdAt" | "updatedAt", ExtArgs["result"]["mes"]>
  export type MesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingresos?: boolean | Mes$ingresosArgs<ExtArgs>
    gastos?: boolean | Mes$gastosArgs<ExtArgs>
    pagos?: boolean | Mes$pagosArgs<ExtArgs>
    _count?: boolean | MesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mes"
    objects: {
      ingresos: Prisma.$IngresoPayload<ExtArgs>[]
      gastos: Prisma.$GastoPayload<ExtArgs>[]
      pagos: Prisma.$PagoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      año: number
      mes: number
      fechaInicio: Date
      fechaFin: Date
      totalIngresos: Prisma.Decimal
      totalGastos: Prisma.Decimal
      totalPagos: Prisma.Decimal
      saldoFinal: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mes"]>
    composites: {}
  }

  type MesGetPayload<S extends boolean | null | undefined | MesDefaultArgs> = $Result.GetResult<Prisma.$MesPayload, S>

  type MesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MesCountAggregateInputType | true
    }

  export interface MesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mes'], meta: { name: 'Mes' } }
    /**
     * Find zero or one Mes that matches the filter.
     * @param {MesFindUniqueArgs} args - Arguments to find a Mes
     * @example
     * // Get one Mes
     * const mes = await prisma.mes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MesFindUniqueArgs>(args: SelectSubset<T, MesFindUniqueArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MesFindUniqueOrThrowArgs} args - Arguments to find a Mes
     * @example
     * // Get one Mes
     * const mes = await prisma.mes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MesFindUniqueOrThrowArgs>(args: SelectSubset<T, MesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesFindFirstArgs} args - Arguments to find a Mes
     * @example
     * // Get one Mes
     * const mes = await prisma.mes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MesFindFirstArgs>(args?: SelectSubset<T, MesFindFirstArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesFindFirstOrThrowArgs} args - Arguments to find a Mes
     * @example
     * // Get one Mes
     * const mes = await prisma.mes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MesFindFirstOrThrowArgs>(args?: SelectSubset<T, MesFindFirstOrThrowArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mes
     * const mes = await prisma.mes.findMany()
     * 
     * // Get first 10 Mes
     * const mes = await prisma.mes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mesWithIdOnly = await prisma.mes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MesFindManyArgs>(args?: SelectSubset<T, MesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mes.
     * @param {MesCreateArgs} args - Arguments to create a Mes.
     * @example
     * // Create one Mes
     * const Mes = await prisma.mes.create({
     *   data: {
     *     // ... data to create a Mes
     *   }
     * })
     * 
     */
    create<T extends MesCreateArgs>(args: SelectSubset<T, MesCreateArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mes.
     * @param {MesCreateManyArgs} args - Arguments to create many Mes.
     * @example
     * // Create many Mes
     * const mes = await prisma.mes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MesCreateManyArgs>(args?: SelectSubset<T, MesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mes and returns the data saved in the database.
     * @param {MesCreateManyAndReturnArgs} args - Arguments to create many Mes.
     * @example
     * // Create many Mes
     * const mes = await prisma.mes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mes and only return the `id`
     * const mesWithIdOnly = await prisma.mes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MesCreateManyAndReturnArgs>(args?: SelectSubset<T, MesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mes.
     * @param {MesDeleteArgs} args - Arguments to delete one Mes.
     * @example
     * // Delete one Mes
     * const Mes = await prisma.mes.delete({
     *   where: {
     *     // ... filter to delete one Mes
     *   }
     * })
     * 
     */
    delete<T extends MesDeleteArgs>(args: SelectSubset<T, MesDeleteArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mes.
     * @param {MesUpdateArgs} args - Arguments to update one Mes.
     * @example
     * // Update one Mes
     * const mes = await prisma.mes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MesUpdateArgs>(args: SelectSubset<T, MesUpdateArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mes.
     * @param {MesDeleteManyArgs} args - Arguments to filter Mes to delete.
     * @example
     * // Delete a few Mes
     * const { count } = await prisma.mes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MesDeleteManyArgs>(args?: SelectSubset<T, MesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mes
     * const mes = await prisma.mes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MesUpdateManyArgs>(args: SelectSubset<T, MesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mes and returns the data updated in the database.
     * @param {MesUpdateManyAndReturnArgs} args - Arguments to update many Mes.
     * @example
     * // Update many Mes
     * const mes = await prisma.mes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mes and only return the `id`
     * const mesWithIdOnly = await prisma.mes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MesUpdateManyAndReturnArgs>(args: SelectSubset<T, MesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mes.
     * @param {MesUpsertArgs} args - Arguments to update or create a Mes.
     * @example
     * // Update or create a Mes
     * const mes = await prisma.mes.upsert({
     *   create: {
     *     // ... data to create a Mes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mes we want to update
     *   }
     * })
     */
    upsert<T extends MesUpsertArgs>(args: SelectSubset<T, MesUpsertArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesCountArgs} args - Arguments to filter Mes to count.
     * @example
     * // Count the number of Mes
     * const count = await prisma.mes.count({
     *   where: {
     *     // ... the filter for the Mes we want to count
     *   }
     * })
    **/
    count<T extends MesCountArgs>(
      args?: Subset<T, MesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MesAggregateArgs>(args: Subset<T, MesAggregateArgs>): Prisma.PrismaPromise<GetMesAggregateType<T>>

    /**
     * Group by Mes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MesGroupByArgs['orderBy'] }
        : { orderBy?: MesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mes model
   */
  readonly fields: MesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ingresos<T extends Mes$ingresosArgs<ExtArgs> = {}>(args?: Subset<T, Mes$ingresosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gastos<T extends Mes$gastosArgs<ExtArgs> = {}>(args?: Subset<T, Mes$gastosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pagos<T extends Mes$pagosArgs<ExtArgs> = {}>(args?: Subset<T, Mes$pagosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mes model
   */
  interface MesFieldRefs {
    readonly id: FieldRef<"Mes", 'Int'>
    readonly año: FieldRef<"Mes", 'Int'>
    readonly mes: FieldRef<"Mes", 'Int'>
    readonly fechaInicio: FieldRef<"Mes", 'DateTime'>
    readonly fechaFin: FieldRef<"Mes", 'DateTime'>
    readonly totalIngresos: FieldRef<"Mes", 'Decimal'>
    readonly totalGastos: FieldRef<"Mes", 'Decimal'>
    readonly totalPagos: FieldRef<"Mes", 'Decimal'>
    readonly saldoFinal: FieldRef<"Mes", 'Decimal'>
    readonly createdAt: FieldRef<"Mes", 'DateTime'>
    readonly updatedAt: FieldRef<"Mes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mes findUnique
   */
  export type MesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * Filter, which Mes to fetch.
     */
    where: MesWhereUniqueInput
  }

  /**
   * Mes findUniqueOrThrow
   */
  export type MesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * Filter, which Mes to fetch.
     */
    where: MesWhereUniqueInput
  }

  /**
   * Mes findFirst
   */
  export type MesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * Filter, which Mes to fetch.
     */
    where?: MesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mes to fetch.
     */
    orderBy?: MesOrderByWithRelationInput | MesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mes.
     */
    cursor?: MesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mes.
     */
    distinct?: MesScalarFieldEnum | MesScalarFieldEnum[]
  }

  /**
   * Mes findFirstOrThrow
   */
  export type MesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * Filter, which Mes to fetch.
     */
    where?: MesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mes to fetch.
     */
    orderBy?: MesOrderByWithRelationInput | MesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mes.
     */
    cursor?: MesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mes.
     */
    distinct?: MesScalarFieldEnum | MesScalarFieldEnum[]
  }

  /**
   * Mes findMany
   */
  export type MesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * Filter, which Mes to fetch.
     */
    where?: MesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mes to fetch.
     */
    orderBy?: MesOrderByWithRelationInput | MesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mes.
     */
    cursor?: MesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mes.
     */
    skip?: number
    distinct?: MesScalarFieldEnum | MesScalarFieldEnum[]
  }

  /**
   * Mes create
   */
  export type MesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * The data needed to create a Mes.
     */
    data: XOR<MesCreateInput, MesUncheckedCreateInput>
  }

  /**
   * Mes createMany
   */
  export type MesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mes.
     */
    data: MesCreateManyInput | MesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mes createManyAndReturn
   */
  export type MesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * The data used to create many Mes.
     */
    data: MesCreateManyInput | MesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mes update
   */
  export type MesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * The data needed to update a Mes.
     */
    data: XOR<MesUpdateInput, MesUncheckedUpdateInput>
    /**
     * Choose, which Mes to update.
     */
    where: MesWhereUniqueInput
  }

  /**
   * Mes updateMany
   */
  export type MesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mes.
     */
    data: XOR<MesUpdateManyMutationInput, MesUncheckedUpdateManyInput>
    /**
     * Filter which Mes to update
     */
    where?: MesWhereInput
    /**
     * Limit how many Mes to update.
     */
    limit?: number
  }

  /**
   * Mes updateManyAndReturn
   */
  export type MesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * The data used to update Mes.
     */
    data: XOR<MesUpdateManyMutationInput, MesUncheckedUpdateManyInput>
    /**
     * Filter which Mes to update
     */
    where?: MesWhereInput
    /**
     * Limit how many Mes to update.
     */
    limit?: number
  }

  /**
   * Mes upsert
   */
  export type MesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * The filter to search for the Mes to update in case it exists.
     */
    where: MesWhereUniqueInput
    /**
     * In case the Mes found by the `where` argument doesn't exist, create a new Mes with this data.
     */
    create: XOR<MesCreateInput, MesUncheckedCreateInput>
    /**
     * In case the Mes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MesUpdateInput, MesUncheckedUpdateInput>
  }

  /**
   * Mes delete
   */
  export type MesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
    /**
     * Filter which Mes to delete.
     */
    where: MesWhereUniqueInput
  }

  /**
   * Mes deleteMany
   */
  export type MesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mes to delete
     */
    where?: MesWhereInput
    /**
     * Limit how many Mes to delete.
     */
    limit?: number
  }

  /**
   * Mes.ingresos
   */
  export type Mes$ingresosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    where?: IngresoWhereInput
    orderBy?: IngresoOrderByWithRelationInput | IngresoOrderByWithRelationInput[]
    cursor?: IngresoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngresoScalarFieldEnum | IngresoScalarFieldEnum[]
  }

  /**
   * Mes.gastos
   */
  export type Mes$gastosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    where?: GastoWhereInput
    orderBy?: GastoOrderByWithRelationInput | GastoOrderByWithRelationInput[]
    cursor?: GastoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * Mes.pagos
   */
  export type Mes$pagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    cursor?: PagoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Mes without action
   */
  export type MesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mes
     */
    select?: MesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mes
     */
    omit?: MesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    nombre: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    nombre: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ingresos?: boolean | Category$ingresosArgs<ExtArgs>
    gastos?: boolean | Category$gastosArgs<ExtArgs>
    pagos?: boolean | Category$pagosArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingresos?: boolean | Category$ingresosArgs<ExtArgs>
    gastos?: boolean | Category$gastosArgs<ExtArgs>
    pagos?: boolean | Category$pagosArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      ingresos: Prisma.$IngresoPayload<ExtArgs>[]
      gastos: Prisma.$GastoPayload<ExtArgs>[]
      pagos: Prisma.$PagoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ingresos<T extends Category$ingresosArgs<ExtArgs> = {}>(args?: Subset<T, Category$ingresosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gastos<T extends Category$gastosArgs<ExtArgs> = {}>(args?: Subset<T, Category$gastosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pagos<T extends Category$pagosArgs<ExtArgs> = {}>(args?: Subset<T, Category$pagosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly nombre: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.ingresos
   */
  export type Category$ingresosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    where?: IngresoWhereInput
    orderBy?: IngresoOrderByWithRelationInput | IngresoOrderByWithRelationInput[]
    cursor?: IngresoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngresoScalarFieldEnum | IngresoScalarFieldEnum[]
  }

  /**
   * Category.gastos
   */
  export type Category$gastosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    where?: GastoWhereInput
    orderBy?: GastoOrderByWithRelationInput | GastoOrderByWithRelationInput[]
    cursor?: GastoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * Category.pagos
   */
  export type Category$pagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    cursor?: PagoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Ingreso
   */

  export type AggregateIngreso = {
    _count: IngresoCountAggregateOutputType | null
    _avg: IngresoAvgAggregateOutputType | null
    _sum: IngresoSumAggregateOutputType | null
    _min: IngresoMinAggregateOutputType | null
    _max: IngresoMaxAggregateOutputType | null
  }

  export type IngresoAvgAggregateOutputType = {
    id: number | null
    mesId: number | null
    monto: Decimal | null
    categoryId: number | null
  }

  export type IngresoSumAggregateOutputType = {
    id: number | null
    mesId: number | null
    monto: Decimal | null
    categoryId: number | null
  }

  export type IngresoMinAggregateOutputType = {
    id: number | null
    mesId: number | null
    fecha: Date | null
    monto: Decimal | null
    concepto: string | null
    categoryId: number | null
    createdAt: Date | null
  }

  export type IngresoMaxAggregateOutputType = {
    id: number | null
    mesId: number | null
    fecha: Date | null
    monto: Decimal | null
    concepto: string | null
    categoryId: number | null
    createdAt: Date | null
  }

  export type IngresoCountAggregateOutputType = {
    id: number
    mesId: number
    fecha: number
    monto: number
    concepto: number
    categoryId: number
    createdAt: number
    _all: number
  }


  export type IngresoAvgAggregateInputType = {
    id?: true
    mesId?: true
    monto?: true
    categoryId?: true
  }

  export type IngresoSumAggregateInputType = {
    id?: true
    mesId?: true
    monto?: true
    categoryId?: true
  }

  export type IngresoMinAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
  }

  export type IngresoMaxAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
  }

  export type IngresoCountAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
    _all?: true
  }

  export type IngresoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingreso to aggregate.
     */
    where?: IngresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingresos to fetch.
     */
    orderBy?: IngresoOrderByWithRelationInput | IngresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IngresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingresos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ingresos
    **/
    _count?: true | IngresoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IngresoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IngresoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IngresoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IngresoMaxAggregateInputType
  }

  export type GetIngresoAggregateType<T extends IngresoAggregateArgs> = {
        [P in keyof T & keyof AggregateIngreso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngreso[P]>
      : GetScalarType<T[P], AggregateIngreso[P]>
  }




  export type IngresoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngresoWhereInput
    orderBy?: IngresoOrderByWithAggregationInput | IngresoOrderByWithAggregationInput[]
    by: IngresoScalarFieldEnum[] | IngresoScalarFieldEnum
    having?: IngresoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IngresoCountAggregateInputType | true
    _avg?: IngresoAvgAggregateInputType
    _sum?: IngresoSumAggregateInputType
    _min?: IngresoMinAggregateInputType
    _max?: IngresoMaxAggregateInputType
  }

  export type IngresoGroupByOutputType = {
    id: number
    mesId: number
    fecha: Date
    monto: Decimal
    concepto: string
    categoryId: number
    createdAt: Date
    _count: IngresoCountAggregateOutputType | null
    _avg: IngresoAvgAggregateOutputType | null
    _sum: IngresoSumAggregateOutputType | null
    _min: IngresoMinAggregateOutputType | null
    _max: IngresoMaxAggregateOutputType | null
  }

  type GetIngresoGroupByPayload<T extends IngresoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IngresoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IngresoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngresoGroupByOutputType[P]>
            : GetScalarType<T[P], IngresoGroupByOutputType[P]>
        }
      >
    >


  export type IngresoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingreso"]>

  export type IngresoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingreso"]>

  export type IngresoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingreso"]>

  export type IngresoSelectScalar = {
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
  }

  export type IngresoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mesId" | "fecha" | "monto" | "concepto" | "categoryId" | "createdAt", ExtArgs["result"]["ingreso"]>
  export type IngresoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type IngresoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type IngresoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $IngresoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ingreso"
    objects: {
      mes: Prisma.$MesPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mesId: number
      fecha: Date
      monto: Prisma.Decimal
      concepto: string
      categoryId: number
      createdAt: Date
    }, ExtArgs["result"]["ingreso"]>
    composites: {}
  }

  type IngresoGetPayload<S extends boolean | null | undefined | IngresoDefaultArgs> = $Result.GetResult<Prisma.$IngresoPayload, S>

  type IngresoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IngresoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IngresoCountAggregateInputType | true
    }

  export interface IngresoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ingreso'], meta: { name: 'Ingreso' } }
    /**
     * Find zero or one Ingreso that matches the filter.
     * @param {IngresoFindUniqueArgs} args - Arguments to find a Ingreso
     * @example
     * // Get one Ingreso
     * const ingreso = await prisma.ingreso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngresoFindUniqueArgs>(args: SelectSubset<T, IngresoFindUniqueArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ingreso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IngresoFindUniqueOrThrowArgs} args - Arguments to find a Ingreso
     * @example
     * // Get one Ingreso
     * const ingreso = await prisma.ingreso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngresoFindUniqueOrThrowArgs>(args: SelectSubset<T, IngresoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingreso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngresoFindFirstArgs} args - Arguments to find a Ingreso
     * @example
     * // Get one Ingreso
     * const ingreso = await prisma.ingreso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngresoFindFirstArgs>(args?: SelectSubset<T, IngresoFindFirstArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingreso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngresoFindFirstOrThrowArgs} args - Arguments to find a Ingreso
     * @example
     * // Get one Ingreso
     * const ingreso = await prisma.ingreso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngresoFindFirstOrThrowArgs>(args?: SelectSubset<T, IngresoFindFirstOrThrowArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ingresos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngresoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingresos
     * const ingresos = await prisma.ingreso.findMany()
     * 
     * // Get first 10 Ingresos
     * const ingresos = await prisma.ingreso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingresoWithIdOnly = await prisma.ingreso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IngresoFindManyArgs>(args?: SelectSubset<T, IngresoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ingreso.
     * @param {IngresoCreateArgs} args - Arguments to create a Ingreso.
     * @example
     * // Create one Ingreso
     * const Ingreso = await prisma.ingreso.create({
     *   data: {
     *     // ... data to create a Ingreso
     *   }
     * })
     * 
     */
    create<T extends IngresoCreateArgs>(args: SelectSubset<T, IngresoCreateArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ingresos.
     * @param {IngresoCreateManyArgs} args - Arguments to create many Ingresos.
     * @example
     * // Create many Ingresos
     * const ingreso = await prisma.ingreso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IngresoCreateManyArgs>(args?: SelectSubset<T, IngresoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ingresos and returns the data saved in the database.
     * @param {IngresoCreateManyAndReturnArgs} args - Arguments to create many Ingresos.
     * @example
     * // Create many Ingresos
     * const ingreso = await prisma.ingreso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ingresos and only return the `id`
     * const ingresoWithIdOnly = await prisma.ingreso.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IngresoCreateManyAndReturnArgs>(args?: SelectSubset<T, IngresoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ingreso.
     * @param {IngresoDeleteArgs} args - Arguments to delete one Ingreso.
     * @example
     * // Delete one Ingreso
     * const Ingreso = await prisma.ingreso.delete({
     *   where: {
     *     // ... filter to delete one Ingreso
     *   }
     * })
     * 
     */
    delete<T extends IngresoDeleteArgs>(args: SelectSubset<T, IngresoDeleteArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ingreso.
     * @param {IngresoUpdateArgs} args - Arguments to update one Ingreso.
     * @example
     * // Update one Ingreso
     * const ingreso = await prisma.ingreso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IngresoUpdateArgs>(args: SelectSubset<T, IngresoUpdateArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ingresos.
     * @param {IngresoDeleteManyArgs} args - Arguments to filter Ingresos to delete.
     * @example
     * // Delete a few Ingresos
     * const { count } = await prisma.ingreso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IngresoDeleteManyArgs>(args?: SelectSubset<T, IngresoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingresos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngresoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingresos
     * const ingreso = await prisma.ingreso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IngresoUpdateManyArgs>(args: SelectSubset<T, IngresoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingresos and returns the data updated in the database.
     * @param {IngresoUpdateManyAndReturnArgs} args - Arguments to update many Ingresos.
     * @example
     * // Update many Ingresos
     * const ingreso = await prisma.ingreso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ingresos and only return the `id`
     * const ingresoWithIdOnly = await prisma.ingreso.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IngresoUpdateManyAndReturnArgs>(args: SelectSubset<T, IngresoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ingreso.
     * @param {IngresoUpsertArgs} args - Arguments to update or create a Ingreso.
     * @example
     * // Update or create a Ingreso
     * const ingreso = await prisma.ingreso.upsert({
     *   create: {
     *     // ... data to create a Ingreso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingreso we want to update
     *   }
     * })
     */
    upsert<T extends IngresoUpsertArgs>(args: SelectSubset<T, IngresoUpsertArgs<ExtArgs>>): Prisma__IngresoClient<$Result.GetResult<Prisma.$IngresoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ingresos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngresoCountArgs} args - Arguments to filter Ingresos to count.
     * @example
     * // Count the number of Ingresos
     * const count = await prisma.ingreso.count({
     *   where: {
     *     // ... the filter for the Ingresos we want to count
     *   }
     * })
    **/
    count<T extends IngresoCountArgs>(
      args?: Subset<T, IngresoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngresoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ingreso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngresoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IngresoAggregateArgs>(args: Subset<T, IngresoAggregateArgs>): Prisma.PrismaPromise<GetIngresoAggregateType<T>>

    /**
     * Group by Ingreso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngresoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IngresoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IngresoGroupByArgs['orderBy'] }
        : { orderBy?: IngresoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IngresoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngresoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ingreso model
   */
  readonly fields: IngresoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingreso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IngresoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mes<T extends MesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MesDefaultArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ingreso model
   */
  interface IngresoFieldRefs {
    readonly id: FieldRef<"Ingreso", 'Int'>
    readonly mesId: FieldRef<"Ingreso", 'Int'>
    readonly fecha: FieldRef<"Ingreso", 'DateTime'>
    readonly monto: FieldRef<"Ingreso", 'Decimal'>
    readonly concepto: FieldRef<"Ingreso", 'String'>
    readonly categoryId: FieldRef<"Ingreso", 'Int'>
    readonly createdAt: FieldRef<"Ingreso", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ingreso findUnique
   */
  export type IngresoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * Filter, which Ingreso to fetch.
     */
    where: IngresoWhereUniqueInput
  }

  /**
   * Ingreso findUniqueOrThrow
   */
  export type IngresoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * Filter, which Ingreso to fetch.
     */
    where: IngresoWhereUniqueInput
  }

  /**
   * Ingreso findFirst
   */
  export type IngresoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * Filter, which Ingreso to fetch.
     */
    where?: IngresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingresos to fetch.
     */
    orderBy?: IngresoOrderByWithRelationInput | IngresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingresos.
     */
    cursor?: IngresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingresos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingresos.
     */
    distinct?: IngresoScalarFieldEnum | IngresoScalarFieldEnum[]
  }

  /**
   * Ingreso findFirstOrThrow
   */
  export type IngresoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * Filter, which Ingreso to fetch.
     */
    where?: IngresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingresos to fetch.
     */
    orderBy?: IngresoOrderByWithRelationInput | IngresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingresos.
     */
    cursor?: IngresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingresos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingresos.
     */
    distinct?: IngresoScalarFieldEnum | IngresoScalarFieldEnum[]
  }

  /**
   * Ingreso findMany
   */
  export type IngresoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * Filter, which Ingresos to fetch.
     */
    where?: IngresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingresos to fetch.
     */
    orderBy?: IngresoOrderByWithRelationInput | IngresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingresos.
     */
    cursor?: IngresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingresos.
     */
    skip?: number
    distinct?: IngresoScalarFieldEnum | IngresoScalarFieldEnum[]
  }

  /**
   * Ingreso create
   */
  export type IngresoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * The data needed to create a Ingreso.
     */
    data: XOR<IngresoCreateInput, IngresoUncheckedCreateInput>
  }

  /**
   * Ingreso createMany
   */
  export type IngresoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ingresos.
     */
    data: IngresoCreateManyInput | IngresoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ingreso createManyAndReturn
   */
  export type IngresoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * The data used to create many Ingresos.
     */
    data: IngresoCreateManyInput | IngresoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ingreso update
   */
  export type IngresoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * The data needed to update a Ingreso.
     */
    data: XOR<IngresoUpdateInput, IngresoUncheckedUpdateInput>
    /**
     * Choose, which Ingreso to update.
     */
    where: IngresoWhereUniqueInput
  }

  /**
   * Ingreso updateMany
   */
  export type IngresoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ingresos.
     */
    data: XOR<IngresoUpdateManyMutationInput, IngresoUncheckedUpdateManyInput>
    /**
     * Filter which Ingresos to update
     */
    where?: IngresoWhereInput
    /**
     * Limit how many Ingresos to update.
     */
    limit?: number
  }

  /**
   * Ingreso updateManyAndReturn
   */
  export type IngresoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * The data used to update Ingresos.
     */
    data: XOR<IngresoUpdateManyMutationInput, IngresoUncheckedUpdateManyInput>
    /**
     * Filter which Ingresos to update
     */
    where?: IngresoWhereInput
    /**
     * Limit how many Ingresos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ingreso upsert
   */
  export type IngresoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * The filter to search for the Ingreso to update in case it exists.
     */
    where: IngresoWhereUniqueInput
    /**
     * In case the Ingreso found by the `where` argument doesn't exist, create a new Ingreso with this data.
     */
    create: XOR<IngresoCreateInput, IngresoUncheckedCreateInput>
    /**
     * In case the Ingreso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IngresoUpdateInput, IngresoUncheckedUpdateInput>
  }

  /**
   * Ingreso delete
   */
  export type IngresoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
    /**
     * Filter which Ingreso to delete.
     */
    where: IngresoWhereUniqueInput
  }

  /**
   * Ingreso deleteMany
   */
  export type IngresoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingresos to delete
     */
    where?: IngresoWhereInput
    /**
     * Limit how many Ingresos to delete.
     */
    limit?: number
  }

  /**
   * Ingreso without action
   */
  export type IngresoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingreso
     */
    select?: IngresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingreso
     */
    omit?: IngresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngresoInclude<ExtArgs> | null
  }


  /**
   * Model Gasto
   */

  export type AggregateGasto = {
    _count: GastoCountAggregateOutputType | null
    _avg: GastoAvgAggregateOutputType | null
    _sum: GastoSumAggregateOutputType | null
    _min: GastoMinAggregateOutputType | null
    _max: GastoMaxAggregateOutputType | null
  }

  export type GastoAvgAggregateOutputType = {
    id: number | null
    mesId: number | null
    monto: Decimal | null
    categoryId: number | null
  }

  export type GastoSumAggregateOutputType = {
    id: number | null
    mesId: number | null
    monto: Decimal | null
    categoryId: number | null
  }

  export type GastoMinAggregateOutputType = {
    id: number | null
    mesId: number | null
    fecha: Date | null
    monto: Decimal | null
    concepto: string | null
    categoryId: number | null
    createdAt: Date | null
  }

  export type GastoMaxAggregateOutputType = {
    id: number | null
    mesId: number | null
    fecha: Date | null
    monto: Decimal | null
    concepto: string | null
    categoryId: number | null
    createdAt: Date | null
  }

  export type GastoCountAggregateOutputType = {
    id: number
    mesId: number
    fecha: number
    monto: number
    concepto: number
    categoryId: number
    createdAt: number
    _all: number
  }


  export type GastoAvgAggregateInputType = {
    id?: true
    mesId?: true
    monto?: true
    categoryId?: true
  }

  export type GastoSumAggregateInputType = {
    id?: true
    mesId?: true
    monto?: true
    categoryId?: true
  }

  export type GastoMinAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
  }

  export type GastoMaxAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
  }

  export type GastoCountAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
    _all?: true
  }

  export type GastoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gasto to aggregate.
     */
    where?: GastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gastos to fetch.
     */
    orderBy?: GastoOrderByWithRelationInput | GastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gastos
    **/
    _count?: true | GastoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GastoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GastoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GastoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GastoMaxAggregateInputType
  }

  export type GetGastoAggregateType<T extends GastoAggregateArgs> = {
        [P in keyof T & keyof AggregateGasto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGasto[P]>
      : GetScalarType<T[P], AggregateGasto[P]>
  }




  export type GastoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GastoWhereInput
    orderBy?: GastoOrderByWithAggregationInput | GastoOrderByWithAggregationInput[]
    by: GastoScalarFieldEnum[] | GastoScalarFieldEnum
    having?: GastoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GastoCountAggregateInputType | true
    _avg?: GastoAvgAggregateInputType
    _sum?: GastoSumAggregateInputType
    _min?: GastoMinAggregateInputType
    _max?: GastoMaxAggregateInputType
  }

  export type GastoGroupByOutputType = {
    id: number
    mesId: number
    fecha: Date
    monto: Decimal
    concepto: string
    categoryId: number
    createdAt: Date
    _count: GastoCountAggregateOutputType | null
    _avg: GastoAvgAggregateOutputType | null
    _sum: GastoSumAggregateOutputType | null
    _min: GastoMinAggregateOutputType | null
    _max: GastoMaxAggregateOutputType | null
  }

  type GetGastoGroupByPayload<T extends GastoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GastoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GastoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GastoGroupByOutputType[P]>
            : GetScalarType<T[P], GastoGroupByOutputType[P]>
        }
      >
    >


  export type GastoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gasto"]>

  export type GastoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gasto"]>

  export type GastoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gasto"]>

  export type GastoSelectScalar = {
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
  }

  export type GastoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mesId" | "fecha" | "monto" | "concepto" | "categoryId" | "createdAt", ExtArgs["result"]["gasto"]>
  export type GastoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type GastoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type GastoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $GastoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Gasto"
    objects: {
      mes: Prisma.$MesPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mesId: number
      fecha: Date
      monto: Prisma.Decimal
      concepto: string
      categoryId: number
      createdAt: Date
    }, ExtArgs["result"]["gasto"]>
    composites: {}
  }

  type GastoGetPayload<S extends boolean | null | undefined | GastoDefaultArgs> = $Result.GetResult<Prisma.$GastoPayload, S>

  type GastoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GastoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GastoCountAggregateInputType | true
    }

  export interface GastoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Gasto'], meta: { name: 'Gasto' } }
    /**
     * Find zero or one Gasto that matches the filter.
     * @param {GastoFindUniqueArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GastoFindUniqueArgs>(args: SelectSubset<T, GastoFindUniqueArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gasto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GastoFindUniqueOrThrowArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GastoFindUniqueOrThrowArgs>(args: SelectSubset<T, GastoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gasto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoFindFirstArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GastoFindFirstArgs>(args?: SelectSubset<T, GastoFindFirstArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gasto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoFindFirstOrThrowArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GastoFindFirstOrThrowArgs>(args?: SelectSubset<T, GastoFindFirstOrThrowArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gastos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gastos
     * const gastos = await prisma.gasto.findMany()
     * 
     * // Get first 10 Gastos
     * const gastos = await prisma.gasto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gastoWithIdOnly = await prisma.gasto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GastoFindManyArgs>(args?: SelectSubset<T, GastoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gasto.
     * @param {GastoCreateArgs} args - Arguments to create a Gasto.
     * @example
     * // Create one Gasto
     * const Gasto = await prisma.gasto.create({
     *   data: {
     *     // ... data to create a Gasto
     *   }
     * })
     * 
     */
    create<T extends GastoCreateArgs>(args: SelectSubset<T, GastoCreateArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gastos.
     * @param {GastoCreateManyArgs} args - Arguments to create many Gastos.
     * @example
     * // Create many Gastos
     * const gasto = await prisma.gasto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GastoCreateManyArgs>(args?: SelectSubset<T, GastoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gastos and returns the data saved in the database.
     * @param {GastoCreateManyAndReturnArgs} args - Arguments to create many Gastos.
     * @example
     * // Create many Gastos
     * const gasto = await prisma.gasto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gastos and only return the `id`
     * const gastoWithIdOnly = await prisma.gasto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GastoCreateManyAndReturnArgs>(args?: SelectSubset<T, GastoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Gasto.
     * @param {GastoDeleteArgs} args - Arguments to delete one Gasto.
     * @example
     * // Delete one Gasto
     * const Gasto = await prisma.gasto.delete({
     *   where: {
     *     // ... filter to delete one Gasto
     *   }
     * })
     * 
     */
    delete<T extends GastoDeleteArgs>(args: SelectSubset<T, GastoDeleteArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gasto.
     * @param {GastoUpdateArgs} args - Arguments to update one Gasto.
     * @example
     * // Update one Gasto
     * const gasto = await prisma.gasto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GastoUpdateArgs>(args: SelectSubset<T, GastoUpdateArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gastos.
     * @param {GastoDeleteManyArgs} args - Arguments to filter Gastos to delete.
     * @example
     * // Delete a few Gastos
     * const { count } = await prisma.gasto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GastoDeleteManyArgs>(args?: SelectSubset<T, GastoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gastos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gastos
     * const gasto = await prisma.gasto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GastoUpdateManyArgs>(args: SelectSubset<T, GastoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gastos and returns the data updated in the database.
     * @param {GastoUpdateManyAndReturnArgs} args - Arguments to update many Gastos.
     * @example
     * // Update many Gastos
     * const gasto = await prisma.gasto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gastos and only return the `id`
     * const gastoWithIdOnly = await prisma.gasto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GastoUpdateManyAndReturnArgs>(args: SelectSubset<T, GastoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Gasto.
     * @param {GastoUpsertArgs} args - Arguments to update or create a Gasto.
     * @example
     * // Update or create a Gasto
     * const gasto = await prisma.gasto.upsert({
     *   create: {
     *     // ... data to create a Gasto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gasto we want to update
     *   }
     * })
     */
    upsert<T extends GastoUpsertArgs>(args: SelectSubset<T, GastoUpsertArgs<ExtArgs>>): Prisma__GastoClient<$Result.GetResult<Prisma.$GastoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gastos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoCountArgs} args - Arguments to filter Gastos to count.
     * @example
     * // Count the number of Gastos
     * const count = await prisma.gasto.count({
     *   where: {
     *     // ... the filter for the Gastos we want to count
     *   }
     * })
    **/
    count<T extends GastoCountArgs>(
      args?: Subset<T, GastoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GastoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gasto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GastoAggregateArgs>(args: Subset<T, GastoAggregateArgs>): Prisma.PrismaPromise<GetGastoAggregateType<T>>

    /**
     * Group by Gasto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GastoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GastoGroupByArgs['orderBy'] }
        : { orderBy?: GastoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GastoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGastoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Gasto model
   */
  readonly fields: GastoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Gasto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GastoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mes<T extends MesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MesDefaultArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Gasto model
   */
  interface GastoFieldRefs {
    readonly id: FieldRef<"Gasto", 'Int'>
    readonly mesId: FieldRef<"Gasto", 'Int'>
    readonly fecha: FieldRef<"Gasto", 'DateTime'>
    readonly monto: FieldRef<"Gasto", 'Decimal'>
    readonly concepto: FieldRef<"Gasto", 'String'>
    readonly categoryId: FieldRef<"Gasto", 'Int'>
    readonly createdAt: FieldRef<"Gasto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Gasto findUnique
   */
  export type GastoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * Filter, which Gasto to fetch.
     */
    where: GastoWhereUniqueInput
  }

  /**
   * Gasto findUniqueOrThrow
   */
  export type GastoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * Filter, which Gasto to fetch.
     */
    where: GastoWhereUniqueInput
  }

  /**
   * Gasto findFirst
   */
  export type GastoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * Filter, which Gasto to fetch.
     */
    where?: GastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gastos to fetch.
     */
    orderBy?: GastoOrderByWithRelationInput | GastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gastos.
     */
    cursor?: GastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gastos.
     */
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * Gasto findFirstOrThrow
   */
  export type GastoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * Filter, which Gasto to fetch.
     */
    where?: GastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gastos to fetch.
     */
    orderBy?: GastoOrderByWithRelationInput | GastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gastos.
     */
    cursor?: GastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gastos.
     */
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * Gasto findMany
   */
  export type GastoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * Filter, which Gastos to fetch.
     */
    where?: GastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gastos to fetch.
     */
    orderBy?: GastoOrderByWithRelationInput | GastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gastos.
     */
    cursor?: GastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gastos.
     */
    skip?: number
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * Gasto create
   */
  export type GastoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * The data needed to create a Gasto.
     */
    data: XOR<GastoCreateInput, GastoUncheckedCreateInput>
  }

  /**
   * Gasto createMany
   */
  export type GastoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gastos.
     */
    data: GastoCreateManyInput | GastoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Gasto createManyAndReturn
   */
  export type GastoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * The data used to create many Gastos.
     */
    data: GastoCreateManyInput | GastoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Gasto update
   */
  export type GastoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * The data needed to update a Gasto.
     */
    data: XOR<GastoUpdateInput, GastoUncheckedUpdateInput>
    /**
     * Choose, which Gasto to update.
     */
    where: GastoWhereUniqueInput
  }

  /**
   * Gasto updateMany
   */
  export type GastoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gastos.
     */
    data: XOR<GastoUpdateManyMutationInput, GastoUncheckedUpdateManyInput>
    /**
     * Filter which Gastos to update
     */
    where?: GastoWhereInput
    /**
     * Limit how many Gastos to update.
     */
    limit?: number
  }

  /**
   * Gasto updateManyAndReturn
   */
  export type GastoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * The data used to update Gastos.
     */
    data: XOR<GastoUpdateManyMutationInput, GastoUncheckedUpdateManyInput>
    /**
     * Filter which Gastos to update
     */
    where?: GastoWhereInput
    /**
     * Limit how many Gastos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Gasto upsert
   */
  export type GastoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * The filter to search for the Gasto to update in case it exists.
     */
    where: GastoWhereUniqueInput
    /**
     * In case the Gasto found by the `where` argument doesn't exist, create a new Gasto with this data.
     */
    create: XOR<GastoCreateInput, GastoUncheckedCreateInput>
    /**
     * In case the Gasto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GastoUpdateInput, GastoUncheckedUpdateInput>
  }

  /**
   * Gasto delete
   */
  export type GastoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
    /**
     * Filter which Gasto to delete.
     */
    where: GastoWhereUniqueInput
  }

  /**
   * Gasto deleteMany
   */
  export type GastoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gastos to delete
     */
    where?: GastoWhereInput
    /**
     * Limit how many Gastos to delete.
     */
    limit?: number
  }

  /**
   * Gasto without action
   */
  export type GastoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gasto
     */
    select?: GastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gasto
     */
    omit?: GastoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GastoInclude<ExtArgs> | null
  }


  /**
   * Model Pago
   */

  export type AggregatePago = {
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  export type PagoAvgAggregateOutputType = {
    id: number | null
    mesId: number | null
    monto: Decimal | null
    categoryId: number | null
  }

  export type PagoSumAggregateOutputType = {
    id: number | null
    mesId: number | null
    monto: Decimal | null
    categoryId: number | null
  }

  export type PagoMinAggregateOutputType = {
    id: number | null
    mesId: number | null
    fecha: Date | null
    monto: Decimal | null
    concepto: string | null
    categoryId: number | null
    createdAt: Date | null
  }

  export type PagoMaxAggregateOutputType = {
    id: number | null
    mesId: number | null
    fecha: Date | null
    monto: Decimal | null
    concepto: string | null
    categoryId: number | null
    createdAt: Date | null
  }

  export type PagoCountAggregateOutputType = {
    id: number
    mesId: number
    fecha: number
    monto: number
    concepto: number
    categoryId: number
    createdAt: number
    _all: number
  }


  export type PagoAvgAggregateInputType = {
    id?: true
    mesId?: true
    monto?: true
    categoryId?: true
  }

  export type PagoSumAggregateInputType = {
    id?: true
    mesId?: true
    monto?: true
    categoryId?: true
  }

  export type PagoMinAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
  }

  export type PagoMaxAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
  }

  export type PagoCountAggregateInputType = {
    id?: true
    mesId?: true
    fecha?: true
    monto?: true
    concepto?: true
    categoryId?: true
    createdAt?: true
    _all?: true
  }

  export type PagoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pago to aggregate.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pagos
    **/
    _count?: true | PagoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagoMaxAggregateInputType
  }

  export type GetPagoAggregateType<T extends PagoAggregateArgs> = {
        [P in keyof T & keyof AggregatePago]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePago[P]>
      : GetScalarType<T[P], AggregatePago[P]>
  }




  export type PagoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithAggregationInput | PagoOrderByWithAggregationInput[]
    by: PagoScalarFieldEnum[] | PagoScalarFieldEnum
    having?: PagoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagoCountAggregateInputType | true
    _avg?: PagoAvgAggregateInputType
    _sum?: PagoSumAggregateInputType
    _min?: PagoMinAggregateInputType
    _max?: PagoMaxAggregateInputType
  }

  export type PagoGroupByOutputType = {
    id: number
    mesId: number
    fecha: Date
    monto: Decimal
    concepto: string
    categoryId: number
    createdAt: Date
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  type GetPagoGroupByPayload<T extends PagoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagoGroupByOutputType[P]>
            : GetScalarType<T[P], PagoGroupByOutputType[P]>
        }
      >
    >


  export type PagoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectScalar = {
    id?: boolean
    mesId?: boolean
    fecha?: boolean
    monto?: boolean
    concepto?: boolean
    categoryId?: boolean
    createdAt?: boolean
  }

  export type PagoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mesId" | "fecha" | "monto" | "concepto" | "categoryId" | "createdAt", ExtArgs["result"]["pago"]>
  export type PagoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type PagoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type PagoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mes?: boolean | MesDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $PagoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pago"
    objects: {
      mes: Prisma.$MesPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mesId: number
      fecha: Date
      monto: Prisma.Decimal
      concepto: string
      categoryId: number
      createdAt: Date
    }, ExtArgs["result"]["pago"]>
    composites: {}
  }

  type PagoGetPayload<S extends boolean | null | undefined | PagoDefaultArgs> = $Result.GetResult<Prisma.$PagoPayload, S>

  type PagoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PagoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagoCountAggregateInputType | true
    }

  export interface PagoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pago'], meta: { name: 'Pago' } }
    /**
     * Find zero or one Pago that matches the filter.
     * @param {PagoFindUniqueArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagoFindUniqueArgs>(args: SelectSubset<T, PagoFindUniqueArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pago that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PagoFindUniqueOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagoFindUniqueOrThrowArgs>(args: SelectSubset<T, PagoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagoFindFirstArgs>(args?: SelectSubset<T, PagoFindFirstArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagoFindFirstOrThrowArgs>(args?: SelectSubset<T, PagoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagos
     * const pagos = await prisma.pago.findMany()
     * 
     * // Get first 10 Pagos
     * const pagos = await prisma.pago.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagoWithIdOnly = await prisma.pago.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PagoFindManyArgs>(args?: SelectSubset<T, PagoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pago.
     * @param {PagoCreateArgs} args - Arguments to create a Pago.
     * @example
     * // Create one Pago
     * const Pago = await prisma.pago.create({
     *   data: {
     *     // ... data to create a Pago
     *   }
     * })
     * 
     */
    create<T extends PagoCreateArgs>(args: SelectSubset<T, PagoCreateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagos.
     * @param {PagoCreateManyArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagoCreateManyArgs>(args?: SelectSubset<T, PagoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pagos and returns the data saved in the database.
     * @param {PagoCreateManyAndReturnArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pagos and only return the `id`
     * const pagoWithIdOnly = await prisma.pago.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PagoCreateManyAndReturnArgs>(args?: SelectSubset<T, PagoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pago.
     * @param {PagoDeleteArgs} args - Arguments to delete one Pago.
     * @example
     * // Delete one Pago
     * const Pago = await prisma.pago.delete({
     *   where: {
     *     // ... filter to delete one Pago
     *   }
     * })
     * 
     */
    delete<T extends PagoDeleteArgs>(args: SelectSubset<T, PagoDeleteArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pago.
     * @param {PagoUpdateArgs} args - Arguments to update one Pago.
     * @example
     * // Update one Pago
     * const pago = await prisma.pago.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagoUpdateArgs>(args: SelectSubset<T, PagoUpdateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagos.
     * @param {PagoDeleteManyArgs} args - Arguments to filter Pagos to delete.
     * @example
     * // Delete a few Pagos
     * const { count } = await prisma.pago.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagoDeleteManyArgs>(args?: SelectSubset<T, PagoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagoUpdateManyArgs>(args: SelectSubset<T, PagoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos and returns the data updated in the database.
     * @param {PagoUpdateManyAndReturnArgs} args - Arguments to update many Pagos.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pagos and only return the `id`
     * const pagoWithIdOnly = await prisma.pago.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PagoUpdateManyAndReturnArgs>(args: SelectSubset<T, PagoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pago.
     * @param {PagoUpsertArgs} args - Arguments to update or create a Pago.
     * @example
     * // Update or create a Pago
     * const pago = await prisma.pago.upsert({
     *   create: {
     *     // ... data to create a Pago
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pago we want to update
     *   }
     * })
     */
    upsert<T extends PagoUpsertArgs>(args: SelectSubset<T, PagoUpsertArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoCountArgs} args - Arguments to filter Pagos to count.
     * @example
     * // Count the number of Pagos
     * const count = await prisma.pago.count({
     *   where: {
     *     // ... the filter for the Pagos we want to count
     *   }
     * })
    **/
    count<T extends PagoCountArgs>(
      args?: Subset<T, PagoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagoAggregateArgs>(args: Subset<T, PagoAggregateArgs>): Prisma.PrismaPromise<GetPagoAggregateType<T>>

    /**
     * Group by Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PagoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagoGroupByArgs['orderBy'] }
        : { orderBy?: PagoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PagoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pago model
   */
  readonly fields: PagoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pago.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mes<T extends MesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MesDefaultArgs<ExtArgs>>): Prisma__MesClient<$Result.GetResult<Prisma.$MesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pago model
   */
  interface PagoFieldRefs {
    readonly id: FieldRef<"Pago", 'Int'>
    readonly mesId: FieldRef<"Pago", 'Int'>
    readonly fecha: FieldRef<"Pago", 'DateTime'>
    readonly monto: FieldRef<"Pago", 'Decimal'>
    readonly concepto: FieldRef<"Pago", 'String'>
    readonly categoryId: FieldRef<"Pago", 'Int'>
    readonly createdAt: FieldRef<"Pago", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pago findUnique
   */
  export type PagoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findUniqueOrThrow
   */
  export type PagoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findFirst
   */
  export type PagoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findFirstOrThrow
   */
  export type PagoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findMany
   */
  export type PagoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pagos to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago create
   */
  export type PagoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pago.
     */
    data: XOR<PagoCreateInput, PagoUncheckedCreateInput>
  }

  /**
   * Pago createMany
   */
  export type PagoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pago createManyAndReturn
   */
  export type PagoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pago update
   */
  export type PagoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pago.
     */
    data: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
    /**
     * Choose, which Pago to update.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago updateMany
   */
  export type PagoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to update.
     */
    limit?: number
  }

  /**
   * Pago updateManyAndReturn
   */
  export type PagoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pago upsert
   */
  export type PagoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pago to update in case it exists.
     */
    where: PagoWhereUniqueInput
    /**
     * In case the Pago found by the `where` argument doesn't exist, create a new Pago with this data.
     */
    create: XOR<PagoCreateInput, PagoUncheckedCreateInput>
    /**
     * In case the Pago was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
  }

  /**
   * Pago delete
   */
  export type PagoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter which Pago to delete.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago deleteMany
   */
  export type PagoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pagos to delete
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to delete.
     */
    limit?: number
  }

  /**
   * Pago without action
   */
  export type PagoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MesScalarFieldEnum: {
    id: 'id',
    año: 'año',
    mes: 'mes',
    fechaInicio: 'fechaInicio',
    fechaFin: 'fechaFin',
    totalIngresos: 'totalIngresos',
    totalGastos: 'totalGastos',
    totalPagos: 'totalPagos',
    saldoFinal: 'saldoFinal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MesScalarFieldEnum = (typeof MesScalarFieldEnum)[keyof typeof MesScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const IngresoScalarFieldEnum: {
    id: 'id',
    mesId: 'mesId',
    fecha: 'fecha',
    monto: 'monto',
    concepto: 'concepto',
    categoryId: 'categoryId',
    createdAt: 'createdAt'
  };

  export type IngresoScalarFieldEnum = (typeof IngresoScalarFieldEnum)[keyof typeof IngresoScalarFieldEnum]


  export const GastoScalarFieldEnum: {
    id: 'id',
    mesId: 'mesId',
    fecha: 'fecha',
    monto: 'monto',
    concepto: 'concepto',
    categoryId: 'categoryId',
    createdAt: 'createdAt'
  };

  export type GastoScalarFieldEnum = (typeof GastoScalarFieldEnum)[keyof typeof GastoScalarFieldEnum]


  export const PagoScalarFieldEnum: {
    id: 'id',
    mesId: 'mesId',
    fecha: 'fecha',
    monto: 'monto',
    concepto: 'concepto',
    categoryId: 'categoryId',
    createdAt: 'createdAt'
  };

  export type PagoScalarFieldEnum = (typeof PagoScalarFieldEnum)[keyof typeof PagoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MesWhereInput = {
    AND?: MesWhereInput | MesWhereInput[]
    OR?: MesWhereInput[]
    NOT?: MesWhereInput | MesWhereInput[]
    id?: IntFilter<"Mes"> | number
    año?: IntFilter<"Mes"> | number
    mes?: IntFilter<"Mes"> | number
    fechaInicio?: DateTimeFilter<"Mes"> | Date | string
    fechaFin?: DateTimeFilter<"Mes"> | Date | string
    totalIngresos?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Mes"> | Date | string
    updatedAt?: DateTimeFilter<"Mes"> | Date | string
    ingresos?: IngresoListRelationFilter
    gastos?: GastoListRelationFilter
    pagos?: PagoListRelationFilter
  }

  export type MesOrderByWithRelationInput = {
    id?: SortOrder
    año?: SortOrder
    mes?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    totalIngresos?: SortOrder
    totalGastos?: SortOrder
    totalPagos?: SortOrder
    saldoFinal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ingresos?: IngresoOrderByRelationAggregateInput
    gastos?: GastoOrderByRelationAggregateInput
    pagos?: PagoOrderByRelationAggregateInput
  }

  export type MesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    año_mes?: MesAñoMesCompoundUniqueInput
    AND?: MesWhereInput | MesWhereInput[]
    OR?: MesWhereInput[]
    NOT?: MesWhereInput | MesWhereInput[]
    año?: IntFilter<"Mes"> | number
    mes?: IntFilter<"Mes"> | number
    fechaInicio?: DateTimeFilter<"Mes"> | Date | string
    fechaFin?: DateTimeFilter<"Mes"> | Date | string
    totalIngresos?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Mes"> | Date | string
    updatedAt?: DateTimeFilter<"Mes"> | Date | string
    ingresos?: IngresoListRelationFilter
    gastos?: GastoListRelationFilter
    pagos?: PagoListRelationFilter
  }, "id" | "año_mes">

  export type MesOrderByWithAggregationInput = {
    id?: SortOrder
    año?: SortOrder
    mes?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    totalIngresos?: SortOrder
    totalGastos?: SortOrder
    totalPagos?: SortOrder
    saldoFinal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MesCountOrderByAggregateInput
    _avg?: MesAvgOrderByAggregateInput
    _max?: MesMaxOrderByAggregateInput
    _min?: MesMinOrderByAggregateInput
    _sum?: MesSumOrderByAggregateInput
  }

  export type MesScalarWhereWithAggregatesInput = {
    AND?: MesScalarWhereWithAggregatesInput | MesScalarWhereWithAggregatesInput[]
    OR?: MesScalarWhereWithAggregatesInput[]
    NOT?: MesScalarWhereWithAggregatesInput | MesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mes"> | number
    año?: IntWithAggregatesFilter<"Mes"> | number
    mes?: IntWithAggregatesFilter<"Mes"> | number
    fechaInicio?: DateTimeWithAggregatesFilter<"Mes"> | Date | string
    fechaFin?: DateTimeWithAggregatesFilter<"Mes"> | Date | string
    totalIngresos?: DecimalWithAggregatesFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalWithAggregatesFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalWithAggregatesFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalWithAggregatesFilter<"Mes"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Mes"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mes"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    nombre?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    ingresos?: IngresoListRelationFilter
    gastos?: GastoListRelationFilter
    pagos?: PagoListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ingresos?: IngresoOrderByRelationAggregateInput
    gastos?: GastoOrderByRelationAggregateInput
    pagos?: PagoOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    ingresos?: IngresoListRelationFilter
    gastos?: GastoListRelationFilter
    pagos?: PagoListRelationFilter
  }, "id" | "nombre">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    nombre?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type IngresoWhereInput = {
    AND?: IngresoWhereInput | IngresoWhereInput[]
    OR?: IngresoWhereInput[]
    NOT?: IngresoWhereInput | IngresoWhereInput[]
    id?: IntFilter<"Ingreso"> | number
    mesId?: IntFilter<"Ingreso"> | number
    fecha?: DateTimeFilter<"Ingreso"> | Date | string
    monto?: DecimalFilter<"Ingreso"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Ingreso"> | string
    categoryId?: IntFilter<"Ingreso"> | number
    createdAt?: DateTimeFilter<"Ingreso"> | Date | string
    mes?: XOR<MesScalarRelationFilter, MesWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type IngresoOrderByWithRelationInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    mes?: MesOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type IngresoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: IngresoWhereInput | IngresoWhereInput[]
    OR?: IngresoWhereInput[]
    NOT?: IngresoWhereInput | IngresoWhereInput[]
    mesId?: IntFilter<"Ingreso"> | number
    fecha?: DateTimeFilter<"Ingreso"> | Date | string
    monto?: DecimalFilter<"Ingreso"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Ingreso"> | string
    categoryId?: IntFilter<"Ingreso"> | number
    createdAt?: DateTimeFilter<"Ingreso"> | Date | string
    mes?: XOR<MesScalarRelationFilter, MesWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id">

  export type IngresoOrderByWithAggregationInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    _count?: IngresoCountOrderByAggregateInput
    _avg?: IngresoAvgOrderByAggregateInput
    _max?: IngresoMaxOrderByAggregateInput
    _min?: IngresoMinOrderByAggregateInput
    _sum?: IngresoSumOrderByAggregateInput
  }

  export type IngresoScalarWhereWithAggregatesInput = {
    AND?: IngresoScalarWhereWithAggregatesInput | IngresoScalarWhereWithAggregatesInput[]
    OR?: IngresoScalarWhereWithAggregatesInput[]
    NOT?: IngresoScalarWhereWithAggregatesInput | IngresoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ingreso"> | number
    mesId?: IntWithAggregatesFilter<"Ingreso"> | number
    fecha?: DateTimeWithAggregatesFilter<"Ingreso"> | Date | string
    monto?: DecimalWithAggregatesFilter<"Ingreso"> | Decimal | DecimalJsLike | number | string
    concepto?: StringWithAggregatesFilter<"Ingreso"> | string
    categoryId?: IntWithAggregatesFilter<"Ingreso"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Ingreso"> | Date | string
  }

  export type GastoWhereInput = {
    AND?: GastoWhereInput | GastoWhereInput[]
    OR?: GastoWhereInput[]
    NOT?: GastoWhereInput | GastoWhereInput[]
    id?: IntFilter<"Gasto"> | number
    mesId?: IntFilter<"Gasto"> | number
    fecha?: DateTimeFilter<"Gasto"> | Date | string
    monto?: DecimalFilter<"Gasto"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Gasto"> | string
    categoryId?: IntFilter<"Gasto"> | number
    createdAt?: DateTimeFilter<"Gasto"> | Date | string
    mes?: XOR<MesScalarRelationFilter, MesWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type GastoOrderByWithRelationInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    mes?: MesOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type GastoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GastoWhereInput | GastoWhereInput[]
    OR?: GastoWhereInput[]
    NOT?: GastoWhereInput | GastoWhereInput[]
    mesId?: IntFilter<"Gasto"> | number
    fecha?: DateTimeFilter<"Gasto"> | Date | string
    monto?: DecimalFilter<"Gasto"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Gasto"> | string
    categoryId?: IntFilter<"Gasto"> | number
    createdAt?: DateTimeFilter<"Gasto"> | Date | string
    mes?: XOR<MesScalarRelationFilter, MesWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id">

  export type GastoOrderByWithAggregationInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    _count?: GastoCountOrderByAggregateInput
    _avg?: GastoAvgOrderByAggregateInput
    _max?: GastoMaxOrderByAggregateInput
    _min?: GastoMinOrderByAggregateInput
    _sum?: GastoSumOrderByAggregateInput
  }

  export type GastoScalarWhereWithAggregatesInput = {
    AND?: GastoScalarWhereWithAggregatesInput | GastoScalarWhereWithAggregatesInput[]
    OR?: GastoScalarWhereWithAggregatesInput[]
    NOT?: GastoScalarWhereWithAggregatesInput | GastoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Gasto"> | number
    mesId?: IntWithAggregatesFilter<"Gasto"> | number
    fecha?: DateTimeWithAggregatesFilter<"Gasto"> | Date | string
    monto?: DecimalWithAggregatesFilter<"Gasto"> | Decimal | DecimalJsLike | number | string
    concepto?: StringWithAggregatesFilter<"Gasto"> | string
    categoryId?: IntWithAggregatesFilter<"Gasto"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Gasto"> | Date | string
  }

  export type PagoWhereInput = {
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    id?: IntFilter<"Pago"> | number
    mesId?: IntFilter<"Pago"> | number
    fecha?: DateTimeFilter<"Pago"> | Date | string
    monto?: DecimalFilter<"Pago"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Pago"> | string
    categoryId?: IntFilter<"Pago"> | number
    createdAt?: DateTimeFilter<"Pago"> | Date | string
    mes?: XOR<MesScalarRelationFilter, MesWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type PagoOrderByWithRelationInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    mes?: MesOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type PagoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    mesId?: IntFilter<"Pago"> | number
    fecha?: DateTimeFilter<"Pago"> | Date | string
    monto?: DecimalFilter<"Pago"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Pago"> | string
    categoryId?: IntFilter<"Pago"> | number
    createdAt?: DateTimeFilter<"Pago"> | Date | string
    mes?: XOR<MesScalarRelationFilter, MesWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id">

  export type PagoOrderByWithAggregationInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    _count?: PagoCountOrderByAggregateInput
    _avg?: PagoAvgOrderByAggregateInput
    _max?: PagoMaxOrderByAggregateInput
    _min?: PagoMinOrderByAggregateInput
    _sum?: PagoSumOrderByAggregateInput
  }

  export type PagoScalarWhereWithAggregatesInput = {
    AND?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    OR?: PagoScalarWhereWithAggregatesInput[]
    NOT?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pago"> | number
    mesId?: IntWithAggregatesFilter<"Pago"> | number
    fecha?: DateTimeWithAggregatesFilter<"Pago"> | Date | string
    monto?: DecimalWithAggregatesFilter<"Pago"> | Decimal | DecimalJsLike | number | string
    concepto?: StringWithAggregatesFilter<"Pago"> | string
    categoryId?: IntWithAggregatesFilter<"Pago"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Pago"> | Date | string
  }

  export type MesCreateInput = {
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoCreateNestedManyWithoutMesInput
    gastos?: GastoCreateNestedManyWithoutMesInput
    pagos?: PagoCreateNestedManyWithoutMesInput
  }

  export type MesUncheckedCreateInput = {
    id?: number
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoUncheckedCreateNestedManyWithoutMesInput
    gastos?: GastoUncheckedCreateNestedManyWithoutMesInput
    pagos?: PagoUncheckedCreateNestedManyWithoutMesInput
  }

  export type MesUpdateInput = {
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUpdateManyWithoutMesNestedInput
    gastos?: GastoUpdateManyWithoutMesNestedInput
    pagos?: PagoUpdateManyWithoutMesNestedInput
  }

  export type MesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUncheckedUpdateManyWithoutMesNestedInput
    gastos?: GastoUncheckedUpdateManyWithoutMesNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutMesNestedInput
  }

  export type MesCreateManyInput = {
    id?: number
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MesUpdateManyMutationInput = {
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoCreateNestedManyWithoutCategoryInput
    gastos?: GastoCreateNestedManyWithoutCategoryInput
    pagos?: PagoCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoUncheckedCreateNestedManyWithoutCategoryInput
    gastos?: GastoUncheckedCreateNestedManyWithoutCategoryInput
    pagos?: PagoUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUpdateManyWithoutCategoryNestedInput
    gastos?: GastoUpdateManyWithoutCategoryNestedInput
    pagos?: PagoUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUncheckedUpdateManyWithoutCategoryNestedInput
    gastos?: GastoUncheckedUpdateManyWithoutCategoryNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngresoCreateInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    mes: MesCreateNestedOneWithoutIngresosInput
    category: CategoryCreateNestedOneWithoutIngresosInput
  }

  export type IngresoUncheckedCreateInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type IngresoUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mes?: MesUpdateOneRequiredWithoutIngresosNestedInput
    category?: CategoryUpdateOneRequiredWithoutIngresosNestedInput
  }

  export type IngresoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngresoCreateManyInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type IngresoUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngresoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GastoCreateInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    mes: MesCreateNestedOneWithoutGastosInput
    category: CategoryCreateNestedOneWithoutGastosInput
  }

  export type GastoUncheckedCreateInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type GastoUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mes?: MesUpdateOneRequiredWithoutGastosNestedInput
    category?: CategoryUpdateOneRequiredWithoutGastosNestedInput
  }

  export type GastoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GastoCreateManyInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type GastoUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GastoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoCreateInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    mes: MesCreateNestedOneWithoutPagosInput
    category: CategoryCreateNestedOneWithoutPagosInput
  }

  export type PagoUncheckedCreateInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type PagoUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mes?: MesUpdateOneRequiredWithoutPagosNestedInput
    category?: CategoryUpdateOneRequiredWithoutPagosNestedInput
  }

  export type PagoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoCreateManyInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type PagoUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IngresoListRelationFilter = {
    every?: IngresoWhereInput
    some?: IngresoWhereInput
    none?: IngresoWhereInput
  }

  export type GastoListRelationFilter = {
    every?: GastoWhereInput
    some?: GastoWhereInput
    none?: GastoWhereInput
  }

  export type PagoListRelationFilter = {
    every?: PagoWhereInput
    some?: PagoWhereInput
    none?: PagoWhereInput
  }

  export type IngresoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GastoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PagoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MesAñoMesCompoundUniqueInput = {
    año: number
    mes: number
  }

  export type MesCountOrderByAggregateInput = {
    id?: SortOrder
    año?: SortOrder
    mes?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    totalIngresos?: SortOrder
    totalGastos?: SortOrder
    totalPagos?: SortOrder
    saldoFinal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MesAvgOrderByAggregateInput = {
    id?: SortOrder
    año?: SortOrder
    mes?: SortOrder
    totalIngresos?: SortOrder
    totalGastos?: SortOrder
    totalPagos?: SortOrder
    saldoFinal?: SortOrder
  }

  export type MesMaxOrderByAggregateInput = {
    id?: SortOrder
    año?: SortOrder
    mes?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    totalIngresos?: SortOrder
    totalGastos?: SortOrder
    totalPagos?: SortOrder
    saldoFinal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MesMinOrderByAggregateInput = {
    id?: SortOrder
    año?: SortOrder
    mes?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    totalIngresos?: SortOrder
    totalGastos?: SortOrder
    totalPagos?: SortOrder
    saldoFinal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MesSumOrderByAggregateInput = {
    id?: SortOrder
    año?: SortOrder
    mes?: SortOrder
    totalIngresos?: SortOrder
    totalGastos?: SortOrder
    totalPagos?: SortOrder
    saldoFinal?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type MesScalarRelationFilter = {
    is?: MesWhereInput
    isNot?: MesWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type IngresoCountOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type IngresoAvgOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    monto?: SortOrder
    categoryId?: SortOrder
  }

  export type IngresoMaxOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type IngresoMinOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type IngresoSumOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    monto?: SortOrder
    categoryId?: SortOrder
  }

  export type GastoCountOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type GastoAvgOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    monto?: SortOrder
    categoryId?: SortOrder
  }

  export type GastoMaxOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type GastoMinOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type GastoSumOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    monto?: SortOrder
    categoryId?: SortOrder
  }

  export type PagoCountOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoAvgOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    monto?: SortOrder
    categoryId?: SortOrder
  }

  export type PagoMaxOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoMinOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    fecha?: SortOrder
    monto?: SortOrder
    concepto?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoSumOrderByAggregateInput = {
    id?: SortOrder
    mesId?: SortOrder
    monto?: SortOrder
    categoryId?: SortOrder
  }

  export type IngresoCreateNestedManyWithoutMesInput = {
    create?: XOR<IngresoCreateWithoutMesInput, IngresoUncheckedCreateWithoutMesInput> | IngresoCreateWithoutMesInput[] | IngresoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutMesInput | IngresoCreateOrConnectWithoutMesInput[]
    createMany?: IngresoCreateManyMesInputEnvelope
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
  }

  export type GastoCreateNestedManyWithoutMesInput = {
    create?: XOR<GastoCreateWithoutMesInput, GastoUncheckedCreateWithoutMesInput> | GastoCreateWithoutMesInput[] | GastoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutMesInput | GastoCreateOrConnectWithoutMesInput[]
    createMany?: GastoCreateManyMesInputEnvelope
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
  }

  export type PagoCreateNestedManyWithoutMesInput = {
    create?: XOR<PagoCreateWithoutMesInput, PagoUncheckedCreateWithoutMesInput> | PagoCreateWithoutMesInput[] | PagoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutMesInput | PagoCreateOrConnectWithoutMesInput[]
    createMany?: PagoCreateManyMesInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type IngresoUncheckedCreateNestedManyWithoutMesInput = {
    create?: XOR<IngresoCreateWithoutMesInput, IngresoUncheckedCreateWithoutMesInput> | IngresoCreateWithoutMesInput[] | IngresoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutMesInput | IngresoCreateOrConnectWithoutMesInput[]
    createMany?: IngresoCreateManyMesInputEnvelope
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
  }

  export type GastoUncheckedCreateNestedManyWithoutMesInput = {
    create?: XOR<GastoCreateWithoutMesInput, GastoUncheckedCreateWithoutMesInput> | GastoCreateWithoutMesInput[] | GastoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutMesInput | GastoCreateOrConnectWithoutMesInput[]
    createMany?: GastoCreateManyMesInputEnvelope
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
  }

  export type PagoUncheckedCreateNestedManyWithoutMesInput = {
    create?: XOR<PagoCreateWithoutMesInput, PagoUncheckedCreateWithoutMesInput> | PagoCreateWithoutMesInput[] | PagoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutMesInput | PagoCreateOrConnectWithoutMesInput[]
    createMany?: PagoCreateManyMesInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IngresoUpdateManyWithoutMesNestedInput = {
    create?: XOR<IngresoCreateWithoutMesInput, IngresoUncheckedCreateWithoutMesInput> | IngresoCreateWithoutMesInput[] | IngresoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutMesInput | IngresoCreateOrConnectWithoutMesInput[]
    upsert?: IngresoUpsertWithWhereUniqueWithoutMesInput | IngresoUpsertWithWhereUniqueWithoutMesInput[]
    createMany?: IngresoCreateManyMesInputEnvelope
    set?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    disconnect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    delete?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    update?: IngresoUpdateWithWhereUniqueWithoutMesInput | IngresoUpdateWithWhereUniqueWithoutMesInput[]
    updateMany?: IngresoUpdateManyWithWhereWithoutMesInput | IngresoUpdateManyWithWhereWithoutMesInput[]
    deleteMany?: IngresoScalarWhereInput | IngresoScalarWhereInput[]
  }

  export type GastoUpdateManyWithoutMesNestedInput = {
    create?: XOR<GastoCreateWithoutMesInput, GastoUncheckedCreateWithoutMesInput> | GastoCreateWithoutMesInput[] | GastoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutMesInput | GastoCreateOrConnectWithoutMesInput[]
    upsert?: GastoUpsertWithWhereUniqueWithoutMesInput | GastoUpsertWithWhereUniqueWithoutMesInput[]
    createMany?: GastoCreateManyMesInputEnvelope
    set?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    disconnect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    delete?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    update?: GastoUpdateWithWhereUniqueWithoutMesInput | GastoUpdateWithWhereUniqueWithoutMesInput[]
    updateMany?: GastoUpdateManyWithWhereWithoutMesInput | GastoUpdateManyWithWhereWithoutMesInput[]
    deleteMany?: GastoScalarWhereInput | GastoScalarWhereInput[]
  }

  export type PagoUpdateManyWithoutMesNestedInput = {
    create?: XOR<PagoCreateWithoutMesInput, PagoUncheckedCreateWithoutMesInput> | PagoCreateWithoutMesInput[] | PagoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutMesInput | PagoCreateOrConnectWithoutMesInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutMesInput | PagoUpsertWithWhereUniqueWithoutMesInput[]
    createMany?: PagoCreateManyMesInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutMesInput | PagoUpdateWithWhereUniqueWithoutMesInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutMesInput | PagoUpdateManyWithWhereWithoutMesInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type IngresoUncheckedUpdateManyWithoutMesNestedInput = {
    create?: XOR<IngresoCreateWithoutMesInput, IngresoUncheckedCreateWithoutMesInput> | IngresoCreateWithoutMesInput[] | IngresoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutMesInput | IngresoCreateOrConnectWithoutMesInput[]
    upsert?: IngresoUpsertWithWhereUniqueWithoutMesInput | IngresoUpsertWithWhereUniqueWithoutMesInput[]
    createMany?: IngresoCreateManyMesInputEnvelope
    set?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    disconnect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    delete?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    update?: IngresoUpdateWithWhereUniqueWithoutMesInput | IngresoUpdateWithWhereUniqueWithoutMesInput[]
    updateMany?: IngresoUpdateManyWithWhereWithoutMesInput | IngresoUpdateManyWithWhereWithoutMesInput[]
    deleteMany?: IngresoScalarWhereInput | IngresoScalarWhereInput[]
  }

  export type GastoUncheckedUpdateManyWithoutMesNestedInput = {
    create?: XOR<GastoCreateWithoutMesInput, GastoUncheckedCreateWithoutMesInput> | GastoCreateWithoutMesInput[] | GastoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutMesInput | GastoCreateOrConnectWithoutMesInput[]
    upsert?: GastoUpsertWithWhereUniqueWithoutMesInput | GastoUpsertWithWhereUniqueWithoutMesInput[]
    createMany?: GastoCreateManyMesInputEnvelope
    set?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    disconnect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    delete?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    update?: GastoUpdateWithWhereUniqueWithoutMesInput | GastoUpdateWithWhereUniqueWithoutMesInput[]
    updateMany?: GastoUpdateManyWithWhereWithoutMesInput | GastoUpdateManyWithWhereWithoutMesInput[]
    deleteMany?: GastoScalarWhereInput | GastoScalarWhereInput[]
  }

  export type PagoUncheckedUpdateManyWithoutMesNestedInput = {
    create?: XOR<PagoCreateWithoutMesInput, PagoUncheckedCreateWithoutMesInput> | PagoCreateWithoutMesInput[] | PagoUncheckedCreateWithoutMesInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutMesInput | PagoCreateOrConnectWithoutMesInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutMesInput | PagoUpsertWithWhereUniqueWithoutMesInput[]
    createMany?: PagoCreateManyMesInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutMesInput | PagoUpdateWithWhereUniqueWithoutMesInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutMesInput | PagoUpdateManyWithWhereWithoutMesInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type IngresoCreateNestedManyWithoutCategoryInput = {
    create?: XOR<IngresoCreateWithoutCategoryInput, IngresoUncheckedCreateWithoutCategoryInput> | IngresoCreateWithoutCategoryInput[] | IngresoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutCategoryInput | IngresoCreateOrConnectWithoutCategoryInput[]
    createMany?: IngresoCreateManyCategoryInputEnvelope
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
  }

  export type GastoCreateNestedManyWithoutCategoryInput = {
    create?: XOR<GastoCreateWithoutCategoryInput, GastoUncheckedCreateWithoutCategoryInput> | GastoCreateWithoutCategoryInput[] | GastoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutCategoryInput | GastoCreateOrConnectWithoutCategoryInput[]
    createMany?: GastoCreateManyCategoryInputEnvelope
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
  }

  export type PagoCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PagoCreateWithoutCategoryInput, PagoUncheckedCreateWithoutCategoryInput> | PagoCreateWithoutCategoryInput[] | PagoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutCategoryInput | PagoCreateOrConnectWithoutCategoryInput[]
    createMany?: PagoCreateManyCategoryInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type IngresoUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<IngresoCreateWithoutCategoryInput, IngresoUncheckedCreateWithoutCategoryInput> | IngresoCreateWithoutCategoryInput[] | IngresoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutCategoryInput | IngresoCreateOrConnectWithoutCategoryInput[]
    createMany?: IngresoCreateManyCategoryInputEnvelope
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
  }

  export type GastoUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<GastoCreateWithoutCategoryInput, GastoUncheckedCreateWithoutCategoryInput> | GastoCreateWithoutCategoryInput[] | GastoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutCategoryInput | GastoCreateOrConnectWithoutCategoryInput[]
    createMany?: GastoCreateManyCategoryInputEnvelope
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
  }

  export type PagoUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PagoCreateWithoutCategoryInput, PagoUncheckedCreateWithoutCategoryInput> | PagoCreateWithoutCategoryInput[] | PagoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutCategoryInput | PagoCreateOrConnectWithoutCategoryInput[]
    createMany?: PagoCreateManyCategoryInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IngresoUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<IngresoCreateWithoutCategoryInput, IngresoUncheckedCreateWithoutCategoryInput> | IngresoCreateWithoutCategoryInput[] | IngresoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutCategoryInput | IngresoCreateOrConnectWithoutCategoryInput[]
    upsert?: IngresoUpsertWithWhereUniqueWithoutCategoryInput | IngresoUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: IngresoCreateManyCategoryInputEnvelope
    set?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    disconnect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    delete?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    update?: IngresoUpdateWithWhereUniqueWithoutCategoryInput | IngresoUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: IngresoUpdateManyWithWhereWithoutCategoryInput | IngresoUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: IngresoScalarWhereInput | IngresoScalarWhereInput[]
  }

  export type GastoUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<GastoCreateWithoutCategoryInput, GastoUncheckedCreateWithoutCategoryInput> | GastoCreateWithoutCategoryInput[] | GastoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutCategoryInput | GastoCreateOrConnectWithoutCategoryInput[]
    upsert?: GastoUpsertWithWhereUniqueWithoutCategoryInput | GastoUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: GastoCreateManyCategoryInputEnvelope
    set?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    disconnect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    delete?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    update?: GastoUpdateWithWhereUniqueWithoutCategoryInput | GastoUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: GastoUpdateManyWithWhereWithoutCategoryInput | GastoUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: GastoScalarWhereInput | GastoScalarWhereInput[]
  }

  export type PagoUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PagoCreateWithoutCategoryInput, PagoUncheckedCreateWithoutCategoryInput> | PagoCreateWithoutCategoryInput[] | PagoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutCategoryInput | PagoCreateOrConnectWithoutCategoryInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutCategoryInput | PagoUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PagoCreateManyCategoryInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutCategoryInput | PagoUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutCategoryInput | PagoUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type IngresoUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<IngresoCreateWithoutCategoryInput, IngresoUncheckedCreateWithoutCategoryInput> | IngresoCreateWithoutCategoryInput[] | IngresoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: IngresoCreateOrConnectWithoutCategoryInput | IngresoCreateOrConnectWithoutCategoryInput[]
    upsert?: IngresoUpsertWithWhereUniqueWithoutCategoryInput | IngresoUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: IngresoCreateManyCategoryInputEnvelope
    set?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    disconnect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    delete?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    connect?: IngresoWhereUniqueInput | IngresoWhereUniqueInput[]
    update?: IngresoUpdateWithWhereUniqueWithoutCategoryInput | IngresoUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: IngresoUpdateManyWithWhereWithoutCategoryInput | IngresoUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: IngresoScalarWhereInput | IngresoScalarWhereInput[]
  }

  export type GastoUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<GastoCreateWithoutCategoryInput, GastoUncheckedCreateWithoutCategoryInput> | GastoCreateWithoutCategoryInput[] | GastoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: GastoCreateOrConnectWithoutCategoryInput | GastoCreateOrConnectWithoutCategoryInput[]
    upsert?: GastoUpsertWithWhereUniqueWithoutCategoryInput | GastoUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: GastoCreateManyCategoryInputEnvelope
    set?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    disconnect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    delete?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    connect?: GastoWhereUniqueInput | GastoWhereUniqueInput[]
    update?: GastoUpdateWithWhereUniqueWithoutCategoryInput | GastoUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: GastoUpdateManyWithWhereWithoutCategoryInput | GastoUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: GastoScalarWhereInput | GastoScalarWhereInput[]
  }

  export type PagoUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PagoCreateWithoutCategoryInput, PagoUncheckedCreateWithoutCategoryInput> | PagoCreateWithoutCategoryInput[] | PagoUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutCategoryInput | PagoCreateOrConnectWithoutCategoryInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutCategoryInput | PagoUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PagoCreateManyCategoryInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutCategoryInput | PagoUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutCategoryInput | PagoUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type MesCreateNestedOneWithoutIngresosInput = {
    create?: XOR<MesCreateWithoutIngresosInput, MesUncheckedCreateWithoutIngresosInput>
    connectOrCreate?: MesCreateOrConnectWithoutIngresosInput
    connect?: MesWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutIngresosInput = {
    create?: XOR<CategoryCreateWithoutIngresosInput, CategoryUncheckedCreateWithoutIngresosInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutIngresosInput
    connect?: CategoryWhereUniqueInput
  }

  export type MesUpdateOneRequiredWithoutIngresosNestedInput = {
    create?: XOR<MesCreateWithoutIngresosInput, MesUncheckedCreateWithoutIngresosInput>
    connectOrCreate?: MesCreateOrConnectWithoutIngresosInput
    upsert?: MesUpsertWithoutIngresosInput
    connect?: MesWhereUniqueInput
    update?: XOR<XOR<MesUpdateToOneWithWhereWithoutIngresosInput, MesUpdateWithoutIngresosInput>, MesUncheckedUpdateWithoutIngresosInput>
  }

  export type CategoryUpdateOneRequiredWithoutIngresosNestedInput = {
    create?: XOR<CategoryCreateWithoutIngresosInput, CategoryUncheckedCreateWithoutIngresosInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutIngresosInput
    upsert?: CategoryUpsertWithoutIngresosInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutIngresosInput, CategoryUpdateWithoutIngresosInput>, CategoryUncheckedUpdateWithoutIngresosInput>
  }

  export type MesCreateNestedOneWithoutGastosInput = {
    create?: XOR<MesCreateWithoutGastosInput, MesUncheckedCreateWithoutGastosInput>
    connectOrCreate?: MesCreateOrConnectWithoutGastosInput
    connect?: MesWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutGastosInput = {
    create?: XOR<CategoryCreateWithoutGastosInput, CategoryUncheckedCreateWithoutGastosInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutGastosInput
    connect?: CategoryWhereUniqueInput
  }

  export type MesUpdateOneRequiredWithoutGastosNestedInput = {
    create?: XOR<MesCreateWithoutGastosInput, MesUncheckedCreateWithoutGastosInput>
    connectOrCreate?: MesCreateOrConnectWithoutGastosInput
    upsert?: MesUpsertWithoutGastosInput
    connect?: MesWhereUniqueInput
    update?: XOR<XOR<MesUpdateToOneWithWhereWithoutGastosInput, MesUpdateWithoutGastosInput>, MesUncheckedUpdateWithoutGastosInput>
  }

  export type CategoryUpdateOneRequiredWithoutGastosNestedInput = {
    create?: XOR<CategoryCreateWithoutGastosInput, CategoryUncheckedCreateWithoutGastosInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutGastosInput
    upsert?: CategoryUpsertWithoutGastosInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutGastosInput, CategoryUpdateWithoutGastosInput>, CategoryUncheckedUpdateWithoutGastosInput>
  }

  export type MesCreateNestedOneWithoutPagosInput = {
    create?: XOR<MesCreateWithoutPagosInput, MesUncheckedCreateWithoutPagosInput>
    connectOrCreate?: MesCreateOrConnectWithoutPagosInput
    connect?: MesWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutPagosInput = {
    create?: XOR<CategoryCreateWithoutPagosInput, CategoryUncheckedCreateWithoutPagosInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPagosInput
    connect?: CategoryWhereUniqueInput
  }

  export type MesUpdateOneRequiredWithoutPagosNestedInput = {
    create?: XOR<MesCreateWithoutPagosInput, MesUncheckedCreateWithoutPagosInput>
    connectOrCreate?: MesCreateOrConnectWithoutPagosInput
    upsert?: MesUpsertWithoutPagosInput
    connect?: MesWhereUniqueInput
    update?: XOR<XOR<MesUpdateToOneWithWhereWithoutPagosInput, MesUpdateWithoutPagosInput>, MesUncheckedUpdateWithoutPagosInput>
  }

  export type CategoryUpdateOneRequiredWithoutPagosNestedInput = {
    create?: XOR<CategoryCreateWithoutPagosInput, CategoryUncheckedCreateWithoutPagosInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPagosInput
    upsert?: CategoryUpsertWithoutPagosInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutPagosInput, CategoryUpdateWithoutPagosInput>, CategoryUncheckedUpdateWithoutPagosInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IngresoCreateWithoutMesInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutIngresosInput
  }

  export type IngresoUncheckedCreateWithoutMesInput = {
    id?: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type IngresoCreateOrConnectWithoutMesInput = {
    where: IngresoWhereUniqueInput
    create: XOR<IngresoCreateWithoutMesInput, IngresoUncheckedCreateWithoutMesInput>
  }

  export type IngresoCreateManyMesInputEnvelope = {
    data: IngresoCreateManyMesInput | IngresoCreateManyMesInput[]
    skipDuplicates?: boolean
  }

  export type GastoCreateWithoutMesInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutGastosInput
  }

  export type GastoUncheckedCreateWithoutMesInput = {
    id?: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type GastoCreateOrConnectWithoutMesInput = {
    where: GastoWhereUniqueInput
    create: XOR<GastoCreateWithoutMesInput, GastoUncheckedCreateWithoutMesInput>
  }

  export type GastoCreateManyMesInputEnvelope = {
    data: GastoCreateManyMesInput | GastoCreateManyMesInput[]
    skipDuplicates?: boolean
  }

  export type PagoCreateWithoutMesInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutPagosInput
  }

  export type PagoUncheckedCreateWithoutMesInput = {
    id?: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type PagoCreateOrConnectWithoutMesInput = {
    where: PagoWhereUniqueInput
    create: XOR<PagoCreateWithoutMesInput, PagoUncheckedCreateWithoutMesInput>
  }

  export type PagoCreateManyMesInputEnvelope = {
    data: PagoCreateManyMesInput | PagoCreateManyMesInput[]
    skipDuplicates?: boolean
  }

  export type IngresoUpsertWithWhereUniqueWithoutMesInput = {
    where: IngresoWhereUniqueInput
    update: XOR<IngresoUpdateWithoutMesInput, IngresoUncheckedUpdateWithoutMesInput>
    create: XOR<IngresoCreateWithoutMesInput, IngresoUncheckedCreateWithoutMesInput>
  }

  export type IngresoUpdateWithWhereUniqueWithoutMesInput = {
    where: IngresoWhereUniqueInput
    data: XOR<IngresoUpdateWithoutMesInput, IngresoUncheckedUpdateWithoutMesInput>
  }

  export type IngresoUpdateManyWithWhereWithoutMesInput = {
    where: IngresoScalarWhereInput
    data: XOR<IngresoUpdateManyMutationInput, IngresoUncheckedUpdateManyWithoutMesInput>
  }

  export type IngresoScalarWhereInput = {
    AND?: IngresoScalarWhereInput | IngresoScalarWhereInput[]
    OR?: IngresoScalarWhereInput[]
    NOT?: IngresoScalarWhereInput | IngresoScalarWhereInput[]
    id?: IntFilter<"Ingreso"> | number
    mesId?: IntFilter<"Ingreso"> | number
    fecha?: DateTimeFilter<"Ingreso"> | Date | string
    monto?: DecimalFilter<"Ingreso"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Ingreso"> | string
    categoryId?: IntFilter<"Ingreso"> | number
    createdAt?: DateTimeFilter<"Ingreso"> | Date | string
  }

  export type GastoUpsertWithWhereUniqueWithoutMesInput = {
    where: GastoWhereUniqueInput
    update: XOR<GastoUpdateWithoutMesInput, GastoUncheckedUpdateWithoutMesInput>
    create: XOR<GastoCreateWithoutMesInput, GastoUncheckedCreateWithoutMesInput>
  }

  export type GastoUpdateWithWhereUniqueWithoutMesInput = {
    where: GastoWhereUniqueInput
    data: XOR<GastoUpdateWithoutMesInput, GastoUncheckedUpdateWithoutMesInput>
  }

  export type GastoUpdateManyWithWhereWithoutMesInput = {
    where: GastoScalarWhereInput
    data: XOR<GastoUpdateManyMutationInput, GastoUncheckedUpdateManyWithoutMesInput>
  }

  export type GastoScalarWhereInput = {
    AND?: GastoScalarWhereInput | GastoScalarWhereInput[]
    OR?: GastoScalarWhereInput[]
    NOT?: GastoScalarWhereInput | GastoScalarWhereInput[]
    id?: IntFilter<"Gasto"> | number
    mesId?: IntFilter<"Gasto"> | number
    fecha?: DateTimeFilter<"Gasto"> | Date | string
    monto?: DecimalFilter<"Gasto"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Gasto"> | string
    categoryId?: IntFilter<"Gasto"> | number
    createdAt?: DateTimeFilter<"Gasto"> | Date | string
  }

  export type PagoUpsertWithWhereUniqueWithoutMesInput = {
    where: PagoWhereUniqueInput
    update: XOR<PagoUpdateWithoutMesInput, PagoUncheckedUpdateWithoutMesInput>
    create: XOR<PagoCreateWithoutMesInput, PagoUncheckedCreateWithoutMesInput>
  }

  export type PagoUpdateWithWhereUniqueWithoutMesInput = {
    where: PagoWhereUniqueInput
    data: XOR<PagoUpdateWithoutMesInput, PagoUncheckedUpdateWithoutMesInput>
  }

  export type PagoUpdateManyWithWhereWithoutMesInput = {
    where: PagoScalarWhereInput
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyWithoutMesInput>
  }

  export type PagoScalarWhereInput = {
    AND?: PagoScalarWhereInput | PagoScalarWhereInput[]
    OR?: PagoScalarWhereInput[]
    NOT?: PagoScalarWhereInput | PagoScalarWhereInput[]
    id?: IntFilter<"Pago"> | number
    mesId?: IntFilter<"Pago"> | number
    fecha?: DateTimeFilter<"Pago"> | Date | string
    monto?: DecimalFilter<"Pago"> | Decimal | DecimalJsLike | number | string
    concepto?: StringFilter<"Pago"> | string
    categoryId?: IntFilter<"Pago"> | number
    createdAt?: DateTimeFilter<"Pago"> | Date | string
  }

  export type IngresoCreateWithoutCategoryInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    mes: MesCreateNestedOneWithoutIngresosInput
  }

  export type IngresoUncheckedCreateWithoutCategoryInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
  }

  export type IngresoCreateOrConnectWithoutCategoryInput = {
    where: IngresoWhereUniqueInput
    create: XOR<IngresoCreateWithoutCategoryInput, IngresoUncheckedCreateWithoutCategoryInput>
  }

  export type IngresoCreateManyCategoryInputEnvelope = {
    data: IngresoCreateManyCategoryInput | IngresoCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type GastoCreateWithoutCategoryInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    mes: MesCreateNestedOneWithoutGastosInput
  }

  export type GastoUncheckedCreateWithoutCategoryInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
  }

  export type GastoCreateOrConnectWithoutCategoryInput = {
    where: GastoWhereUniqueInput
    create: XOR<GastoCreateWithoutCategoryInput, GastoUncheckedCreateWithoutCategoryInput>
  }

  export type GastoCreateManyCategoryInputEnvelope = {
    data: GastoCreateManyCategoryInput | GastoCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type PagoCreateWithoutCategoryInput = {
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
    mes: MesCreateNestedOneWithoutPagosInput
  }

  export type PagoUncheckedCreateWithoutCategoryInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
  }

  export type PagoCreateOrConnectWithoutCategoryInput = {
    where: PagoWhereUniqueInput
    create: XOR<PagoCreateWithoutCategoryInput, PagoUncheckedCreateWithoutCategoryInput>
  }

  export type PagoCreateManyCategoryInputEnvelope = {
    data: PagoCreateManyCategoryInput | PagoCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type IngresoUpsertWithWhereUniqueWithoutCategoryInput = {
    where: IngresoWhereUniqueInput
    update: XOR<IngresoUpdateWithoutCategoryInput, IngresoUncheckedUpdateWithoutCategoryInput>
    create: XOR<IngresoCreateWithoutCategoryInput, IngresoUncheckedCreateWithoutCategoryInput>
  }

  export type IngresoUpdateWithWhereUniqueWithoutCategoryInput = {
    where: IngresoWhereUniqueInput
    data: XOR<IngresoUpdateWithoutCategoryInput, IngresoUncheckedUpdateWithoutCategoryInput>
  }

  export type IngresoUpdateManyWithWhereWithoutCategoryInput = {
    where: IngresoScalarWhereInput
    data: XOR<IngresoUpdateManyMutationInput, IngresoUncheckedUpdateManyWithoutCategoryInput>
  }

  export type GastoUpsertWithWhereUniqueWithoutCategoryInput = {
    where: GastoWhereUniqueInput
    update: XOR<GastoUpdateWithoutCategoryInput, GastoUncheckedUpdateWithoutCategoryInput>
    create: XOR<GastoCreateWithoutCategoryInput, GastoUncheckedCreateWithoutCategoryInput>
  }

  export type GastoUpdateWithWhereUniqueWithoutCategoryInput = {
    where: GastoWhereUniqueInput
    data: XOR<GastoUpdateWithoutCategoryInput, GastoUncheckedUpdateWithoutCategoryInput>
  }

  export type GastoUpdateManyWithWhereWithoutCategoryInput = {
    where: GastoScalarWhereInput
    data: XOR<GastoUpdateManyMutationInput, GastoUncheckedUpdateManyWithoutCategoryInput>
  }

  export type PagoUpsertWithWhereUniqueWithoutCategoryInput = {
    where: PagoWhereUniqueInput
    update: XOR<PagoUpdateWithoutCategoryInput, PagoUncheckedUpdateWithoutCategoryInput>
    create: XOR<PagoCreateWithoutCategoryInput, PagoUncheckedCreateWithoutCategoryInput>
  }

  export type PagoUpdateWithWhereUniqueWithoutCategoryInput = {
    where: PagoWhereUniqueInput
    data: XOR<PagoUpdateWithoutCategoryInput, PagoUncheckedUpdateWithoutCategoryInput>
  }

  export type PagoUpdateManyWithWhereWithoutCategoryInput = {
    where: PagoScalarWhereInput
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyWithoutCategoryInput>
  }

  export type MesCreateWithoutIngresosInput = {
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    gastos?: GastoCreateNestedManyWithoutMesInput
    pagos?: PagoCreateNestedManyWithoutMesInput
  }

  export type MesUncheckedCreateWithoutIngresosInput = {
    id?: number
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    gastos?: GastoUncheckedCreateNestedManyWithoutMesInput
    pagos?: PagoUncheckedCreateNestedManyWithoutMesInput
  }

  export type MesCreateOrConnectWithoutIngresosInput = {
    where: MesWhereUniqueInput
    create: XOR<MesCreateWithoutIngresosInput, MesUncheckedCreateWithoutIngresosInput>
  }

  export type CategoryCreateWithoutIngresosInput = {
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    gastos?: GastoCreateNestedManyWithoutCategoryInput
    pagos?: PagoCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutIngresosInput = {
    id?: number
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    gastos?: GastoUncheckedCreateNestedManyWithoutCategoryInput
    pagos?: PagoUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutIngresosInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutIngresosInput, CategoryUncheckedCreateWithoutIngresosInput>
  }

  export type MesUpsertWithoutIngresosInput = {
    update: XOR<MesUpdateWithoutIngresosInput, MesUncheckedUpdateWithoutIngresosInput>
    create: XOR<MesCreateWithoutIngresosInput, MesUncheckedCreateWithoutIngresosInput>
    where?: MesWhereInput
  }

  export type MesUpdateToOneWithWhereWithoutIngresosInput = {
    where?: MesWhereInput
    data: XOR<MesUpdateWithoutIngresosInput, MesUncheckedUpdateWithoutIngresosInput>
  }

  export type MesUpdateWithoutIngresosInput = {
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gastos?: GastoUpdateManyWithoutMesNestedInput
    pagos?: PagoUpdateManyWithoutMesNestedInput
  }

  export type MesUncheckedUpdateWithoutIngresosInput = {
    id?: IntFieldUpdateOperationsInput | number
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gastos?: GastoUncheckedUpdateManyWithoutMesNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutMesNestedInput
  }

  export type CategoryUpsertWithoutIngresosInput = {
    update: XOR<CategoryUpdateWithoutIngresosInput, CategoryUncheckedUpdateWithoutIngresosInput>
    create: XOR<CategoryCreateWithoutIngresosInput, CategoryUncheckedCreateWithoutIngresosInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutIngresosInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutIngresosInput, CategoryUncheckedUpdateWithoutIngresosInput>
  }

  export type CategoryUpdateWithoutIngresosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gastos?: GastoUpdateManyWithoutCategoryNestedInput
    pagos?: PagoUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutIngresosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gastos?: GastoUncheckedUpdateManyWithoutCategoryNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type MesCreateWithoutGastosInput = {
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoCreateNestedManyWithoutMesInput
    pagos?: PagoCreateNestedManyWithoutMesInput
  }

  export type MesUncheckedCreateWithoutGastosInput = {
    id?: number
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoUncheckedCreateNestedManyWithoutMesInput
    pagos?: PagoUncheckedCreateNestedManyWithoutMesInput
  }

  export type MesCreateOrConnectWithoutGastosInput = {
    where: MesWhereUniqueInput
    create: XOR<MesCreateWithoutGastosInput, MesUncheckedCreateWithoutGastosInput>
  }

  export type CategoryCreateWithoutGastosInput = {
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoCreateNestedManyWithoutCategoryInput
    pagos?: PagoCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutGastosInput = {
    id?: number
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoUncheckedCreateNestedManyWithoutCategoryInput
    pagos?: PagoUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutGastosInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutGastosInput, CategoryUncheckedCreateWithoutGastosInput>
  }

  export type MesUpsertWithoutGastosInput = {
    update: XOR<MesUpdateWithoutGastosInput, MesUncheckedUpdateWithoutGastosInput>
    create: XOR<MesCreateWithoutGastosInput, MesUncheckedCreateWithoutGastosInput>
    where?: MesWhereInput
  }

  export type MesUpdateToOneWithWhereWithoutGastosInput = {
    where?: MesWhereInput
    data: XOR<MesUpdateWithoutGastosInput, MesUncheckedUpdateWithoutGastosInput>
  }

  export type MesUpdateWithoutGastosInput = {
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUpdateManyWithoutMesNestedInput
    pagos?: PagoUpdateManyWithoutMesNestedInput
  }

  export type MesUncheckedUpdateWithoutGastosInput = {
    id?: IntFieldUpdateOperationsInput | number
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUncheckedUpdateManyWithoutMesNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutMesNestedInput
  }

  export type CategoryUpsertWithoutGastosInput = {
    update: XOR<CategoryUpdateWithoutGastosInput, CategoryUncheckedUpdateWithoutGastosInput>
    create: XOR<CategoryCreateWithoutGastosInput, CategoryUncheckedCreateWithoutGastosInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutGastosInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutGastosInput, CategoryUncheckedUpdateWithoutGastosInput>
  }

  export type CategoryUpdateWithoutGastosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUpdateManyWithoutCategoryNestedInput
    pagos?: PagoUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutGastosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUncheckedUpdateManyWithoutCategoryNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type MesCreateWithoutPagosInput = {
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoCreateNestedManyWithoutMesInput
    gastos?: GastoCreateNestedManyWithoutMesInput
  }

  export type MesUncheckedCreateWithoutPagosInput = {
    id?: number
    año: number
    mes: number
    fechaInicio: Date | string
    fechaFin: Date | string
    totalIngresos?: Decimal | DecimalJsLike | number | string
    totalGastos?: Decimal | DecimalJsLike | number | string
    totalPagos?: Decimal | DecimalJsLike | number | string
    saldoFinal?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoUncheckedCreateNestedManyWithoutMesInput
    gastos?: GastoUncheckedCreateNestedManyWithoutMesInput
  }

  export type MesCreateOrConnectWithoutPagosInput = {
    where: MesWhereUniqueInput
    create: XOR<MesCreateWithoutPagosInput, MesUncheckedCreateWithoutPagosInput>
  }

  export type CategoryCreateWithoutPagosInput = {
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoCreateNestedManyWithoutCategoryInput
    gastos?: GastoCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutPagosInput = {
    id?: number
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ingresos?: IngresoUncheckedCreateNestedManyWithoutCategoryInput
    gastos?: GastoUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutPagosInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutPagosInput, CategoryUncheckedCreateWithoutPagosInput>
  }

  export type MesUpsertWithoutPagosInput = {
    update: XOR<MesUpdateWithoutPagosInput, MesUncheckedUpdateWithoutPagosInput>
    create: XOR<MesCreateWithoutPagosInput, MesUncheckedCreateWithoutPagosInput>
    where?: MesWhereInput
  }

  export type MesUpdateToOneWithWhereWithoutPagosInput = {
    where?: MesWhereInput
    data: XOR<MesUpdateWithoutPagosInput, MesUncheckedUpdateWithoutPagosInput>
  }

  export type MesUpdateWithoutPagosInput = {
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUpdateManyWithoutMesNestedInput
    gastos?: GastoUpdateManyWithoutMesNestedInput
  }

  export type MesUncheckedUpdateWithoutPagosInput = {
    id?: IntFieldUpdateOperationsInput | number
    año?: IntFieldUpdateOperationsInput | number
    mes?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIngresos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalGastos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPagos?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saldoFinal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUncheckedUpdateManyWithoutMesNestedInput
    gastos?: GastoUncheckedUpdateManyWithoutMesNestedInput
  }

  export type CategoryUpsertWithoutPagosInput = {
    update: XOR<CategoryUpdateWithoutPagosInput, CategoryUncheckedUpdateWithoutPagosInput>
    create: XOR<CategoryCreateWithoutPagosInput, CategoryUncheckedCreateWithoutPagosInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutPagosInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutPagosInput, CategoryUncheckedUpdateWithoutPagosInput>
  }

  export type CategoryUpdateWithoutPagosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUpdateManyWithoutCategoryNestedInput
    gastos?: GastoUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutPagosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingresos?: IngresoUncheckedUpdateManyWithoutCategoryNestedInput
    gastos?: GastoUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type IngresoCreateManyMesInput = {
    id?: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type GastoCreateManyMesInput = {
    id?: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type PagoCreateManyMesInput = {
    id?: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    categoryId: number
    createdAt?: Date | string
  }

  export type IngresoUpdateWithoutMesInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutIngresosNestedInput
  }

  export type IngresoUncheckedUpdateWithoutMesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngresoUncheckedUpdateManyWithoutMesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GastoUpdateWithoutMesInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutGastosNestedInput
  }

  export type GastoUncheckedUpdateWithoutMesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GastoUncheckedUpdateManyWithoutMesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUpdateWithoutMesInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutPagosNestedInput
  }

  export type PagoUncheckedUpdateWithoutMesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateManyWithoutMesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngresoCreateManyCategoryInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
  }

  export type GastoCreateManyCategoryInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
  }

  export type PagoCreateManyCategoryInput = {
    id?: number
    mesId: number
    fecha: Date | string
    monto: Decimal | DecimalJsLike | number | string
    concepto: string
    createdAt?: Date | string
  }

  export type IngresoUpdateWithoutCategoryInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mes?: MesUpdateOneRequiredWithoutIngresosNestedInput
  }

  export type IngresoUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngresoUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GastoUpdateWithoutCategoryInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mes?: MesUpdateOneRequiredWithoutGastosNestedInput
  }

  export type GastoUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GastoUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUpdateWithoutCategoryInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mes?: MesUpdateOneRequiredWithoutPagosNestedInput
  }

  export type PagoUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mesId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    concepto?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}