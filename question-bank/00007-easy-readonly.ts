import type { Equal, Expect } from '@type-challenges/utils'

interface Todo1 {
	title: string
	description: string
	completed: boolean
	meta: {
		author: string
	}
}

// js
// 1.返回一个对象
// 2.遍历对象的所有属性
// 3.将属性名 加上 readonly 关键字
// 4.通过 key 获取 对象 obj 的值
function readonly (obj: any) {
  const result = {}

  for (const key in obj) {
    result[`readonly ${key}`] = obj[key]
  }
  return result
}

type MyReadonly<T> = {
	readonly [key in keyof T]: T[key]
}

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>
]
