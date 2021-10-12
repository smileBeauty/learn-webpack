import { observable, autorun } from '@formily/reactive'

let obj = { age: 12, addres: 'liaoning' };

const box = observable.box(obj)

console.log('box', box);

autorun(() => {
    console.log(box.get())
})

box.age = 18

console.log('box2', box);

obj.addres = 'beijing';

console.log('obj', obj);
