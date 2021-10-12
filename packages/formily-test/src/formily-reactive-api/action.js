import { observable, action, autorun } from '@formily/reactive'

const obs = observable({})

autorun(() => {
    console.log(obs.aa, obs.bb);
})
const method = action(() => {
    obs.aa = 123
    obs.bb = 321
})

method()