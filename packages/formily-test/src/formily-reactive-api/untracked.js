import { observable, autorun, untracked } from '@formily/reactive'

const obs = observable({
    aa: 11,
})

autorun(() => {
    console.log(untracked(() => obs.aa)) //变化时不会触发
})

obs.aa = 22