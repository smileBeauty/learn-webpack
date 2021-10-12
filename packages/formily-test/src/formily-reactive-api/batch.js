import { observable, autorun, batch } from '@formily/reactive'

const obs = observable({})

autorun(() => {
    console.log(obs.aa, obs.bb, obs.cc, obs.dd)
})

batch(() => {
    batch.scope(() => {
        obs.aa = 123
    })
    batch.scope(() => {
        obs.cc = 'ccccc'
    })
    obs.bb = 321
    obs.dd = 'dddd'
})