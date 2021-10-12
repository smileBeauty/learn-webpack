import { observable, autorun } from '@formily/reactive'

let obj = { age: 12, addres: 'liaoning' };

const ref = observable.ref(obj)

console.log('ref.value === obj', ref.value === obj)

obj.age = 18

autorun(() => {
    console.log(ref.value)
})

ref.value = Object.assign({}, ref.value, { addres: 'beijing' })