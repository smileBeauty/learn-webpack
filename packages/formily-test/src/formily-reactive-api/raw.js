import { raw, observable } from '@formily/reactive'

const obs = observable.deep({})

obs.aa = { bb: 123, cc: { dd: 'ddd' } }

console.log('raw(obs)', raw(obs))
console.log('raw(obs.aa)', raw(obs.aa))
console.log('raw(obs.aa.cc)', raw(obs.aa.cc.dd))