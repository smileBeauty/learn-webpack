import { define, observable, action, autorun, batch } from '@formily/reactive'

class DomainModel {
    deep = { aa: 1 }
    shallow = {}
    box = 0
    ref = ''

    constructor() {
        console.log('this', this);
        define(this, {
            deep: observable,
            shallow: observable.shallow,
            box: observable.box,
            ref: observable.ref,
            computed: observable.computed,
            action,
            batch
        })
    }

    get computed() {
        return this.deep.aa + this.box.get()
    }
    action(aa, box) {
        this.deep.aa = aa
        this.box.set(box)
    }
    batch(aa, box) {
        this.deep.aa = aa + 1
        this.box.set(box + 11)
    }
}

const model = new DomainModel()
console.log('model', model)

autorun(() => {
    console.log(model.computed)
})

model.action(1, 2)
model.action(1, 2) //重复调用不会重复响应
model.action(3, 4)
model.batch(1, 0)