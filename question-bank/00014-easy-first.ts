import type { Equal, Expect } from '@type-challenges/utils'

// 知识点：
// 1.extends 的条件判断
// 2.获取 tuple 的 length 属性
// 3.extends union 判断
// 4.inter 的使用

// 如果是一个空数组的话，获取的数组第一个元素是 undefined

function fitst (arr) {
  // arr 是不是一个空数组 是的话 返回 never
  const [first, ...reset] = arr
  if (first === 0) {
    return 'never'
  }
  return first
}

// 写法一：
// 'T extends [] ? never: T[0]'
// 这里的 'T extends []' 的意思是 判断T是不是一个空数组

// type First<T extends any[]> = T extends [] ? never: T[0]

// 写法二：
// 'T['length'] extends 0 ? never: T[0]'
// 这里的 'T['length'] extends 0' 的意思是 判断T的长度是不是0，从而判断T是不是一个空数组
// type First<T extends any[]> = T['length'] extends 0 ? never: T[0]

// 写法三：
// 'T[0] extends T[number] ? T[0]: never'
// 这里的 'T[0] extends T[number]' 的意思是 判断T的第一个元素在不在T中
// 这里的 'T[0]' 的意思是 T的第一个元素 数组为空时 返回 undefined
// 这里的 'T[number]' 的意思是 T 元素的 union 类型 [1, 2, 3] ---> 1|2|3
// type First<T extends any[]> = T[0] extends T[number] ? T[0]: never

// 写法四：
// 'T extends [infer First, ...infer Rest] ? First : never'
// 这里的 'T extends [infer First, ...infer Rest]' 的意思是 使用 infer 关键字 将数组中的变量自动推断成对应的变量
// [1, 2, 3, 4, 5] ---->  [infer aa, infer bb, infer cc,...infer Rest] ---> aa = 1, bb = 2, cc = 3, Rest = [4, 5]
// T extends [infer First, ...infer Rest] ? First : never --> 如果 First 存在 则直接返回 First 否则返回 never
type First<T extends any[]> = T extends [infer First, ...infer Rest] ? First : never

type t1 = First<[[4, 5], 1, 2, 3 ]>

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>
]
