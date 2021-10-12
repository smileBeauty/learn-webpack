import { observable, autorun, batch, action } from '@formily/reactive'

const obs = observable({})

// const handler = () => {
//     console.log('handler');
//     obs.aa = 123;
//     obs.bb = 321;
// }

// const handler2 = () => {
//     console.log('handler2');
//     obs.cc = 'cc'
//     obs.dd = 'dd'
// }

const handler = action(() => {
    console.log('handler');
    obs.aa = 123;
    obs.bb = 321;
})

const handler2 = action(() => {
    console.log('handler2');
    obs.cc = 'cc'
    obs.dd = 'dd'
})

const toDispose = autorun(() => {
    // console.log('obs' + new Date().getTime(), obs)
    console.log(obs.aa, obs.bb, obs.cc, obs.dd)
})

// setTimeout(() => {
//     batch(handler)
// }, 3000)

// setTimeout(() => {
//     batch(handler2)
// }, 6000)

setTimeout(() => {
    handler()
    toDispose()
}, 3000)

setTimeout(() => {
    handler2()
}, 6000)