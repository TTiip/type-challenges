/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

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

// 下方的 T extends readonly string[] 类型约束是为了限制 T 只能是 readonly string[]
// 配合 结果匹配时候传入的 typeof tuple 为 readonly string[]

type TupleToObject<T extends readonly string[]> = {
  [key in T[number]]: key
}

type res = TupleToObject<typeof tuple>

type cases = [
  Expect<Equal<res, {
    tesla: 'tesla'
    'model 3': 'model 3'
    'model X': 'model X'
    'model Y': 'model Y'
  }>>
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>
