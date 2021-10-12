import { observable, autorun } from '@formily/reactive'

const obs = observable({
    aa: {
        bb: 123,
    },
})

autorun(() => {
    console.log(obs.aa.bb)
})

obs.aa.bb = 321