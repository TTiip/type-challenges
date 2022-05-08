import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y', 1, Symbol(123)] as const

// const let --> js 世界
// type interface  --> type 世界
// typeof 将 js世界 转化成 type世界

// as const
// 使用后直接变成 const 固定变量 不可以修改，类似于 js 中的 const

function tupleToObject (arr) {
  const obj = {}
  arr.map(key => {
    obj[key] = key
  })
  return {}
}

// keyof 可以获取对象的属性名 以及 数组索引
// keyof array --> index
// keyof object --> key

// 1.返回一个对象
// 2.遍历一个数组 T[number] 去遍历

// 下方的 T extends readonly (string | number | symbol)[] 类型约束是为了限制 T 只能是 readonly (string | number | symbol)[]
// 配合 结果匹配时候传入的 typeof tuple 为 readonly (string | number | symbol)[]

// type 对象的 key 值 有且仅会出现 string | number | symbol 这三种类型。
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P
}

type res = TupleToObject<typeof tuple>

type cases = [
  Expect<Equal<res, {
    tesla: 'tesla'
    'model 3': 'model 3'
    'model X': 'model X'
    'model Y': 'model Y'
    1: 1
    [symbolKey: symbol]: symbol
  }>>
]

// '@ts-expect-error' 是期望下面的语句 抛出错误
// 如果下方语句没有抛出错误 则 @ts-expect-error 这行会抛出错误

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>
