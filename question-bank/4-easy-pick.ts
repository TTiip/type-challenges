import type { Equal, Expect } from '@type-challenges/utils'

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

// 1.返回一个对象
// 2.遍历map
// 3.判断key是否在todoList中
// 4.如果在，则添加到picked中

// const MyPick = (todoList, keys) => {
//   const picked = {}
//   keys.map(key => {
//     if (key in todoList) {
//       picked[key] = todoList[key]
//     }
//   })
//   return picked
// }

type MyPick<T, K extends keyof T> = {
	[key in K]: T[key]
}

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
]
