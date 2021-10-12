import { observable, autorun } from '@formily/reactive'

let obj = {
    aa: 11,
    bb: 22,
}

const obs = observable(obj)

const computed = observable.computed(() => obs.aa + obs.bb)

autorun(() => {
    console.log(computed.value)
})

obs.aa = 33