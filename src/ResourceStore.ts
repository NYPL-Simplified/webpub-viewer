// const Dexie  = require('dexie');

// namespace Dexie {
//     export interface PromiseExtended<T=any> extends Promise<T> {
//         then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseExtended<TResult1 | TResult2>;
//         catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): PromiseExtended<T | TResult>;
//         catch<TResult = never>(ErrorConstructor: Function, onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): PromiseExtended<T | TResult>;
//         catch<TResult = never>(errorName: string, onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): PromiseExtended<T | TResult>;
//         finally<U>(onFinally?: () => U | PromiseLike<U>): PromiseExtended<T>;
//         timeout (ms: number, msg?: string): PromiseExtended<T>;
//       }


//     export interface Table<T=any> {
//         db: any;
//         name: any;
//         schema: any;
//         hook: any;
//         core: any;

//         get(key: any): PromiseExtended<T | undefined>;
//         put(item: T, key?: any): PromiseExtended<any>;
//       }
// }
// interface IBookResource {
//     href: string;
//     localHref: string;
//     data: Blob;
// }

// // The Resource Store holds data in IndexDBStorage
// // This should be used for data that cannot be converted into a string, 
// // such as encrypted data buffers
// export default class ResourceStore extends Dexie {
//     BookResource: Dexie.Table<IBookResource>

//     constructor() {
//         super('BookDb');
//     }
// }