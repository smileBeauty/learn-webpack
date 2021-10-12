import { observable, autorun, markObservable } from '@formily/reactive'

class A {
    property = ''

    toJSON() { }
}

const a = observable(new A())

autorun(() => {
    console.log('a', a.property) //property变化时不会被触发，因为A实例中有toJSON方法
})

a.property = 123

//--------------------------------------------

const b = observable(markObservable(new A())) //实例级标记，只对当前实例生效

autorun(() => {
    console.log('b', b.property) //property变化时可以被触发，因为已被标记observable
})

b.property = 123

//--------------------------------------------

markObservable(A) //类级标记，那么所有实例都会生效

const c = observable(new A())

autorun(() => {
    console.log('c', c.property) //property变化时可以被触发，因为已被标记observable
})

c.property = 123