import { observable, reaction, batch } from '@formily/reactive'

const obs = observable({
    aa: 1,
    bb: 2,
})

const dispose = reaction(() => {
    console.log('tracker');
    console.log('obs.aa', obs.aa);
    console.log('obs.bb', obs.bb);
    return obs.aa + obs.bb
}, (newValue, oldValue) => {
    console.log('newValue', newValue);
    console.log('oldValue', oldValue);
})

batch(() => {
    //不会触发，因为obs.aa + obs.bb值没变
    obs.aa = 2
    obs.bb = 1
})

obs.aa = 4

dispose()