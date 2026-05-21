
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Recurrence
 * 
 */
export type Recurrence = $Result.DefaultSelection<Prisma.$RecurrencePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TransactionType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  TRANSFER: 'TRANSFER',
  INVESTMENT: 'INVESTMENT',
  RETURN: 'RETURN',
  PAYMENT: 'PAYMENT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const AccountType: {
  BANK: 'BANK',
  WALLET: 'WALLET',
  CASH: 'CASH',
  CARD: 'CARD',
  INVESTMENT: 'INVESTMENT'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]


export const Currency: {
  ARS: 'ARS',
  USD: 'USD',
  USDT: 'USDT'
};

export type Currency = (typeof Currency)[keyof typeof Currency]


export const RecurrenceType: {
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY',
  YEARLY: 'YEARLY'
};

export type RecurrenceType = (typeof RecurrenceType)[keyof typeof RecurrenceType]


export const BudgetCategory: {
  DAILY_EXPENSES: 'DAILY_EXPENSES',
  FOOD_GROCERIES: 'FOOD_GROCERIES',
  ENTERTAINMENT: 'ENTERTAINMENT',
  TRANSPORTATION: 'TRANSPORTATION',
  HEALTH: 'HEALTH',
  UTILITIES: 'UTILITIES'
};

export type BudgetCategory = (typeof BudgetCategory)[keyof typeof BudgetCategory]


export const CardType: {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  AMEX: 'AMEX',
  MAESTRO: 'MAESTRO'
};

export type CardType = (typeof CardType)[keyof typeof CardType]

}

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type AccountType = $Enums.AccountType

export const AccountType: typeof $Enums.AccountType

export type Currency = $Enums.Currency

export const Currency: typeof $Enums.Currency

export type RecurrenceType = $Enums.RecurrenceType

export const RecurrenceType: typeof $Enums.RecurrenceType

export type BudgetCategory = $Enums.BudgetCategory

export const BudgetCategory: typeof $Enums.BudgetCategory

export type CardType = $Enums.CardType

