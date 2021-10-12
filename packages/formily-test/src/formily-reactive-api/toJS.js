import { observable, autorun, toJS } from '@formily/reactive'

const obs = observable({
    aa: {
        bb: {
            cc: 123,
        },
    },
})

const js = toJS(obs)

autorun(() => {
    console.log(js.aa.bb.cc) //变化时不会触发
})

js.aa.bb.cc = 321