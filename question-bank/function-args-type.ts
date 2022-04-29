interface Todo {
	length: number
}

interface Todo1 {
	length1: number
}

interface Todo2 {
	length2: number
}

type merge = Todo & Todo1 & Todo2
// interface merge extends Todo, Todo1, Todo2 {}

function fn<Type extends merge> (arg: Type) {
  console.log(arg.length)
  console.log(arg.length1)
  console.log(arg.length2)
}