export const CardType: typeof $Enums.CardType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.recurrence`: Exposes CRUD operations for the **Recurrence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recurrences
    * const recurrences = await prisma.recurrence.findMany()
    * ```
    */
  get recurrence(): Prisma.RecurrenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
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
    User: 'User',
    Account: 'Account',
    Category: 'Category',
    Recurrence: 'Recurrence',
    Transaction: 'Transaction'
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
      modelProps: "user" | "account" | "category" | "recurrence" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
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
      Recurrence: {
        payload: Prisma.$RecurrencePayload<ExtArgs>
        fields: Prisma.RecurrenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecurrenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecurrenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>
          }
          findFirst: {
            args: Prisma.RecurrenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecurrenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>
          }
          findMany: {
            args: Prisma.RecurrenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>[]
          }
          create: {
            args: Prisma.RecurrenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>
          }
          createMany: {
            args: Prisma.RecurrenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecurrenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>[]
          }
          delete: {
            args: Prisma.RecurrenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>
          }
          update: {
            args: Prisma.RecurrenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>
          }
          deleteMany: {
            args: Prisma.RecurrenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecurrenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecurrenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>[]
          }
          upsert: {
            args: Prisma.RecurrenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecurrencePayload>
          }
          aggregate: {
            args: Prisma.RecurrenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecurrence>
          }
          groupBy: {
            args: Prisma.RecurrenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecurrenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecurrenceCountArgs<ExtArgs>
            result: $Utils.Optional<RecurrenceCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
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
    user?: UserOmit
    account?: AccountOmit
    category?: CategoryOmit
    recurrence?: RecurrenceOmit
    transaction?: TransactionOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    categories: number
    recurrences: number
    transactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    categories?: boolean | UserCountOutputTypeCountCategoriesArgs
    recurrences?: boolean | UserCountOutputTypeCountRecurrencesArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecurrencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecurrenceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    transactionsFrom: number
    transactionsTo: number
    recurrencesFrom: number
    recurrencesTo: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactionsFrom?: boolean | AccountCountOutputTypeCountTransactionsFromArgs
    transactionsTo?: boolean | AccountCountOutputTypeCountTransactionsToArgs
    recurrencesFrom?: boolean | AccountCountOutputTypeCountRecurrencesFromArgs
    recurrencesTo?: boolean | AccountCountOutputTypeCountRecurrencesToArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTransactionsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTransactionsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountRecurrencesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecurrenceWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountRecurrencesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecurrenceWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    transactions: number
    recurrences: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | CategoryCountOutputTypeCountTransactionsArgs
    recurrences?: boolean | CategoryCountOutputTypeCountRecurrencesArgs
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
  export type CategoryCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountRecurrencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecurrenceWhereInput
  }


  /**
   * Count Type RecurrenceCountOutputType
   */

  export type RecurrenceCountOutputType = {
    transactions: number
  }

  export type RecurrenceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | RecurrenceCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * RecurrenceCountOutputType without action
   */
  export type RecurrenceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecurrenceCountOutputType
     */
    select?: RecurrenceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecurrenceCountOutputType without action
   */
  export type RecurrenceCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedByUserId: string | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedByUserId: string | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    deletedByUserId: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    deletedByUserId?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    deletedByUserId?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    deletedByUserId?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string | null
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    deletedByUserId: string | null
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    categories?: boolean | User$categoriesArgs<ExtArgs>
    recurrences?: boolean | User$recurrencesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "createdAt" | "updatedAt" | "deletedByUserId" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    categories?: boolean | User$categoriesArgs<ExtArgs>
    recurrences?: boolean | User$recurrencesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      recurrences: Prisma.$RecurrencePayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      passwordHash: string
      createdAt: Date
      updatedAt: Date
      deletedByUserId: string | null
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends User$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recurrences<T extends User$recurrencesArgs<ExtArgs> = {}>(args?: Subset<T, User$recurrencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedByUserId: FieldRef<"User", 'String'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.categories
   */
  export type User$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * User.recurrences
   */
  export type User$recurrencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    where?: RecurrenceWhereInput
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    cursor?: RecurrenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecurrenceScalarFieldEnum | RecurrenceScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    balance: Decimal | null
  }

  export type AccountSumAggregateOutputType = {
    balance: Decimal | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: $Enums.AccountType | null
    currency: $Enums.Currency | null
    balance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedByUserId: string | null
    deletedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: $Enums.AccountType | null
    currency: $Enums.Currency | null
    balance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedByUserId: string | null
    deletedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    type: number
    currency: number
    balance: number
    createdAt: number
    updatedAt: number
    deletedByUserId: number
    deletedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    balance?: true
  }

  export type AccountSumAggregateInputType = {
    balance?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    currency?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
    deletedByUserId?: true
    deletedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    currency?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
    deletedByUserId?: true
    deletedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    currency?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
    deletedByUserId?: true
    deletedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance: Decimal
    createdAt: Date
    updatedAt: Date
    deletedByUserId: string | null
    deletedAt: Date | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    currency?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactionsFrom?: boolean | Account$transactionsFromArgs<ExtArgs>
    transactionsTo?: boolean | Account$transactionsToArgs<ExtArgs>
    recurrencesFrom?: boolean | Account$recurrencesFromArgs<ExtArgs>
    recurrencesTo?: boolean | Account$recurrencesToArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    currency?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    currency?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    currency?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedByUserId?: boolean
    deletedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "type" | "currency" | "balance" | "createdAt" | "updatedAt" | "deletedByUserId" | "deletedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactionsFrom?: boolean | Account$transactionsFromArgs<ExtArgs>
    transactionsTo?: boolean | Account$transactionsToArgs<ExtArgs>
    recurrencesFrom?: boolean | Account$recurrencesFromArgs<ExtArgs>
    recurrencesTo?: boolean | Account$recurrencesToArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactionsFrom: Prisma.$TransactionPayload<ExtArgs>[]
      transactionsTo: Prisma.$TransactionPayload<ExtArgs>[]
      recurrencesFrom: Prisma.$RecurrencePayload<ExtArgs>[]
      recurrencesTo: Prisma.$RecurrencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      type: $Enums.AccountType
      currency: $Enums.Currency
      balance: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
      deletedByUserId: string | null
      deletedAt: Date | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactionsFrom<T extends Account$transactionsFromArgs<ExtArgs> = {}>(args?: Subset<T, Account$transactionsFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactionsTo<T extends Account$transactionsToArgs<ExtArgs> = {}>(args?: Subset<T, Account$transactionsToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recurrencesFrom<T extends Account$recurrencesFromArgs<ExtArgs> = {}>(args?: Subset<T, Account$recurrencesFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recurrencesTo<T extends Account$recurrencesToArgs<ExtArgs> = {}>(args?: Subset<T, Account$recurrencesToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly name: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'AccountType'>
    readonly currency: FieldRef<"Account", 'Currency'>
    readonly balance: FieldRef<"Account", 'Decimal'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
    readonly deletedByUserId: FieldRef<"Account", 'String'>
    readonly deletedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.transactionsFrom
   */
  export type Account$transactionsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Account.transactionsTo
   */
  export type Account$transactionsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Account.recurrencesFrom
   */
  export type Account$recurrencesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    where?: RecurrenceWhereInput
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    cursor?: RecurrenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecurrenceScalarFieldEnum | RecurrenceScalarFieldEnum[]
  }

  /**
   * Account.recurrencesTo
   */
  export type Account$recurrencesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    where?: RecurrenceWhereInput
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    cursor?: RecurrenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecurrenceScalarFieldEnum | RecurrenceScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    color: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    color?: true
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
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    userId: string
    name: string
    color: string | null
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
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
    userId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Category$transactionsArgs<ExtArgs>
    recurrences?: boolean | Category$recurrencesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "color" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Category$transactionsArgs<ExtArgs>
    recurrences?: boolean | Category$recurrencesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      recurrences: Prisma.$RecurrencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      color: string | null
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
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Category$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Category$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recurrences<T extends Category$recurrencesArgs<ExtArgs> = {}>(args?: Subset<T, Category$recurrencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"Category", 'String'>
    readonly userId: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
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
   * Category.transactions
   */
  export type Category$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Category.recurrences
   */
  export type Category$recurrencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    where?: RecurrenceWhereInput
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    cursor?: RecurrenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecurrenceScalarFieldEnum | RecurrenceScalarFieldEnum[]
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
   * Model Recurrence
   */

  export type AggregateRecurrence = {
    _count: RecurrenceCountAggregateOutputType | null
    _avg: RecurrenceAvgAggregateOutputType | null
    _sum: RecurrenceSumAggregateOutputType | null
    _min: RecurrenceMinAggregateOutputType | null
    _max: RecurrenceMaxAggregateOutputType | null
  }

  export type RecurrenceAvgAggregateOutputType = {
    amount: Decimal | null
    totalParts: number | null
    currentPart: number | null
  }

  export type RecurrenceSumAggregateOutputType = {
    amount: Decimal | null
    totalParts: number | null
    currentPart: number | null
  }

  export type RecurrenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    frequency: $Enums.RecurrenceType | null
    totalParts: number | null
    currentPart: number | null
    startDate: Date | null
    nextDate: Date | null
    endDate: Date | null
    active: boolean | null
    categoryId: string | null
    sourceAccountId: string | null
    targetAccountId: string | null
    isCardExpense: boolean | null
    cardType: $Enums.CardType | null
  }

  export type RecurrenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    frequency: $Enums.RecurrenceType | null
    totalParts: number | null
    currentPart: number | null
    startDate: Date | null
    nextDate: Date | null
    endDate: Date | null
    active: boolean | null
    categoryId: string | null
    sourceAccountId: string | null
    targetAccountId: string | null
    isCardExpense: boolean | null
    cardType: $Enums.CardType | null
  }

  export type RecurrenceCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    type: number
    amount: number
    frequency: number
    totalParts: number
    currentPart: number
    startDate: number
    nextDate: number
    endDate: number
    active: number
    categoryId: number
    sourceAccountId: number
    targetAccountId: number
    isCardExpense: number
    cardType: number
    metadata: number
    _all: number
  }


  export type RecurrenceAvgAggregateInputType = {
    amount?: true
    totalParts?: true
    currentPart?: true
  }

  export type RecurrenceSumAggregateInputType = {
    amount?: true
    totalParts?: true
    currentPart?: true
  }

  export type RecurrenceMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    amount?: true
    frequency?: true
    totalParts?: true
    currentPart?: true
    startDate?: true
    nextDate?: true
    endDate?: true
    active?: true
    categoryId?: true
    sourceAccountId?: true
    targetAccountId?: true
    isCardExpense?: true
    cardType?: true
  }

  export type RecurrenceMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    amount?: true
    frequency?: true
    totalParts?: true
    currentPart?: true
    startDate?: true
    nextDate?: true
    endDate?: true
    active?: true
    categoryId?: true
    sourceAccountId?: true
    targetAccountId?: true
    isCardExpense?: true
    cardType?: true
  }

  export type RecurrenceCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    amount?: true
    frequency?: true
    totalParts?: true
    currentPart?: true
    startDate?: true
    nextDate?: true
    endDate?: true
    active?: true
    categoryId?: true
    sourceAccountId?: true
    targetAccountId?: true
    isCardExpense?: true
    cardType?: true
    metadata?: true
    _all?: true
  }

  export type RecurrenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recurrence to aggregate.
     */
    where?: RecurrenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recurrences to fetch.
     */
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecurrenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recurrences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recurrences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recurrences
    **/
    _count?: true | RecurrenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecurrenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecurrenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecurrenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecurrenceMaxAggregateInputType
  }

  export type GetRecurrenceAggregateType<T extends RecurrenceAggregateArgs> = {
        [P in keyof T & keyof AggregateRecurrence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecurrence[P]>
      : GetScalarType<T[P], AggregateRecurrence[P]>
  }




  export type RecurrenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecurrenceWhereInput
    orderBy?: RecurrenceOrderByWithAggregationInput | RecurrenceOrderByWithAggregationInput[]
    by: RecurrenceScalarFieldEnum[] | RecurrenceScalarFieldEnum
    having?: RecurrenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecurrenceCountAggregateInputType | true
    _avg?: RecurrenceAvgAggregateInputType
    _sum?: RecurrenceSumAggregateInputType
    _min?: RecurrenceMinAggregateInputType
    _max?: RecurrenceMaxAggregateInputType
  }

  export type RecurrenceGroupByOutputType = {
    id: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal
    frequency: $Enums.RecurrenceType
    totalParts: number | null
    currentPart: number
    startDate: Date
    nextDate: Date | null
    endDate: Date | null
    active: boolean
    categoryId: string | null
    sourceAccountId: string | null
    targetAccountId: string | null
    isCardExpense: boolean
    cardType: $Enums.CardType | null
    metadata: JsonValue | null
    _count: RecurrenceCountAggregateOutputType | null
    _avg: RecurrenceAvgAggregateOutputType | null
    _sum: RecurrenceSumAggregateOutputType | null
    _min: RecurrenceMinAggregateOutputType | null
    _max: RecurrenceMaxAggregateOutputType | null
  }

  type GetRecurrenceGroupByPayload<T extends RecurrenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecurrenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecurrenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecurrenceGroupByOutputType[P]>
            : GetScalarType<T[P], RecurrenceGroupByOutputType[P]>
        }
      >
    >


  export type RecurrenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    frequency?: boolean
    totalParts?: boolean
    currentPart?: boolean
    startDate?: boolean
    nextDate?: boolean
    endDate?: boolean
    active?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    metadata?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Recurrence$categoryArgs<ExtArgs>
    sourceAccount?: boolean | Recurrence$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Recurrence$targetAccountArgs<ExtArgs>
    transactions?: boolean | Recurrence$transactionsArgs<ExtArgs>
    _count?: boolean | RecurrenceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recurrence"]>

  export type RecurrenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    frequency?: boolean
    totalParts?: boolean
    currentPart?: boolean
    startDate?: boolean
    nextDate?: boolean
    endDate?: boolean
    active?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    metadata?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Recurrence$categoryArgs<ExtArgs>
    sourceAccount?: boolean | Recurrence$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Recurrence$targetAccountArgs<ExtArgs>
  }, ExtArgs["result"]["recurrence"]>

  export type RecurrenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    frequency?: boolean
    totalParts?: boolean
    currentPart?: boolean
    startDate?: boolean
    nextDate?: boolean
    endDate?: boolean
    active?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    metadata?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Recurrence$categoryArgs<ExtArgs>
    sourceAccount?: boolean | Recurrence$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Recurrence$targetAccountArgs<ExtArgs>
  }, ExtArgs["result"]["recurrence"]>

  export type RecurrenceSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    frequency?: boolean
    totalParts?: boolean
    currentPart?: boolean
    startDate?: boolean
    nextDate?: boolean
    endDate?: boolean
    active?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    metadata?: boolean
  }

  export type RecurrenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "type" | "amount" | "frequency" | "totalParts" | "currentPart" | "startDate" | "nextDate" | "endDate" | "active" | "categoryId" | "sourceAccountId" | "targetAccountId" | "isCardExpense" | "cardType" | "metadata", ExtArgs["result"]["recurrence"]>
  export type RecurrenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Recurrence$categoryArgs<ExtArgs>
    sourceAccount?: boolean | Recurrence$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Recurrence$targetAccountArgs<ExtArgs>
    transactions?: boolean | Recurrence$transactionsArgs<ExtArgs>
    _count?: boolean | RecurrenceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecurrenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Recurrence$categoryArgs<ExtArgs>
    sourceAccount?: boolean | Recurrence$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Recurrence$targetAccountArgs<ExtArgs>
  }
  export type RecurrenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Recurrence$categoryArgs<ExtArgs>
    sourceAccount?: boolean | Recurrence$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Recurrence$targetAccountArgs<ExtArgs>
  }

  export type $RecurrencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recurrence"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs> | null
      sourceAccount: Prisma.$AccountPayload<ExtArgs> | null
      targetAccount: Prisma.$AccountPayload<ExtArgs> | null
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      frequency: $Enums.RecurrenceType
      totalParts: number | null
      currentPart: number
      startDate: Date
      nextDate: Date | null
      endDate: Date | null
      active: boolean
      categoryId: string | null
      sourceAccountId: string | null
      targetAccountId: string | null
      isCardExpense: boolean
      cardType: $Enums.CardType | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["recurrence"]>
    composites: {}
  }

  type RecurrenceGetPayload<S extends boolean | null | undefined | RecurrenceDefaultArgs> = $Result.GetResult<Prisma.$RecurrencePayload, S>

  type RecurrenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecurrenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecurrenceCountAggregateInputType | true
    }

  export interface RecurrenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recurrence'], meta: { name: 'Recurrence' } }
    /**
     * Find zero or one Recurrence that matches the filter.
     * @param {RecurrenceFindUniqueArgs} args - Arguments to find a Recurrence
     * @example
     * // Get one Recurrence
     * const recurrence = await prisma.recurrence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecurrenceFindUniqueArgs>(args: SelectSubset<T, RecurrenceFindUniqueArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recurrence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecurrenceFindUniqueOrThrowArgs} args - Arguments to find a Recurrence
     * @example
     * // Get one Recurrence
     * const recurrence = await prisma.recurrence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecurrenceFindUniqueOrThrowArgs>(args: SelectSubset<T, RecurrenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recurrence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurrenceFindFirstArgs} args - Arguments to find a Recurrence
     * @example
     * // Get one Recurrence
     * const recurrence = await prisma.recurrence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecurrenceFindFirstArgs>(args?: SelectSubset<T, RecurrenceFindFirstArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recurrence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurrenceFindFirstOrThrowArgs} args - Arguments to find a Recurrence
     * @example
     * // Get one Recurrence
     * const recurrence = await prisma.recurrence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecurrenceFindFirstOrThrowArgs>(args?: SelectSubset<T, RecurrenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recurrences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurrenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recurrences
     * const recurrences = await prisma.recurrence.findMany()
     * 
     * // Get first 10 Recurrences
     * const recurrences = await prisma.recurrence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recurrenceWithIdOnly = await prisma.recurrence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecurrenceFindManyArgs>(args?: SelectSubset<T, RecurrenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recurrence.
     * @param {RecurrenceCreateArgs} args - Arguments to create a Recurrence.
     * @example
     * // Create one Recurrence
     * const Recurrence = await prisma.recurrence.create({
     *   data: {
     *     // ... data to create a Recurrence
     *   }
     * })
     * 
     */
    create<T extends RecurrenceCreateArgs>(args: SelectSubset<T, RecurrenceCreateArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recurrences.
     * @param {RecurrenceCreateManyArgs} args - Arguments to create many Recurrences.
     * @example
     * // Create many Recurrences
     * const recurrence = await prisma.recurrence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecurrenceCreateManyArgs>(args?: SelectSubset<T, RecurrenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recurrences and returns the data saved in the database.
     * @param {RecurrenceCreateManyAndReturnArgs} args - Arguments to create many Recurrences.
     * @example
     * // Create many Recurrences
     * const recurrence = await prisma.recurrence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recurrences and only return the `id`
     * const recurrenceWithIdOnly = await prisma.recurrence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecurrenceCreateManyAndReturnArgs>(args?: SelectSubset<T, RecurrenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recurrence.
     * @param {RecurrenceDeleteArgs} args - Arguments to delete one Recurrence.
     * @example
     * // Delete one Recurrence
     * const Recurrence = await prisma.recurrence.delete({
     *   where: {
     *     // ... filter to delete one Recurrence
     *   }
     * })
     * 
     */
    delete<T extends RecurrenceDeleteArgs>(args: SelectSubset<T, RecurrenceDeleteArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recurrence.
     * @param {RecurrenceUpdateArgs} args - Arguments to update one Recurrence.
     * @example
     * // Update one Recurrence
     * const recurrence = await prisma.recurrence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecurrenceUpdateArgs>(args: SelectSubset<T, RecurrenceUpdateArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recurrences.
     * @param {RecurrenceDeleteManyArgs} args - Arguments to filter Recurrences to delete.
     * @example
     * // Delete a few Recurrences
     * const { count } = await prisma.recurrence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecurrenceDeleteManyArgs>(args?: SelectSubset<T, RecurrenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recurrences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurrenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recurrences
     * const recurrence = await prisma.recurrence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecurrenceUpdateManyArgs>(args: SelectSubset<T, RecurrenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recurrences and returns the data updated in the database.
     * @param {RecurrenceUpdateManyAndReturnArgs} args - Arguments to update many Recurrences.
     * @example
     * // Update many Recurrences
     * const recurrence = await prisma.recurrence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recurrences and only return the `id`
     * const recurrenceWithIdOnly = await prisma.recurrence.updateManyAndReturn({
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
    updateManyAndReturn<T extends RecurrenceUpdateManyAndReturnArgs>(args: SelectSubset<T, RecurrenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recurrence.
     * @param {RecurrenceUpsertArgs} args - Arguments to update or create a Recurrence.
     * @example
     * // Update or create a Recurrence
     * const recurrence = await prisma.recurrence.upsert({
     *   create: {
     *     // ... data to create a Recurrence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recurrence we want to update
     *   }
     * })
     */
    upsert<T extends RecurrenceUpsertArgs>(args: SelectSubset<T, RecurrenceUpsertArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recurrences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurrenceCountArgs} args - Arguments to filter Recurrences to count.
     * @example
     * // Count the number of Recurrences
     * const count = await prisma.recurrence.count({
     *   where: {
     *     // ... the filter for the Recurrences we want to count
     *   }
     * })
    **/
    count<T extends RecurrenceCountArgs>(
      args?: Subset<T, RecurrenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecurrenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recurrence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurrenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecurrenceAggregateArgs>(args: Subset<T, RecurrenceAggregateArgs>): Prisma.PrismaPromise<GetRecurrenceAggregateType<T>>

    /**
     * Group by Recurrence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecurrenceGroupByArgs} args - Group by arguments.
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
      T extends RecurrenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecurrenceGroupByArgs['orderBy'] }
        : { orderBy?: RecurrenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RecurrenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecurrenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recurrence model
   */
  readonly fields: RecurrenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recurrence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecurrenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends Recurrence$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Recurrence$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sourceAccount<T extends Recurrence$sourceAccountArgs<ExtArgs> = {}>(args?: Subset<T, Recurrence$sourceAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    targetAccount<T extends Recurrence$targetAccountArgs<ExtArgs> = {}>(args?: Subset<T, Recurrence$targetAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Recurrence$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Recurrence$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Recurrence model
   */
  interface RecurrenceFieldRefs {
    readonly id: FieldRef<"Recurrence", 'String'>
    readonly userId: FieldRef<"Recurrence", 'String'>
    readonly name: FieldRef<"Recurrence", 'String'>
    readonly type: FieldRef<"Recurrence", 'TransactionType'>
    readonly amount: FieldRef<"Recurrence", 'Decimal'>
    readonly frequency: FieldRef<"Recurrence", 'RecurrenceType'>
    readonly totalParts: FieldRef<"Recurrence", 'Int'>
    readonly currentPart: FieldRef<"Recurrence", 'Int'>
    readonly startDate: FieldRef<"Recurrence", 'DateTime'>
    readonly nextDate: FieldRef<"Recurrence", 'DateTime'>
    readonly endDate: FieldRef<"Recurrence", 'DateTime'>
    readonly active: FieldRef<"Recurrence", 'Boolean'>
    readonly categoryId: FieldRef<"Recurrence", 'String'>
    readonly sourceAccountId: FieldRef<"Recurrence", 'String'>
    readonly targetAccountId: FieldRef<"Recurrence", 'String'>
    readonly isCardExpense: FieldRef<"Recurrence", 'Boolean'>
    readonly cardType: FieldRef<"Recurrence", 'CardType'>
    readonly metadata: FieldRef<"Recurrence", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Recurrence findUnique
   */
  export type RecurrenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * Filter, which Recurrence to fetch.
     */
    where: RecurrenceWhereUniqueInput
  }

  /**
   * Recurrence findUniqueOrThrow
   */
  export type RecurrenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * Filter, which Recurrence to fetch.
     */
    where: RecurrenceWhereUniqueInput
  }

  /**
   * Recurrence findFirst
   */
  export type RecurrenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * Filter, which Recurrence to fetch.
     */
    where?: RecurrenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recurrences to fetch.
     */
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recurrences.
     */
    cursor?: RecurrenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recurrences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recurrences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recurrences.
     */
    distinct?: RecurrenceScalarFieldEnum | RecurrenceScalarFieldEnum[]
  }

  /**
   * Recurrence findFirstOrThrow
   */
  export type RecurrenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * Filter, which Recurrence to fetch.
     */
    where?: RecurrenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recurrences to fetch.
     */
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recurrences.
     */
    cursor?: RecurrenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recurrences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recurrences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recurrences.
     */
    distinct?: RecurrenceScalarFieldEnum | RecurrenceScalarFieldEnum[]
  }

  /**
   * Recurrence findMany
   */
  export type RecurrenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * Filter, which Recurrences to fetch.
     */
    where?: RecurrenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recurrences to fetch.
     */
    orderBy?: RecurrenceOrderByWithRelationInput | RecurrenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recurrences.
     */
    cursor?: RecurrenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recurrences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recurrences.
     */
    skip?: number
    distinct?: RecurrenceScalarFieldEnum | RecurrenceScalarFieldEnum[]
  }

  /**
   * Recurrence create
   */
  export type RecurrenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Recurrence.
     */
    data: XOR<RecurrenceCreateInput, RecurrenceUncheckedCreateInput>
  }

  /**
   * Recurrence createMany
   */
  export type RecurrenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recurrences.
     */
    data: RecurrenceCreateManyInput | RecurrenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recurrence createManyAndReturn
   */
  export type RecurrenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * The data used to create many Recurrences.
     */
    data: RecurrenceCreateManyInput | RecurrenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recurrence update
   */
  export type RecurrenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Recurrence.
     */
    data: XOR<RecurrenceUpdateInput, RecurrenceUncheckedUpdateInput>
    /**
     * Choose, which Recurrence to update.
     */
    where: RecurrenceWhereUniqueInput
  }

  /**
   * Recurrence updateMany
   */
  export type RecurrenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recurrences.
     */
    data: XOR<RecurrenceUpdateManyMutationInput, RecurrenceUncheckedUpdateManyInput>
    /**
     * Filter which Recurrences to update
     */
    where?: RecurrenceWhereInput
    /**
     * Limit how many Recurrences to update.
     */
    limit?: number
  }

  /**
   * Recurrence updateManyAndReturn
   */
  export type RecurrenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * The data used to update Recurrences.
     */
    data: XOR<RecurrenceUpdateManyMutationInput, RecurrenceUncheckedUpdateManyInput>
    /**
     * Filter which Recurrences to update
     */
    where?: RecurrenceWhereInput
    /**
     * Limit how many Recurrences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recurrence upsert
   */
  export type RecurrenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Recurrence to update in case it exists.
     */
    where: RecurrenceWhereUniqueInput
    /**
     * In case the Recurrence found by the `where` argument doesn't exist, create a new Recurrence with this data.
     */
    create: XOR<RecurrenceCreateInput, RecurrenceUncheckedCreateInput>
    /**
     * In case the Recurrence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecurrenceUpdateInput, RecurrenceUncheckedUpdateInput>
  }

  /**
   * Recurrence delete
   */
  export type RecurrenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    /**
     * Filter which Recurrence to delete.
     */
    where: RecurrenceWhereUniqueInput
  }

  /**
   * Recurrence deleteMany
   */
  export type RecurrenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recurrences to delete
     */
    where?: RecurrenceWhereInput
    /**
     * Limit how many Recurrences to delete.
     */
    limit?: number
  }

  /**
   * Recurrence.category
   */
  export type Recurrence$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: CategoryWhereInput
  }

  /**
   * Recurrence.sourceAccount
   */
  export type Recurrence$sourceAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Recurrence.targetAccount
   */
  export type Recurrence$targetAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Recurrence.transactions
   */
  export type Recurrence$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Recurrence without action
   */
  export type RecurrenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
    recurrencePartNumber: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
    recurrencePartNumber: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    date: Date | null
    description: string | null
    categoryId: string | null
    sourceAccountId: string | null
    targetAccountId: string | null
    recurrenceId: string | null
    recurrencePartNumber: number | null
    isBudgetedExpense: boolean | null
    budgetCategory: $Enums.BudgetCategory | null
    isCardExpense: boolean | null
    cardType: $Enums.CardType | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    date: Date | null
    description: string | null
    categoryId: string | null
    sourceAccountId: string | null
    targetAccountId: string | null
    recurrenceId: string | null
    recurrencePartNumber: number | null
    isBudgetedExpense: boolean | null
    budgetCategory: $Enums.BudgetCategory | null
    isCardExpense: boolean | null
    cardType: $Enums.CardType | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    amount: number
    date: number
    description: number
    categoryId: number
    sourceAccountId: number
    targetAccountId: number
    recurrenceId: number
    recurrencePartNumber: number
    isBudgetedExpense: number
    budgetCategory: number
    isCardExpense: number
    cardType: number
    source: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    recurrencePartNumber?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    recurrencePartNumber?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    date?: true
    description?: true
    categoryId?: true
    sourceAccountId?: true
    targetAccountId?: true
    recurrenceId?: true
    recurrencePartNumber?: true
    isBudgetedExpense?: true
    budgetCategory?: true
    isCardExpense?: true
    cardType?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    date?: true
    description?: true
    categoryId?: true
    sourceAccountId?: true
    targetAccountId?: true
    recurrenceId?: true
    recurrencePartNumber?: true
    isBudgetedExpense?: true
    budgetCategory?: true
    isCardExpense?: true
    cardType?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    date?: true
    description?: true
    categoryId?: true
    sourceAccountId?: true
    targetAccountId?: true
    recurrenceId?: true
    recurrencePartNumber?: true
    isBudgetedExpense?: true
    budgetCategory?: true
    isCardExpense?: true
    cardType?: true
    source?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal
    date: Date
    description: string | null
    categoryId: string | null
    sourceAccountId: string | null
    targetAccountId: string | null
    recurrenceId: string | null
    recurrencePartNumber: number | null
    isBudgetedExpense: boolean | null
    budgetCategory: $Enums.BudgetCategory | null
    isCardExpense: boolean | null
    cardType: $Enums.CardType | null
    source: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    recurrenceId?: boolean
    recurrencePartNumber?: boolean
    isBudgetedExpense?: boolean
    budgetCategory?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    source?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Transaction$categoryArgs<ExtArgs>
    recurrence?: boolean | Transaction$recurrenceArgs<ExtArgs>
    sourceAccount?: boolean | Transaction$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Transaction$targetAccountArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    recurrenceId?: boolean
    recurrencePartNumber?: boolean
    isBudgetedExpense?: boolean
    budgetCategory?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    source?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Transaction$categoryArgs<ExtArgs>
    recurrence?: boolean | Transaction$recurrenceArgs<ExtArgs>
    sourceAccount?: boolean | Transaction$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Transaction$targetAccountArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    recurrenceId?: boolean
    recurrencePartNumber?: boolean
    isBudgetedExpense?: boolean
    budgetCategory?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    source?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Transaction$categoryArgs<ExtArgs>
    recurrence?: boolean | Transaction$recurrenceArgs<ExtArgs>
    sourceAccount?: boolean | Transaction$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Transaction$targetAccountArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    categoryId?: boolean
    sourceAccountId?: boolean
    targetAccountId?: boolean
    recurrenceId?: boolean
    recurrencePartNumber?: boolean
    isBudgetedExpense?: boolean
    budgetCategory?: boolean
    isCardExpense?: boolean
    cardType?: boolean
    source?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "amount" | "date" | "description" | "categoryId" | "sourceAccountId" | "targetAccountId" | "recurrenceId" | "recurrencePartNumber" | "isBudgetedExpense" | "budgetCategory" | "isCardExpense" | "cardType" | "source" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Transaction$categoryArgs<ExtArgs>
    recurrence?: boolean | Transaction$recurrenceArgs<ExtArgs>
    sourceAccount?: boolean | Transaction$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Transaction$targetAccountArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Transaction$categoryArgs<ExtArgs>
    recurrence?: boolean | Transaction$recurrenceArgs<ExtArgs>
    sourceAccount?: boolean | Transaction$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Transaction$targetAccountArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Transaction$categoryArgs<ExtArgs>
    recurrence?: boolean | Transaction$recurrenceArgs<ExtArgs>
    sourceAccount?: boolean | Transaction$sourceAccountArgs<ExtArgs>
    targetAccount?: boolean | Transaction$targetAccountArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      recurrence: Prisma.$RecurrencePayload<ExtArgs> | null
      sourceAccount: Prisma.$AccountPayload<ExtArgs> | null
      targetAccount: Prisma.$AccountPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      date: Date
      description: string | null
      categoryId: string | null
      sourceAccountId: string | null
      targetAccountId: string | null
      recurrenceId: string | null
      recurrencePartNumber: number | null
      isBudgetedExpense: boolean | null
      budgetCategory: $Enums.BudgetCategory | null
      isCardExpense: boolean | null
      cardType: $Enums.CardType | null
      source: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Transaction$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recurrence<T extends Transaction$recurrenceArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$recurrenceArgs<ExtArgs>>): Prisma__RecurrenceClient<$Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sourceAccount<T extends Transaction$sourceAccountArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$sourceAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    targetAccount<T extends Transaction$targetAccountArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$targetAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly categoryId: FieldRef<"Transaction", 'String'>
    readonly sourceAccountId: FieldRef<"Transaction", 'String'>
    readonly targetAccountId: FieldRef<"Transaction", 'String'>
    readonly recurrenceId: FieldRef<"Transaction", 'String'>
    readonly recurrencePartNumber: FieldRef<"Transaction", 'Int'>
    readonly isBudgetedExpense: FieldRef<"Transaction", 'Boolean'>
    readonly budgetCategory: FieldRef<"Transaction", 'BudgetCategory'>
    readonly isCardExpense: FieldRef<"Transaction", 'Boolean'>
    readonly cardType: FieldRef<"Transaction", 'CardType'>
    readonly source: FieldRef<"Transaction", 'String'>
    readonly metadata: FieldRef<"Transaction", 'Json'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.category
   */
  export type Transaction$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: CategoryWhereInput
  }

  /**
   * Transaction.recurrence
   */
  export type Transaction$recurrenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recurrence
     */
    select?: RecurrenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recurrence
     */
    omit?: RecurrenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecurrenceInclude<ExtArgs> | null
    where?: RecurrenceWhereInput
  }

  /**
   * Transaction.sourceAccount
   */
  export type Transaction$sourceAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Transaction.targetAccount
   */
  export type Transaction$targetAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedByUserId: 'deletedByUserId',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    type: 'type',
    currency: 'currency',
    balance: 'balance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedByUserId: 'deletedByUserId',
    deletedAt: 'deletedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const RecurrenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    type: 'type',
    amount: 'amount',
    frequency: 'frequency',
    totalParts: 'totalParts',
    currentPart: 'currentPart',
    startDate: 'startDate',
    nextDate: 'nextDate',
    endDate: 'endDate',
    active: 'active',
    categoryId: 'categoryId',
    sourceAccountId: 'sourceAccountId',
    targetAccountId: 'targetAccountId',
    isCardExpense: 'isCardExpense',
    cardType: 'cardType',
    metadata: 'metadata'
  };

  export type RecurrenceScalarFieldEnum = (typeof RecurrenceScalarFieldEnum)[keyof typeof RecurrenceScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    amount: 'amount',
    date: 'date',
    description: 'description',
    categoryId: 'categoryId',
    sourceAccountId: 'sourceAccountId',
    targetAccountId: 'targetAccountId',
    recurrenceId: 'recurrenceId',
    recurrencePartNumber: 'recurrencePartNumber',
    isBudgetedExpense: 'isBudgetedExpense',
    budgetCategory: 'budgetCategory',
    isCardExpense: 'isCardExpense',
    cardType: 'cardType',
    source: 'source',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AccountType'
   */
  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  /**
   * Reference to a field of type 'AccountType[]'
   */
  export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>
    


  /**
   * Reference to a field of type 'Currency'
   */
  export type EnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency'>
    


  /**
   * Reference to a field of type 'Currency[]'
   */
  export type ListEnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'RecurrenceType'
   */
  export type EnumRecurrenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecurrenceType'>
    


  /**
   * Reference to a field of type 'RecurrenceType[]'
   */
  export type ListEnumRecurrenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecurrenceType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'CardType'
   */
  export type EnumCardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CardType'>
    


  /**
   * Reference to a field of type 'CardType[]'
   */
  export type ListEnumCardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CardType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'BudgetCategory'
   */
  export type EnumBudgetCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetCategory'>
    


  /**
   * Reference to a field of type 'BudgetCategory[]'
   */
  export type ListEnumBudgetCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetCategory[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedByUserId?: StringNullableFilter<"User"> | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    accounts?: AccountListRelationFilter
    categories?: CategoryListRelationFilter
    recurrences?: RecurrenceListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
    recurrences?: RecurrenceOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedByUserId?: StringNullableFilter<"User"> | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    accounts?: AccountListRelationFilter
    categories?: CategoryListRelationFilter
    recurrences?: RecurrenceListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedByUserId?: StringNullableWithAggregatesFilter<"User"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    type?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    currency?: EnumCurrencyFilter<"Account"> | $Enums.Currency
    balance?: DecimalFilter<"Account"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    deletedByUserId?: StringNullableFilter<"Account"> | string | null
    deletedAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactionsFrom?: TransactionListRelationFilter
    transactionsTo?: TransactionListRelationFilter
    recurrencesFrom?: RecurrenceListRelationFilter
    recurrencesTo?: RecurrenceListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    transactionsFrom?: TransactionOrderByRelationAggregateInput
    transactionsTo?: TransactionOrderByRelationAggregateInput
    recurrencesFrom?: RecurrenceOrderByRelationAggregateInput
    recurrencesTo?: RecurrenceOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_userId?: AccountNameUserIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    type?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    currency?: EnumCurrencyFilter<"Account"> | $Enums.Currency
    balance?: DecimalFilter<"Account"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    deletedByUserId?: StringNullableFilter<"Account"> | string | null
    deletedAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactionsFrom?: TransactionListRelationFilter
    transactionsTo?: TransactionListRelationFilter
    recurrencesFrom?: RecurrenceListRelationFilter
    recurrencesTo?: RecurrenceListRelationFilter
  }, "id" | "name_userId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    name?: StringWithAggregatesFilter<"Account"> | string
    type?: EnumAccountTypeWithAggregatesFilter<"Account"> | $Enums.AccountType
    currency?: EnumCurrencyWithAggregatesFilter<"Account"> | $Enums.Currency
    balance?: DecimalWithAggregatesFilter<"Account"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    deletedByUserId?: StringNullableWithAggregatesFilter<"Account"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    userId?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    recurrences?: RecurrenceListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    recurrences?: RecurrenceOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: CategoryUserIdNameCompoundUniqueInput
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    userId?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    recurrences?: RecurrenceListRelationFilter
  }, "id" | "userId_name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    userId?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    color?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type RecurrenceWhereInput = {
    AND?: RecurrenceWhereInput | RecurrenceWhereInput[]
    OR?: RecurrenceWhereInput[]
    NOT?: RecurrenceWhereInput | RecurrenceWhereInput[]
    id?: StringFilter<"Recurrence"> | string
    userId?: StringFilter<"Recurrence"> | string
    name?: StringFilter<"Recurrence"> | string
    type?: EnumTransactionTypeFilter<"Recurrence"> | $Enums.TransactionType
    amount?: DecimalFilter<"Recurrence"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFilter<"Recurrence"> | $Enums.RecurrenceType
    totalParts?: IntNullableFilter<"Recurrence"> | number | null
    currentPart?: IntFilter<"Recurrence"> | number
    startDate?: DateTimeFilter<"Recurrence"> | Date | string
    nextDate?: DateTimeNullableFilter<"Recurrence"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Recurrence"> | Date | string | null
    active?: BoolFilter<"Recurrence"> | boolean
    categoryId?: StringNullableFilter<"Recurrence"> | string | null
    sourceAccountId?: StringNullableFilter<"Recurrence"> | string | null
    targetAccountId?: StringNullableFilter<"Recurrence"> | string | null
    isCardExpense?: BoolFilter<"Recurrence"> | boolean
    cardType?: EnumCardTypeNullableFilter<"Recurrence"> | $Enums.CardType | null
    metadata?: JsonNullableFilter<"Recurrence">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    sourceAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    targetAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    transactions?: TransactionListRelationFilter
  }

  export type RecurrenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    totalParts?: SortOrderInput | SortOrder
    currentPart?: SortOrder
    startDate?: SortOrder
    nextDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    active?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    targetAccountId?: SortOrderInput | SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    sourceAccount?: AccountOrderByWithRelationInput
    targetAccount?: AccountOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type RecurrenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecurrenceWhereInput | RecurrenceWhereInput[]
    OR?: RecurrenceWhereInput[]
    NOT?: RecurrenceWhereInput | RecurrenceWhereInput[]
    userId?: StringFilter<"Recurrence"> | string
    name?: StringFilter<"Recurrence"> | string
    type?: EnumTransactionTypeFilter<"Recurrence"> | $Enums.TransactionType
    amount?: DecimalFilter<"Recurrence"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFilter<"Recurrence"> | $Enums.RecurrenceType
    totalParts?: IntNullableFilter<"Recurrence"> | number | null
    currentPart?: IntFilter<"Recurrence"> | number
    startDate?: DateTimeFilter<"Recurrence"> | Date | string
    nextDate?: DateTimeNullableFilter<"Recurrence"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Recurrence"> | Date | string | null
    active?: BoolFilter<"Recurrence"> | boolean
    categoryId?: StringNullableFilter<"Recurrence"> | string | null
    sourceAccountId?: StringNullableFilter<"Recurrence"> | string | null
    targetAccountId?: StringNullableFilter<"Recurrence"> | string | null
    isCardExpense?: BoolFilter<"Recurrence"> | boolean
    cardType?: EnumCardTypeNullableFilter<"Recurrence"> | $Enums.CardType | null
    metadata?: JsonNullableFilter<"Recurrence">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    sourceAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    targetAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    transactions?: TransactionListRelationFilter
  }, "id">

  export type RecurrenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    totalParts?: SortOrderInput | SortOrder
    currentPart?: SortOrder
    startDate?: SortOrder
    nextDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    active?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    targetAccountId?: SortOrderInput | SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: RecurrenceCountOrderByAggregateInput
    _avg?: RecurrenceAvgOrderByAggregateInput
    _max?: RecurrenceMaxOrderByAggregateInput
    _min?: RecurrenceMinOrderByAggregateInput
    _sum?: RecurrenceSumOrderByAggregateInput
  }

  export type RecurrenceScalarWhereWithAggregatesInput = {
    AND?: RecurrenceScalarWhereWithAggregatesInput | RecurrenceScalarWhereWithAggregatesInput[]
    OR?: RecurrenceScalarWhereWithAggregatesInput[]
    NOT?: RecurrenceScalarWhereWithAggregatesInput | RecurrenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recurrence"> | string
    userId?: StringWithAggregatesFilter<"Recurrence"> | string
    name?: StringWithAggregatesFilter<"Recurrence"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Recurrence"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Recurrence"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeWithAggregatesFilter<"Recurrence"> | $Enums.RecurrenceType
    totalParts?: IntNullableWithAggregatesFilter<"Recurrence"> | number | null
    currentPart?: IntWithAggregatesFilter<"Recurrence"> | number
    startDate?: DateTimeWithAggregatesFilter<"Recurrence"> | Date | string
    nextDate?: DateTimeNullableWithAggregatesFilter<"Recurrence"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Recurrence"> | Date | string | null
    active?: BoolWithAggregatesFilter<"Recurrence"> | boolean
    categoryId?: StringNullableWithAggregatesFilter<"Recurrence"> | string | null
    sourceAccountId?: StringNullableWithAggregatesFilter<"Recurrence"> | string | null
    targetAccountId?: StringNullableWithAggregatesFilter<"Recurrence"> | string | null
    isCardExpense?: BoolWithAggregatesFilter<"Recurrence"> | boolean
    cardType?: EnumCardTypeNullableWithAggregatesFilter<"Recurrence"> | $Enums.CardType | null
    metadata?: JsonNullableWithAggregatesFilter<"Recurrence">
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    description?: StringNullableFilter<"Transaction"> | string | null
    categoryId?: StringNullableFilter<"Transaction"> | string | null
    sourceAccountId?: StringNullableFilter<"Transaction"> | string | null
    targetAccountId?: StringNullableFilter<"Transaction"> | string | null
    recurrenceId?: StringNullableFilter<"Transaction"> | string | null
    recurrencePartNumber?: IntNullableFilter<"Transaction"> | number | null
    isBudgetedExpense?: BoolNullableFilter<"Transaction"> | boolean | null
    budgetCategory?: EnumBudgetCategoryNullableFilter<"Transaction"> | $Enums.BudgetCategory | null
    isCardExpense?: BoolNullableFilter<"Transaction"> | boolean | null
    cardType?: EnumCardTypeNullableFilter<"Transaction"> | $Enums.CardType | null
    source?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    recurrence?: XOR<RecurrenceNullableScalarRelationFilter, RecurrenceWhereInput> | null
    sourceAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    targetAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    targetAccountId?: SortOrderInput | SortOrder
    recurrenceId?: SortOrderInput | SortOrder
    recurrencePartNumber?: SortOrderInput | SortOrder
    isBudgetedExpense?: SortOrderInput | SortOrder
    budgetCategory?: SortOrderInput | SortOrder
    isCardExpense?: SortOrderInput | SortOrder
    cardType?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    recurrence?: RecurrenceOrderByWithRelationInput
    sourceAccount?: AccountOrderByWithRelationInput
    targetAccount?: AccountOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    description?: StringNullableFilter<"Transaction"> | string | null
    categoryId?: StringNullableFilter<"Transaction"> | string | null
    sourceAccountId?: StringNullableFilter<"Transaction"> | string | null
    targetAccountId?: StringNullableFilter<"Transaction"> | string | null
    recurrenceId?: StringNullableFilter<"Transaction"> | string | null
    recurrencePartNumber?: IntNullableFilter<"Transaction"> | number | null
    isBudgetedExpense?: BoolNullableFilter<"Transaction"> | boolean | null
    budgetCategory?: EnumBudgetCategoryNullableFilter<"Transaction"> | $Enums.BudgetCategory | null
    isCardExpense?: BoolNullableFilter<"Transaction"> | boolean | null
    cardType?: EnumCardTypeNullableFilter<"Transaction"> | $Enums.CardType | null
    source?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    recurrence?: XOR<RecurrenceNullableScalarRelationFilter, RecurrenceWhereInput> | null
    sourceAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    targetAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    targetAccountId?: SortOrderInput | SortOrder
    recurrenceId?: SortOrderInput | SortOrder
    recurrencePartNumber?: SortOrderInput | SortOrder
    isBudgetedExpense?: SortOrderInput | SortOrder
    budgetCategory?: SortOrderInput | SortOrder
    isCardExpense?: SortOrderInput | SortOrder
    cardType?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    sourceAccountId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    targetAccountId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    recurrenceId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    recurrencePartNumber?: IntNullableWithAggregatesFilter<"Transaction"> | number | null
    isBudgetedExpense?: BoolNullableWithAggregatesFilter<"Transaction"> | boolean | null
    budgetCategory?: EnumBudgetCategoryNullableWithAggregatesFilter<"Transaction"> | $Enums.BudgetCategory | null
    isCardExpense?: BoolNullableWithAggregatesFilter<"Transaction"> | boolean | null
    cardType?: EnumCardTypeNullableWithAggregatesFilter<"Transaction"> | $Enums.CardType | null
    source?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Transaction">
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    categories?: CategoryUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountCreateInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAccountsInput
    transactionsFrom?: TransactionCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    transactionsFrom?: TransactionUncheckedCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionUncheckedCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceUncheckedCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceUncheckedCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    transactionsFrom?: TransactionUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactionsFrom?: TransactionUncheckedUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUncheckedUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUncheckedUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUncheckedUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
    recurrences?: RecurrenceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
    recurrences?: RecurrenceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    transactions?: TransactionUpdateManyWithoutCategoryNestedInput
    recurrences?: RecurrenceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryNestedInput
    recurrences?: RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    userId: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurrenceCreateInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutRecurrencesInput
    category?: CategoryCreateNestedOneWithoutRecurrencesInput
    sourceAccount?: AccountCreateNestedOneWithoutRecurrencesFromInput
    targetAccount?: AccountCreateNestedOneWithoutRecurrencesToInput
    transactions?: TransactionCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutRecurrencesNestedInput
    category?: CategoryUpdateOneWithoutRecurrencesNestedInput
    sourceAccount?: AccountUpdateOneWithoutRecurrencesFromNestedInput
    targetAccount?: AccountUpdateOneWithoutRecurrencesToNestedInput
    transactions?: TransactionUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceCreateManyInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RecurrenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RecurrenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionCreateInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTransactionsInput
    recurrence?: RecurrenceCreateNestedOneWithoutTransactionsInput
    sourceAccount?: AccountCreateNestedOneWithoutTransactionsFromInput
    targetAccount?: AccountCreateNestedOneWithoutTransactionsToInput
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTransactionsNestedInput
    recurrence?: RecurrenceUpdateOneWithoutTransactionsNestedInput
    sourceAccount?: AccountUpdateOneWithoutTransactionsFromNestedInput
    targetAccount?: AccountUpdateOneWithoutTransactionsToNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type RecurrenceListRelationFilter = {
    every?: RecurrenceWhereInput
    some?: RecurrenceWhereInput
    none?: RecurrenceWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecurrenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrder
    deletedAt?: SortOrder
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type EnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountNameUserIdCompoundUniqueInput = {
    name: string
    userId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrder
    deletedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrder
    deletedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedByUserId?: SortOrder
    deletedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type EnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
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

  export type CategoryUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type EnumRecurrenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RecurrenceType | EnumRecurrenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecurrenceTypeFilter<$PrismaModel> | $Enums.RecurrenceType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumCardTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCardTypeNullableFilter<$PrismaModel> | $Enums.CardType | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type AccountNullableScalarRelationFilter = {
    is?: AccountWhereInput | null
    isNot?: AccountWhereInput | null
  }

  export type RecurrenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    totalParts?: SortOrder
    currentPart?: SortOrder
    startDate?: SortOrder
    nextDate?: SortOrder
    endDate?: SortOrder
    active?: SortOrder
    categoryId?: SortOrder
    sourceAccountId?: SortOrder
    targetAccountId?: SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrder
    metadata?: SortOrder
  }

  export type RecurrenceAvgOrderByAggregateInput = {
    amount?: SortOrder
    totalParts?: SortOrder
    currentPart?: SortOrder
  }

  export type RecurrenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    totalParts?: SortOrder
    currentPart?: SortOrder
    startDate?: SortOrder
    nextDate?: SortOrder
    endDate?: SortOrder
    active?: SortOrder
    categoryId?: SortOrder
    sourceAccountId?: SortOrder
    targetAccountId?: SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrder
  }

  export type RecurrenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    totalParts?: SortOrder
    currentPart?: SortOrder
    startDate?: SortOrder
    nextDate?: SortOrder
    endDate?: SortOrder
    active?: SortOrder
    categoryId?: SortOrder
    sourceAccountId?: SortOrder
    targetAccountId?: SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrder
  }

  export type RecurrenceSumOrderByAggregateInput = {
    amount?: SortOrder
    totalParts?: SortOrder
    currentPart?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumRecurrenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecurrenceType | EnumRecurrenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecurrenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.RecurrenceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecurrenceTypeFilter<$PrismaModel>
    _max?: NestedEnumRecurrenceTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumCardTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCardTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CardType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCardTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCardTypeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EnumBudgetCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetCategory | EnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBudgetCategoryNullableFilter<$PrismaModel> | $Enums.BudgetCategory | null
  }

  export type RecurrenceNullableScalarRelationFilter = {
    is?: RecurrenceWhereInput | null
    isNot?: RecurrenceWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    sourceAccountId?: SortOrder
    targetAccountId?: SortOrder
    recurrenceId?: SortOrder
    recurrencePartNumber?: SortOrder
    isBudgetedExpense?: SortOrder
    budgetCategory?: SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrder
    source?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    recurrencePartNumber?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    sourceAccountId?: SortOrder
    targetAccountId?: SortOrder
    recurrenceId?: SortOrder
    recurrencePartNumber?: SortOrder
    isBudgetedExpense?: SortOrder
    budgetCategory?: SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    sourceAccountId?: SortOrder
    targetAccountId?: SortOrder
    recurrenceId?: SortOrder
    recurrencePartNumber?: SortOrder
    isBudgetedExpense?: SortOrder
    budgetCategory?: SortOrder
    isCardExpense?: SortOrder
    cardType?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    recurrencePartNumber?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumBudgetCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetCategory | EnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBudgetCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.BudgetCategory | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumBudgetCategoryNullableFilter<$PrismaModel>
    _max?: NestedEnumBudgetCategoryNullableFilter<$PrismaModel>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type RecurrenceCreateNestedManyWithoutUserInput = {
    create?: XOR<RecurrenceCreateWithoutUserInput, RecurrenceUncheckedCreateWithoutUserInput> | RecurrenceCreateWithoutUserInput[] | RecurrenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutUserInput | RecurrenceCreateOrConnectWithoutUserInput[]
    createMany?: RecurrenceCreateManyUserInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type RecurrenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecurrenceCreateWithoutUserInput, RecurrenceUncheckedCreateWithoutUserInput> | RecurrenceCreateWithoutUserInput[] | RecurrenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutUserInput | RecurrenceCreateOrConnectWithoutUserInput[]
    createMany?: RecurrenceCreateManyUserInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type RecurrenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecurrenceCreateWithoutUserInput, RecurrenceUncheckedCreateWithoutUserInput> | RecurrenceCreateWithoutUserInput[] | RecurrenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutUserInput | RecurrenceCreateOrConnectWithoutUserInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutUserInput | RecurrenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecurrenceCreateManyUserInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutUserInput | RecurrenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutUserInput | RecurrenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type RecurrenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecurrenceCreateWithoutUserInput, RecurrenceUncheckedCreateWithoutUserInput> | RecurrenceCreateWithoutUserInput[] | RecurrenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutUserInput | RecurrenceCreateOrConnectWithoutUserInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutUserInput | RecurrenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecurrenceCreateManyUserInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutUserInput | RecurrenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutUserInput | RecurrenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutSourceAccountInput = {
    create?: XOR<TransactionCreateWithoutSourceAccountInput, TransactionUncheckedCreateWithoutSourceAccountInput> | TransactionCreateWithoutSourceAccountInput[] | TransactionUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSourceAccountInput | TransactionCreateOrConnectWithoutSourceAccountInput[]
    createMany?: TransactionCreateManySourceAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutTargetAccountInput = {
    create?: XOR<TransactionCreateWithoutTargetAccountInput, TransactionUncheckedCreateWithoutTargetAccountInput> | TransactionCreateWithoutTargetAccountInput[] | TransactionUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTargetAccountInput | TransactionCreateOrConnectWithoutTargetAccountInput[]
    createMany?: TransactionCreateManyTargetAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type RecurrenceCreateNestedManyWithoutSourceAccountInput = {
    create?: XOR<RecurrenceCreateWithoutSourceAccountInput, RecurrenceUncheckedCreateWithoutSourceAccountInput> | RecurrenceCreateWithoutSourceAccountInput[] | RecurrenceUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutSourceAccountInput | RecurrenceCreateOrConnectWithoutSourceAccountInput[]
    createMany?: RecurrenceCreateManySourceAccountInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type RecurrenceCreateNestedManyWithoutTargetAccountInput = {
    create?: XOR<RecurrenceCreateWithoutTargetAccountInput, RecurrenceUncheckedCreateWithoutTargetAccountInput> | RecurrenceCreateWithoutTargetAccountInput[] | RecurrenceUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutTargetAccountInput | RecurrenceCreateOrConnectWithoutTargetAccountInput[]
    createMany?: RecurrenceCreateManyTargetAccountInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutSourceAccountInput = {
    create?: XOR<TransactionCreateWithoutSourceAccountInput, TransactionUncheckedCreateWithoutSourceAccountInput> | TransactionCreateWithoutSourceAccountInput[] | TransactionUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSourceAccountInput | TransactionCreateOrConnectWithoutSourceAccountInput[]
    createMany?: TransactionCreateManySourceAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutTargetAccountInput = {
    create?: XOR<TransactionCreateWithoutTargetAccountInput, TransactionUncheckedCreateWithoutTargetAccountInput> | TransactionCreateWithoutTargetAccountInput[] | TransactionUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTargetAccountInput | TransactionCreateOrConnectWithoutTargetAccountInput[]
    createMany?: TransactionCreateManyTargetAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type RecurrenceUncheckedCreateNestedManyWithoutSourceAccountInput = {
    create?: XOR<RecurrenceCreateWithoutSourceAccountInput, RecurrenceUncheckedCreateWithoutSourceAccountInput> | RecurrenceCreateWithoutSourceAccountInput[] | RecurrenceUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutSourceAccountInput | RecurrenceCreateOrConnectWithoutSourceAccountInput[]
    createMany?: RecurrenceCreateManySourceAccountInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type RecurrenceUncheckedCreateNestedManyWithoutTargetAccountInput = {
    create?: XOR<RecurrenceCreateWithoutTargetAccountInput, RecurrenceUncheckedCreateWithoutTargetAccountInput> | RecurrenceCreateWithoutTargetAccountInput[] | RecurrenceUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutTargetAccountInput | RecurrenceCreateOrConnectWithoutTargetAccountInput[]
    createMany?: RecurrenceCreateManyTargetAccountInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type EnumCurrencyFieldUpdateOperationsInput = {
    set?: $Enums.Currency
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type TransactionUpdateManyWithoutSourceAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutSourceAccountInput, TransactionUncheckedCreateWithoutSourceAccountInput> | TransactionCreateWithoutSourceAccountInput[] | TransactionUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSourceAccountInput | TransactionCreateOrConnectWithoutSourceAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutSourceAccountInput | TransactionUpsertWithWhereUniqueWithoutSourceAccountInput[]
    createMany?: TransactionCreateManySourceAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutSourceAccountInput | TransactionUpdateWithWhereUniqueWithoutSourceAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutSourceAccountInput | TransactionUpdateManyWithWhereWithoutSourceAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutTargetAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutTargetAccountInput, TransactionUncheckedCreateWithoutTargetAccountInput> | TransactionCreateWithoutTargetAccountInput[] | TransactionUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTargetAccountInput | TransactionCreateOrConnectWithoutTargetAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutTargetAccountInput | TransactionUpsertWithWhereUniqueWithoutTargetAccountInput[]
    createMany?: TransactionCreateManyTargetAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutTargetAccountInput | TransactionUpdateWithWhereUniqueWithoutTargetAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutTargetAccountInput | TransactionUpdateManyWithWhereWithoutTargetAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type RecurrenceUpdateManyWithoutSourceAccountNestedInput = {
    create?: XOR<RecurrenceCreateWithoutSourceAccountInput, RecurrenceUncheckedCreateWithoutSourceAccountInput> | RecurrenceCreateWithoutSourceAccountInput[] | RecurrenceUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutSourceAccountInput | RecurrenceCreateOrConnectWithoutSourceAccountInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutSourceAccountInput | RecurrenceUpsertWithWhereUniqueWithoutSourceAccountInput[]
    createMany?: RecurrenceCreateManySourceAccountInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutSourceAccountInput | RecurrenceUpdateWithWhereUniqueWithoutSourceAccountInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutSourceAccountInput | RecurrenceUpdateManyWithWhereWithoutSourceAccountInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type RecurrenceUpdateManyWithoutTargetAccountNestedInput = {
    create?: XOR<RecurrenceCreateWithoutTargetAccountInput, RecurrenceUncheckedCreateWithoutTargetAccountInput> | RecurrenceCreateWithoutTargetAccountInput[] | RecurrenceUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutTargetAccountInput | RecurrenceCreateOrConnectWithoutTargetAccountInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutTargetAccountInput | RecurrenceUpsertWithWhereUniqueWithoutTargetAccountInput[]
    createMany?: RecurrenceCreateManyTargetAccountInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutTargetAccountInput | RecurrenceUpdateWithWhereUniqueWithoutTargetAccountInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutTargetAccountInput | RecurrenceUpdateManyWithWhereWithoutTargetAccountInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutSourceAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutSourceAccountInput, TransactionUncheckedCreateWithoutSourceAccountInput> | TransactionCreateWithoutSourceAccountInput[] | TransactionUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutSourceAccountInput | TransactionCreateOrConnectWithoutSourceAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutSourceAccountInput | TransactionUpsertWithWhereUniqueWithoutSourceAccountInput[]
    createMany?: TransactionCreateManySourceAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutSourceAccountInput | TransactionUpdateWithWhereUniqueWithoutSourceAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutSourceAccountInput | TransactionUpdateManyWithWhereWithoutSourceAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutTargetAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutTargetAccountInput, TransactionUncheckedCreateWithoutTargetAccountInput> | TransactionCreateWithoutTargetAccountInput[] | TransactionUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTargetAccountInput | TransactionCreateOrConnectWithoutTargetAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutTargetAccountInput | TransactionUpsertWithWhereUniqueWithoutTargetAccountInput[]
    createMany?: TransactionCreateManyTargetAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutTargetAccountInput | TransactionUpdateWithWhereUniqueWithoutTargetAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutTargetAccountInput | TransactionUpdateManyWithWhereWithoutTargetAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type RecurrenceUncheckedUpdateManyWithoutSourceAccountNestedInput = {
    create?: XOR<RecurrenceCreateWithoutSourceAccountInput, RecurrenceUncheckedCreateWithoutSourceAccountInput> | RecurrenceCreateWithoutSourceAccountInput[] | RecurrenceUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutSourceAccountInput | RecurrenceCreateOrConnectWithoutSourceAccountInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutSourceAccountInput | RecurrenceUpsertWithWhereUniqueWithoutSourceAccountInput[]
    createMany?: RecurrenceCreateManySourceAccountInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutSourceAccountInput | RecurrenceUpdateWithWhereUniqueWithoutSourceAccountInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutSourceAccountInput | RecurrenceUpdateManyWithWhereWithoutSourceAccountInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type RecurrenceUncheckedUpdateManyWithoutTargetAccountNestedInput = {
    create?: XOR<RecurrenceCreateWithoutTargetAccountInput, RecurrenceUncheckedCreateWithoutTargetAccountInput> | RecurrenceCreateWithoutTargetAccountInput[] | RecurrenceUncheckedCreateWithoutTargetAccountInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutTargetAccountInput | RecurrenceCreateOrConnectWithoutTargetAccountInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutTargetAccountInput | RecurrenceUpsertWithWhereUniqueWithoutTargetAccountInput[]
    createMany?: RecurrenceCreateManyTargetAccountInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutTargetAccountInput | RecurrenceUpdateWithWhereUniqueWithoutTargetAccountInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutTargetAccountInput | RecurrenceUpdateManyWithWhereWithoutTargetAccountInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type RecurrenceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<RecurrenceCreateWithoutCategoryInput, RecurrenceUncheckedCreateWithoutCategoryInput> | RecurrenceCreateWithoutCategoryInput[] | RecurrenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutCategoryInput | RecurrenceCreateOrConnectWithoutCategoryInput[]
    createMany?: RecurrenceCreateManyCategoryInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type RecurrenceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<RecurrenceCreateWithoutCategoryInput, RecurrenceUncheckedCreateWithoutCategoryInput> | RecurrenceCreateWithoutCategoryInput[] | RecurrenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutCategoryInput | RecurrenceCreateOrConnectWithoutCategoryInput[]
    createMany?: RecurrenceCreateManyCategoryInputEnvelope
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    upsert?: UserUpsertWithoutCategoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCategoriesInput, UserUpdateWithoutCategoriesInput>, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type TransactionUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCategoryInput | TransactionUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCategoryInput | TransactionUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCategoryInput | TransactionUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type RecurrenceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<RecurrenceCreateWithoutCategoryInput, RecurrenceUncheckedCreateWithoutCategoryInput> | RecurrenceCreateWithoutCategoryInput[] | RecurrenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutCategoryInput | RecurrenceCreateOrConnectWithoutCategoryInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutCategoryInput | RecurrenceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: RecurrenceCreateManyCategoryInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutCategoryInput | RecurrenceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutCategoryInput | RecurrenceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCategoryInput | TransactionUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCategoryInput | TransactionUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCategoryInput | TransactionUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<RecurrenceCreateWithoutCategoryInput, RecurrenceUncheckedCreateWithoutCategoryInput> | RecurrenceCreateWithoutCategoryInput[] | RecurrenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RecurrenceCreateOrConnectWithoutCategoryInput | RecurrenceCreateOrConnectWithoutCategoryInput[]
    upsert?: RecurrenceUpsertWithWhereUniqueWithoutCategoryInput | RecurrenceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: RecurrenceCreateManyCategoryInputEnvelope
    set?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    disconnect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    delete?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    connect?: RecurrenceWhereUniqueInput | RecurrenceWhereUniqueInput[]
    update?: RecurrenceUpdateWithWhereUniqueWithoutCategoryInput | RecurrenceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: RecurrenceUpdateManyWithWhereWithoutCategoryInput | RecurrenceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRecurrencesInput = {
    create?: XOR<UserCreateWithoutRecurrencesInput, UserUncheckedCreateWithoutRecurrencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecurrencesInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutRecurrencesInput = {
    create?: XOR<CategoryCreateWithoutRecurrencesInput, CategoryUncheckedCreateWithoutRecurrencesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRecurrencesInput
    connect?: CategoryWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutRecurrencesFromInput = {
    create?: XOR<AccountCreateWithoutRecurrencesFromInput, AccountUncheckedCreateWithoutRecurrencesFromInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRecurrencesFromInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutRecurrencesToInput = {
    create?: XOR<AccountCreateWithoutRecurrencesToInput, AccountUncheckedCreateWithoutRecurrencesToInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRecurrencesToInput
    connect?: AccountWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutRecurrenceInput = {
    create?: XOR<TransactionCreateWithoutRecurrenceInput, TransactionUncheckedCreateWithoutRecurrenceInput> | TransactionCreateWithoutRecurrenceInput[] | TransactionUncheckedCreateWithoutRecurrenceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutRecurrenceInput | TransactionCreateOrConnectWithoutRecurrenceInput[]
    createMany?: TransactionCreateManyRecurrenceInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutRecurrenceInput = {
    create?: XOR<TransactionCreateWithoutRecurrenceInput, TransactionUncheckedCreateWithoutRecurrenceInput> | TransactionCreateWithoutRecurrenceInput[] | TransactionUncheckedCreateWithoutRecurrenceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutRecurrenceInput | TransactionCreateOrConnectWithoutRecurrenceInput[]
    createMany?: TransactionCreateManyRecurrenceInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type EnumRecurrenceTypeFieldUpdateOperationsInput = {
    set?: $Enums.RecurrenceType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumCardTypeFieldUpdateOperationsInput = {
    set?: $Enums.CardType | null
  }

  export type UserUpdateOneRequiredWithoutRecurrencesNestedInput = {
    create?: XOR<UserCreateWithoutRecurrencesInput, UserUncheckedCreateWithoutRecurrencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecurrencesInput
    upsert?: UserUpsertWithoutRecurrencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecurrencesInput, UserUpdateWithoutRecurrencesInput>, UserUncheckedUpdateWithoutRecurrencesInput>
  }

  export type CategoryUpdateOneWithoutRecurrencesNestedInput = {
    create?: XOR<CategoryCreateWithoutRecurrencesInput, CategoryUncheckedCreateWithoutRecurrencesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRecurrencesInput
    upsert?: CategoryUpsertWithoutRecurrencesInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutRecurrencesInput, CategoryUpdateWithoutRecurrencesInput>, CategoryUncheckedUpdateWithoutRecurrencesInput>
  }

  export type AccountUpdateOneWithoutRecurrencesFromNestedInput = {
    create?: XOR<AccountCreateWithoutRecurrencesFromInput, AccountUncheckedCreateWithoutRecurrencesFromInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRecurrencesFromInput
    upsert?: AccountUpsertWithoutRecurrencesFromInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutRecurrencesFromInput, AccountUpdateWithoutRecurrencesFromInput>, AccountUncheckedUpdateWithoutRecurrencesFromInput>
  }

  export type AccountUpdateOneWithoutRecurrencesToNestedInput = {
    create?: XOR<AccountCreateWithoutRecurrencesToInput, AccountUncheckedCreateWithoutRecurrencesToInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRecurrencesToInput
    upsert?: AccountUpsertWithoutRecurrencesToInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutRecurrencesToInput, AccountUpdateWithoutRecurrencesToInput>, AccountUncheckedUpdateWithoutRecurrencesToInput>
  }

  export type TransactionUpdateManyWithoutRecurrenceNestedInput = {
    create?: XOR<TransactionCreateWithoutRecurrenceInput, TransactionUncheckedCreateWithoutRecurrenceInput> | TransactionCreateWithoutRecurrenceInput[] | TransactionUncheckedCreateWithoutRecurrenceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutRecurrenceInput | TransactionCreateOrConnectWithoutRecurrenceInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutRecurrenceInput | TransactionUpsertWithWhereUniqueWithoutRecurrenceInput[]
    createMany?: TransactionCreateManyRecurrenceInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutRecurrenceInput | TransactionUpdateWithWhereUniqueWithoutRecurrenceInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutRecurrenceInput | TransactionUpdateManyWithWhereWithoutRecurrenceInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput = {
    create?: XOR<TransactionCreateWithoutRecurrenceInput, TransactionUncheckedCreateWithoutRecurrenceInput> | TransactionCreateWithoutRecurrenceInput[] | TransactionUncheckedCreateWithoutRecurrenceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutRecurrenceInput | TransactionCreateOrConnectWithoutRecurrenceInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutRecurrenceInput | TransactionUpsertWithWhereUniqueWithoutRecurrenceInput[]
    createMany?: TransactionCreateManyRecurrenceInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutRecurrenceInput | TransactionUpdateWithWhereUniqueWithoutRecurrenceInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutRecurrenceInput | TransactionUpdateManyWithWhereWithoutRecurrenceInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTransactionsInput
    connect?: CategoryWhereUniqueInput
  }

  export type RecurrenceCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<RecurrenceCreateWithoutTransactionsInput, RecurrenceUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: RecurrenceCreateOrConnectWithoutTransactionsInput
    connect?: RecurrenceWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutTransactionsFromInput = {
    create?: XOR<AccountCreateWithoutTransactionsFromInput, AccountUncheckedCreateWithoutTransactionsFromInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsFromInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutTransactionsToInput = {
    create?: XOR<AccountCreateWithoutTransactionsToInput, AccountUncheckedCreateWithoutTransactionsToInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsToInput
    connect?: AccountWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableEnumBudgetCategoryFieldUpdateOperationsInput = {
    set?: $Enums.BudgetCategory | null
  }

  export type CategoryUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTransactionsInput
    upsert?: CategoryUpsertWithoutTransactionsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutTransactionsInput, CategoryUpdateWithoutTransactionsInput>, CategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type RecurrenceUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<RecurrenceCreateWithoutTransactionsInput, RecurrenceUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: RecurrenceCreateOrConnectWithoutTransactionsInput
    upsert?: RecurrenceUpsertWithoutTransactionsInput
    disconnect?: RecurrenceWhereInput | boolean
    delete?: RecurrenceWhereInput | boolean
    connect?: RecurrenceWhereUniqueInput
    update?: XOR<XOR<RecurrenceUpdateToOneWithWhereWithoutTransactionsInput, RecurrenceUpdateWithoutTransactionsInput>, RecurrenceUncheckedUpdateWithoutTransactionsInput>
  }

  export type AccountUpdateOneWithoutTransactionsFromNestedInput = {
    create?: XOR<AccountCreateWithoutTransactionsFromInput, AccountUncheckedCreateWithoutTransactionsFromInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsFromInput
    upsert?: AccountUpsertWithoutTransactionsFromInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTransactionsFromInput, AccountUpdateWithoutTransactionsFromInput>, AccountUncheckedUpdateWithoutTransactionsFromInput>
  }

  export type AccountUpdateOneWithoutTransactionsToNestedInput = {
    create?: XOR<AccountCreateWithoutTransactionsToInput, AccountUncheckedCreateWithoutTransactionsToInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsToInput
    upsert?: AccountUpsertWithoutTransactionsToInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTransactionsToInput, AccountUpdateWithoutTransactionsToInput>, AccountUncheckedUpdateWithoutTransactionsToInput>
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type NestedEnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
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

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type NestedEnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
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

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumRecurrenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RecurrenceType | EnumRecurrenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecurrenceTypeFilter<$PrismaModel> | $Enums.RecurrenceType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCardTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCardTypeNullableFilter<$PrismaModel> | $Enums.CardType | null
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumRecurrenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecurrenceType | EnumRecurrenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecurrenceType[] | ListEnumRecurrenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecurrenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.RecurrenceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecurrenceTypeFilter<$PrismaModel>
    _max?: NestedEnumRecurrenceTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumCardTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCardTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CardType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCardTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCardTypeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumBudgetCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetCategory | EnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBudgetCategoryNullableFilter<$PrismaModel> | $Enums.BudgetCategory | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumBudgetCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetCategory | EnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BudgetCategory[] | ListEnumBudgetCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBudgetCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.BudgetCategory | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumBudgetCategoryNullableFilter<$PrismaModel>
    _max?: NestedEnumBudgetCategoryNullableFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    transactionsFrom?: TransactionCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    transactionsFrom?: TransactionUncheckedCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionUncheckedCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceUncheckedCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceUncheckedCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutUserInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
    recurrences?: RecurrenceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
    recurrences?: RecurrenceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutUserInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryCreateManyUserInputEnvelope = {
    data: CategoryCreateManyUserInput | CategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecurrenceCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    category?: CategoryCreateNestedOneWithoutRecurrencesInput
    sourceAccount?: AccountCreateNestedOneWithoutRecurrencesFromInput
    targetAccount?: AccountCreateNestedOneWithoutRecurrencesToInput
    transactions?: TransactionCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceCreateOrConnectWithoutUserInput = {
    where: RecurrenceWhereUniqueInput
    create: XOR<RecurrenceCreateWithoutUserInput, RecurrenceUncheckedCreateWithoutUserInput>
  }

  export type RecurrenceCreateManyUserInputEnvelope = {
    data: RecurrenceCreateManyUserInput | RecurrenceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTransactionsInput
    recurrence?: RecurrenceCreateNestedOneWithoutTransactionsInput
    sourceAccount?: AccountCreateNestedOneWithoutTransactionsFromInput
    targetAccount?: AccountCreateNestedOneWithoutTransactionsToInput
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    type?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    currency?: EnumCurrencyFilter<"Account"> | $Enums.Currency
    balance?: DecimalFilter<"Account"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    deletedByUserId?: StringNullableFilter<"Account"> | string | null
    deletedAt?: DateTimeNullableFilter<"Account"> | Date | string | null
  }

  export type CategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUpdateManyWithWhereWithoutUserInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    userId?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type RecurrenceUpsertWithWhereUniqueWithoutUserInput = {
    where: RecurrenceWhereUniqueInput
    update: XOR<RecurrenceUpdateWithoutUserInput, RecurrenceUncheckedUpdateWithoutUserInput>
    create: XOR<RecurrenceCreateWithoutUserInput, RecurrenceUncheckedCreateWithoutUserInput>
  }

  export type RecurrenceUpdateWithWhereUniqueWithoutUserInput = {
    where: RecurrenceWhereUniqueInput
    data: XOR<RecurrenceUpdateWithoutUserInput, RecurrenceUncheckedUpdateWithoutUserInput>
  }

  export type RecurrenceUpdateManyWithWhereWithoutUserInput = {
    where: RecurrenceScalarWhereInput
    data: XOR<RecurrenceUpdateManyMutationInput, RecurrenceUncheckedUpdateManyWithoutUserInput>
  }

  export type RecurrenceScalarWhereInput = {
    AND?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
    OR?: RecurrenceScalarWhereInput[]
    NOT?: RecurrenceScalarWhereInput | RecurrenceScalarWhereInput[]
    id?: StringFilter<"Recurrence"> | string
    userId?: StringFilter<"Recurrence"> | string
    name?: StringFilter<"Recurrence"> | string
    type?: EnumTransactionTypeFilter<"Recurrence"> | $Enums.TransactionType
    amount?: DecimalFilter<"Recurrence"> | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFilter<"Recurrence"> | $Enums.RecurrenceType
    totalParts?: IntNullableFilter<"Recurrence"> | number | null
    currentPart?: IntFilter<"Recurrence"> | number
    startDate?: DateTimeFilter<"Recurrence"> | Date | string
    nextDate?: DateTimeNullableFilter<"Recurrence"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Recurrence"> | Date | string | null
    active?: BoolFilter<"Recurrence"> | boolean
    categoryId?: StringNullableFilter<"Recurrence"> | string | null
    sourceAccountId?: StringNullableFilter<"Recurrence"> | string | null
    targetAccountId?: StringNullableFilter<"Recurrence"> | string | null
    isCardExpense?: BoolFilter<"Recurrence"> | boolean
    cardType?: EnumCardTypeNullableFilter<"Recurrence"> | $Enums.CardType | null
    metadata?: JsonNullableFilter<"Recurrence">
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    description?: StringNullableFilter<"Transaction"> | string | null
    categoryId?: StringNullableFilter<"Transaction"> | string | null
    sourceAccountId?: StringNullableFilter<"Transaction"> | string | null
    targetAccountId?: StringNullableFilter<"Transaction"> | string | null
    recurrenceId?: StringNullableFilter<"Transaction"> | string | null
    recurrencePartNumber?: IntNullableFilter<"Transaction"> | number | null
    isBudgetedExpense?: BoolNullableFilter<"Transaction"> | boolean | null
    budgetCategory?: EnumBudgetCategoryNullableFilter<"Transaction"> | $Enums.BudgetCategory | null
    isCardExpense?: BoolNullableFilter<"Transaction"> | boolean | null
    cardType?: EnumCardTypeNullableFilter<"Transaction"> | $Enums.CardType | null
    source?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    categories?: CategoryCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type TransactionCreateWithoutSourceAccountInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTransactionsInput
    recurrence?: RecurrenceCreateNestedOneWithoutTransactionsInput
    targetAccount?: AccountCreateNestedOneWithoutTransactionsToInput
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutSourceAccountInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutSourceAccountInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutSourceAccountInput, TransactionUncheckedCreateWithoutSourceAccountInput>
  }

  export type TransactionCreateManySourceAccountInputEnvelope = {
    data: TransactionCreateManySourceAccountInput | TransactionCreateManySourceAccountInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutTargetAccountInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTransactionsInput
    recurrence?: RecurrenceCreateNestedOneWithoutTransactionsInput
    sourceAccount?: AccountCreateNestedOneWithoutTransactionsFromInput
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutTargetAccountInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutTargetAccountInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutTargetAccountInput, TransactionUncheckedCreateWithoutTargetAccountInput>
  }

  export type TransactionCreateManyTargetAccountInputEnvelope = {
    data: TransactionCreateManyTargetAccountInput | TransactionCreateManyTargetAccountInput[]
    skipDuplicates?: boolean
  }

  export type RecurrenceCreateWithoutSourceAccountInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutRecurrencesInput
    category?: CategoryCreateNestedOneWithoutRecurrencesInput
    targetAccount?: AccountCreateNestedOneWithoutRecurrencesToInput
    transactions?: TransactionCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceUncheckedCreateWithoutSourceAccountInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceCreateOrConnectWithoutSourceAccountInput = {
    where: RecurrenceWhereUniqueInput
    create: XOR<RecurrenceCreateWithoutSourceAccountInput, RecurrenceUncheckedCreateWithoutSourceAccountInput>
  }

  export type RecurrenceCreateManySourceAccountInputEnvelope = {
    data: RecurrenceCreateManySourceAccountInput | RecurrenceCreateManySourceAccountInput[]
    skipDuplicates?: boolean
  }

  export type RecurrenceCreateWithoutTargetAccountInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutRecurrencesInput
    category?: CategoryCreateNestedOneWithoutRecurrencesInput
    sourceAccount?: AccountCreateNestedOneWithoutRecurrencesFromInput
    transactions?: TransactionCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceUncheckedCreateWithoutTargetAccountInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    sourceAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceCreateOrConnectWithoutTargetAccountInput = {
    where: RecurrenceWhereUniqueInput
    create: XOR<RecurrenceCreateWithoutTargetAccountInput, RecurrenceUncheckedCreateWithoutTargetAccountInput>
  }

  export type RecurrenceCreateManyTargetAccountInputEnvelope = {
    data: RecurrenceCreateManyTargetAccountInput | RecurrenceCreateManyTargetAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: CategoryUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutSourceAccountInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutSourceAccountInput, TransactionUncheckedUpdateWithoutSourceAccountInput>
    create: XOR<TransactionCreateWithoutSourceAccountInput, TransactionUncheckedCreateWithoutSourceAccountInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutSourceAccountInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutSourceAccountInput, TransactionUncheckedUpdateWithoutSourceAccountInput>
  }

  export type TransactionUpdateManyWithWhereWithoutSourceAccountInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutSourceAccountInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutTargetAccountInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutTargetAccountInput, TransactionUncheckedUpdateWithoutTargetAccountInput>
    create: XOR<TransactionCreateWithoutTargetAccountInput, TransactionUncheckedCreateWithoutTargetAccountInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutTargetAccountInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutTargetAccountInput, TransactionUncheckedUpdateWithoutTargetAccountInput>
  }

  export type TransactionUpdateManyWithWhereWithoutTargetAccountInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTargetAccountInput>
  }

  export type RecurrenceUpsertWithWhereUniqueWithoutSourceAccountInput = {
    where: RecurrenceWhereUniqueInput
    update: XOR<RecurrenceUpdateWithoutSourceAccountInput, RecurrenceUncheckedUpdateWithoutSourceAccountInput>
    create: XOR<RecurrenceCreateWithoutSourceAccountInput, RecurrenceUncheckedCreateWithoutSourceAccountInput>
  }

  export type RecurrenceUpdateWithWhereUniqueWithoutSourceAccountInput = {
    where: RecurrenceWhereUniqueInput
    data: XOR<RecurrenceUpdateWithoutSourceAccountInput, RecurrenceUncheckedUpdateWithoutSourceAccountInput>
  }

  export type RecurrenceUpdateManyWithWhereWithoutSourceAccountInput = {
    where: RecurrenceScalarWhereInput
    data: XOR<RecurrenceUpdateManyMutationInput, RecurrenceUncheckedUpdateManyWithoutSourceAccountInput>
  }

  export type RecurrenceUpsertWithWhereUniqueWithoutTargetAccountInput = {
    where: RecurrenceWhereUniqueInput
    update: XOR<RecurrenceUpdateWithoutTargetAccountInput, RecurrenceUncheckedUpdateWithoutTargetAccountInput>
    create: XOR<RecurrenceCreateWithoutTargetAccountInput, RecurrenceUncheckedCreateWithoutTargetAccountInput>
  }

  export type RecurrenceUpdateWithWhereUniqueWithoutTargetAccountInput = {
    where: RecurrenceWhereUniqueInput
    data: XOR<RecurrenceUpdateWithoutTargetAccountInput, RecurrenceUncheckedUpdateWithoutTargetAccountInput>
  }

  export type RecurrenceUpdateManyWithWhereWithoutTargetAccountInput = {
    where: RecurrenceScalarWhereInput
    data: XOR<RecurrenceUpdateManyMutationInput, RecurrenceUncheckedUpdateManyWithoutTargetAccountInput>
  }

  export type UserCreateWithoutCategoriesInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoriesInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  export type TransactionCreateWithoutCategoryInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    recurrence?: RecurrenceCreateNestedOneWithoutTransactionsInput
    sourceAccount?: AccountCreateNestedOneWithoutTransactionsFromInput
    targetAccount?: AccountCreateNestedOneWithoutTransactionsToInput
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutCategoryInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput>
  }

  export type TransactionCreateManyCategoryInputEnvelope = {
    data: TransactionCreateManyCategoryInput | TransactionCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type RecurrenceCreateWithoutCategoryInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutRecurrencesInput
    sourceAccount?: AccountCreateNestedOneWithoutRecurrencesFromInput
    targetAccount?: AccountCreateNestedOneWithoutRecurrencesToInput
    transactions?: TransactionCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceUncheckedCreateWithoutCategoryInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    sourceAccountId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedCreateNestedManyWithoutRecurrenceInput
  }

  export type RecurrenceCreateOrConnectWithoutCategoryInput = {
    where: RecurrenceWhereUniqueInput
    create: XOR<RecurrenceCreateWithoutCategoryInput, RecurrenceUncheckedCreateWithoutCategoryInput>
  }

  export type RecurrenceCreateManyCategoryInputEnvelope = {
    data: RecurrenceCreateManyCategoryInput | RecurrenceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCategoriesInput = {
    update: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type UserUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCategoryInput, TransactionUncheckedUpdateWithoutCategoryInput>
    create: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCategoryInput, TransactionUncheckedUpdateWithoutCategoryInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCategoryInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutCategoryInput>
  }

  export type RecurrenceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: RecurrenceWhereUniqueInput
    update: XOR<RecurrenceUpdateWithoutCategoryInput, RecurrenceUncheckedUpdateWithoutCategoryInput>
    create: XOR<RecurrenceCreateWithoutCategoryInput, RecurrenceUncheckedCreateWithoutCategoryInput>
  }

  export type RecurrenceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: RecurrenceWhereUniqueInput
    data: XOR<RecurrenceUpdateWithoutCategoryInput, RecurrenceUncheckedUpdateWithoutCategoryInput>
  }

  export type RecurrenceUpdateManyWithWhereWithoutCategoryInput = {
    where: RecurrenceScalarWhereInput
    data: XOR<RecurrenceUpdateManyMutationInput, RecurrenceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutRecurrencesInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecurrencesInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecurrencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecurrencesInput, UserUncheckedCreateWithoutRecurrencesInput>
  }

  export type CategoryCreateWithoutRecurrencesInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutRecurrencesInput = {
    id?: string
    userId: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutRecurrencesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutRecurrencesInput, CategoryUncheckedCreateWithoutRecurrencesInput>
  }

  export type AccountCreateWithoutRecurrencesFromInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAccountsInput
    transactionsFrom?: TransactionCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionCreateNestedManyWithoutTargetAccountInput
    recurrencesTo?: RecurrenceCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountUncheckedCreateWithoutRecurrencesFromInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    transactionsFrom?: TransactionUncheckedCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionUncheckedCreateNestedManyWithoutTargetAccountInput
    recurrencesTo?: RecurrenceUncheckedCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountCreateOrConnectWithoutRecurrencesFromInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutRecurrencesFromInput, AccountUncheckedCreateWithoutRecurrencesFromInput>
  }

  export type AccountCreateWithoutRecurrencesToInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAccountsInput
    transactionsFrom?: TransactionCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceCreateNestedManyWithoutSourceAccountInput
  }

  export type AccountUncheckedCreateWithoutRecurrencesToInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    transactionsFrom?: TransactionUncheckedCreateNestedManyWithoutSourceAccountInput
    transactionsTo?: TransactionUncheckedCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceUncheckedCreateNestedManyWithoutSourceAccountInput
  }

  export type AccountCreateOrConnectWithoutRecurrencesToInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutRecurrencesToInput, AccountUncheckedCreateWithoutRecurrencesToInput>
  }

  export type TransactionCreateWithoutRecurrenceInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTransactionsInput
    sourceAccount?: AccountCreateNestedOneWithoutTransactionsFromInput
    targetAccount?: AccountCreateNestedOneWithoutTransactionsToInput
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutRecurrenceInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutRecurrenceInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutRecurrenceInput, TransactionUncheckedCreateWithoutRecurrenceInput>
  }

  export type TransactionCreateManyRecurrenceInputEnvelope = {
    data: TransactionCreateManyRecurrenceInput | TransactionCreateManyRecurrenceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRecurrencesInput = {
    update: XOR<UserUpdateWithoutRecurrencesInput, UserUncheckedUpdateWithoutRecurrencesInput>
    create: XOR<UserCreateWithoutRecurrencesInput, UserUncheckedCreateWithoutRecurrencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecurrencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecurrencesInput, UserUncheckedUpdateWithoutRecurrencesInput>
  }

  export type UserUpdateWithoutRecurrencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    categories?: CategoryUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecurrencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryUpsertWithoutRecurrencesInput = {
    update: XOR<CategoryUpdateWithoutRecurrencesInput, CategoryUncheckedUpdateWithoutRecurrencesInput>
    create: XOR<CategoryCreateWithoutRecurrencesInput, CategoryUncheckedCreateWithoutRecurrencesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutRecurrencesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutRecurrencesInput, CategoryUncheckedUpdateWithoutRecurrencesInput>
  }

  export type CategoryUpdateWithoutRecurrencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    transactions?: TransactionUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutRecurrencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type AccountUpsertWithoutRecurrencesFromInput = {
    update: XOR<AccountUpdateWithoutRecurrencesFromInput, AccountUncheckedUpdateWithoutRecurrencesFromInput>
    create: XOR<AccountCreateWithoutRecurrencesFromInput, AccountUncheckedCreateWithoutRecurrencesFromInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutRecurrencesFromInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutRecurrencesFromInput, AccountUncheckedUpdateWithoutRecurrencesFromInput>
  }

  export type AccountUpdateWithoutRecurrencesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    transactionsFrom?: TransactionUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUpdateManyWithoutTargetAccountNestedInput
    recurrencesTo?: RecurrenceUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutRecurrencesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactionsFrom?: TransactionUncheckedUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUncheckedUpdateManyWithoutTargetAccountNestedInput
    recurrencesTo?: RecurrenceUncheckedUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUpsertWithoutRecurrencesToInput = {
    update: XOR<AccountUpdateWithoutRecurrencesToInput, AccountUncheckedUpdateWithoutRecurrencesToInput>
    create: XOR<AccountCreateWithoutRecurrencesToInput, AccountUncheckedCreateWithoutRecurrencesToInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutRecurrencesToInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutRecurrencesToInput, AccountUncheckedUpdateWithoutRecurrencesToInput>
  }

  export type AccountUpdateWithoutRecurrencesToInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    transactionsFrom?: TransactionUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUpdateManyWithoutSourceAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutRecurrencesToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactionsFrom?: TransactionUncheckedUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUncheckedUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUncheckedUpdateManyWithoutSourceAccountNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutRecurrenceInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutRecurrenceInput, TransactionUncheckedUpdateWithoutRecurrenceInput>
    create: XOR<TransactionCreateWithoutRecurrenceInput, TransactionUncheckedCreateWithoutRecurrenceInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutRecurrenceInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutRecurrenceInput, TransactionUncheckedUpdateWithoutRecurrenceInput>
  }

  export type TransactionUpdateManyWithWhereWithoutRecurrenceInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutRecurrenceInput>
  }

  export type CategoryCreateWithoutTransactionsInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCategoriesInput
    recurrences?: RecurrenceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recurrences?: RecurrenceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutTransactionsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type RecurrenceCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutRecurrencesInput
    category?: CategoryCreateNestedOneWithoutRecurrencesInput
    sourceAccount?: AccountCreateNestedOneWithoutRecurrencesFromInput
    targetAccount?: AccountCreateNestedOneWithoutRecurrencesToInput
  }

  export type RecurrenceUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RecurrenceCreateOrConnectWithoutTransactionsInput = {
    where: RecurrenceWhereUniqueInput
    create: XOR<RecurrenceCreateWithoutTransactionsInput, RecurrenceUncheckedCreateWithoutTransactionsInput>
  }

  export type AccountCreateWithoutTransactionsFromInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAccountsInput
    transactionsTo?: TransactionCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountUncheckedCreateWithoutTransactionsFromInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    transactionsTo?: TransactionUncheckedCreateNestedManyWithoutTargetAccountInput
    recurrencesFrom?: RecurrenceUncheckedCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceUncheckedCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountCreateOrConnectWithoutTransactionsFromInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTransactionsFromInput, AccountUncheckedCreateWithoutTransactionsFromInput>
  }

  export type AccountCreateWithoutTransactionsToInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAccountsInput
    transactionsFrom?: TransactionCreateNestedManyWithoutSourceAccountInput
    recurrencesFrom?: RecurrenceCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountUncheckedCreateWithoutTransactionsToInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    transactionsFrom?: TransactionUncheckedCreateNestedManyWithoutSourceAccountInput
    recurrencesFrom?: RecurrenceUncheckedCreateNestedManyWithoutSourceAccountInput
    recurrencesTo?: RecurrenceUncheckedCreateNestedManyWithoutTargetAccountInput
  }

  export type AccountCreateOrConnectWithoutTransactionsToInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTransactionsToInput, AccountUncheckedCreateWithoutTransactionsToInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    email?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    recurrences?: RecurrenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type CategoryUpsertWithoutTransactionsInput = {
    update: XOR<CategoryUpdateWithoutTransactionsInput, CategoryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutTransactionsInput, CategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type CategoryUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    recurrences?: RecurrenceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recurrences?: RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type RecurrenceUpsertWithoutTransactionsInput = {
    update: XOR<RecurrenceUpdateWithoutTransactionsInput, RecurrenceUncheckedUpdateWithoutTransactionsInput>
    create: XOR<RecurrenceCreateWithoutTransactionsInput, RecurrenceUncheckedCreateWithoutTransactionsInput>
    where?: RecurrenceWhereInput
  }

  export type RecurrenceUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: RecurrenceWhereInput
    data: XOR<RecurrenceUpdateWithoutTransactionsInput, RecurrenceUncheckedUpdateWithoutTransactionsInput>
  }

  export type RecurrenceUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutRecurrencesNestedInput
    category?: CategoryUpdateOneWithoutRecurrencesNestedInput
    sourceAccount?: AccountUpdateOneWithoutRecurrencesFromNestedInput
    targetAccount?: AccountUpdateOneWithoutRecurrencesToNestedInput
  }

  export type RecurrenceUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AccountUpsertWithoutTransactionsFromInput = {
    update: XOR<AccountUpdateWithoutTransactionsFromInput, AccountUncheckedUpdateWithoutTransactionsFromInput>
    create: XOR<AccountCreateWithoutTransactionsFromInput, AccountUncheckedCreateWithoutTransactionsFromInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTransactionsFromInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTransactionsFromInput, AccountUncheckedUpdateWithoutTransactionsFromInput>
  }

  export type AccountUpdateWithoutTransactionsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    transactionsTo?: TransactionUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutTransactionsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactionsTo?: TransactionUncheckedUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUncheckedUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUncheckedUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUpsertWithoutTransactionsToInput = {
    update: XOR<AccountUpdateWithoutTransactionsToInput, AccountUncheckedUpdateWithoutTransactionsToInput>
    create: XOR<AccountCreateWithoutTransactionsToInput, AccountUncheckedCreateWithoutTransactionsToInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTransactionsToInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTransactionsToInput, AccountUncheckedUpdateWithoutTransactionsToInput>
  }

  export type AccountUpdateWithoutTransactionsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    transactionsFrom?: TransactionUpdateManyWithoutSourceAccountNestedInput
    recurrencesFrom?: RecurrenceUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutTransactionsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactionsFrom?: TransactionUncheckedUpdateManyWithoutSourceAccountNestedInput
    recurrencesFrom?: RecurrenceUncheckedUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUncheckedUpdateManyWithoutTargetAccountNestedInput
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    categories?: CategoryUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    recurrences?: RecurrenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    currency: $Enums.Currency
    balance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedByUserId?: string | null
    deletedAt?: Date | string | null
  }

  export type CategoryCreateManyUserInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecurrenceCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactionsFrom?: TransactionUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactionsFrom?: TransactionUncheckedUpdateManyWithoutSourceAccountNestedInput
    transactionsTo?: TransactionUncheckedUpdateManyWithoutTargetAccountNestedInput
    recurrencesFrom?: RecurrenceUncheckedUpdateManyWithoutSourceAccountNestedInput
    recurrencesTo?: RecurrenceUncheckedUpdateManyWithoutTargetAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutCategoryNestedInput
    recurrences?: RecurrenceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryNestedInput
    recurrences?: RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurrenceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    category?: CategoryUpdateOneWithoutRecurrencesNestedInput
    sourceAccount?: AccountUpdateOneWithoutRecurrencesFromNestedInput
    targetAccount?: AccountUpdateOneWithoutRecurrencesToNestedInput
    transactions?: TransactionUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTransactionsNestedInput
    recurrence?: RecurrenceUpdateOneWithoutTransactionsNestedInput
    sourceAccount?: AccountUpdateOneWithoutTransactionsFromNestedInput
    targetAccount?: AccountUpdateOneWithoutTransactionsToNestedInput
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManySourceAccountInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyTargetAccountInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecurrenceCreateManySourceAccountInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RecurrenceCreateManyTargetAccountInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    categoryId?: string | null
    sourceAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionUpdateWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTransactionsNestedInput
    recurrence?: RecurrenceUpdateOneWithoutTransactionsNestedInput
    targetAccount?: AccountUpdateOneWithoutTransactionsToNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutTargetAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTransactionsNestedInput
    recurrence?: RecurrenceUpdateOneWithoutTransactionsNestedInput
    sourceAccount?: AccountUpdateOneWithoutTransactionsFromNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutTargetAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutTargetAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurrenceUpdateWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutRecurrencesNestedInput
    category?: CategoryUpdateOneWithoutRecurrencesNestedInput
    targetAccount?: AccountUpdateOneWithoutRecurrencesToNestedInput
    transactions?: TransactionUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateManyWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RecurrenceUpdateWithoutTargetAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutRecurrencesNestedInput
    category?: CategoryUpdateOneWithoutRecurrencesNestedInput
    sourceAccount?: AccountUpdateOneWithoutRecurrencesFromNestedInput
    transactions?: TransactionUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateWithoutTargetAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateManyWithoutTargetAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionCreateManyCategoryInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrenceId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecurrenceCreateManyCategoryInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    frequency: $Enums.RecurrenceType
    totalParts?: number | null
    currentPart?: number
    startDate: Date | string
    nextDate?: Date | string | null
    endDate?: Date | string | null
    active?: boolean
    sourceAccountId?: string | null
    targetAccountId?: string | null
    isCardExpense?: boolean
    cardType?: $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recurrence?: RecurrenceUpdateOneWithoutTransactionsNestedInput
    sourceAccount?: AccountUpdateOneWithoutTransactionsFromNestedInput
    targetAccount?: AccountUpdateOneWithoutTransactionsToNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrenceId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecurrenceUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutRecurrencesNestedInput
    sourceAccount?: AccountUpdateOneWithoutRecurrencesFromNestedInput
    targetAccount?: AccountUpdateOneWithoutRecurrencesToNestedInput
    transactions?: TransactionUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    transactions?: TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput
  }

  export type RecurrenceUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    frequency?: EnumRecurrenceTypeFieldUpdateOperationsInput | $Enums.RecurrenceType
    totalParts?: NullableIntFieldUpdateOperationsInput | number | null
    currentPart?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isCardExpense?: BoolFieldUpdateOperationsInput | boolean
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionCreateManyRecurrenceInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    description?: string | null
    categoryId?: string | null
    sourceAccountId?: string | null
    targetAccountId?: string | null
    recurrencePartNumber?: number | null
    isBudgetedExpense?: boolean | null
    budgetCategory?: $Enums.BudgetCategory | null
    isCardExpense?: boolean | null
    cardType?: $Enums.CardType | null
    source?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutRecurrenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTransactionsNestedInput
    sourceAccount?: AccountUpdateOneWithoutTransactionsFromNestedInput
    targetAccount?: AccountUpdateOneWithoutTransactionsToNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutRecurrenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutRecurrenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    targetAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    recurrencePartNumber?: NullableIntFieldUpdateOperationsInput | number | null
    isBudgetedExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    budgetCategory?: NullableEnumBudgetCategoryFieldUpdateOperationsInput | $Enums.BudgetCategory | null
    isCardExpense?: NullableBoolFieldUpdateOperationsInput | boolean | null
    cardType?: NullableEnumCardTypeFieldUpdateOperationsInput | $Enums.CardType | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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