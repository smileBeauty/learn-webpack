import { model, autorun } from '@formily/reactive'

const obs = model({
    aa: 1,
    bb: 2,
    get cc() {
        return this.aa + this.bb
    },
    update(aa, bb) {
        // this.cc = aa + bb
        console.log('this', this);
        this.aa = aa
        this.bb = bb
    },
})

console.log('obs', obs);

autorun(() => {
    console.log(obs.cc)
})

obs.aa = 3

obs.update(4, 6)