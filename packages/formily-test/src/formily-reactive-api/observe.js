import { observable, observe } from '@formily/reactive'

const obs = observable({
    aa: 11,
})

const dispose = observe(obs, (change) => {
    console.log(change)
})

obs.aa = 22
obs.bb = 33
delete obs.bb

dispose()