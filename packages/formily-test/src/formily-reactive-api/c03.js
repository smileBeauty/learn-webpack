import { observable, autorun } from '@formily/reactive'

const obs = observable.shallow({
    aa: {
        bb: 111,
    },
})

autorun(() => {
    console.log(obs.aa.bb)
})

obs.aa.bb = 222 // 不会响应
obs.aa = { bb: 333 } // 可以响应