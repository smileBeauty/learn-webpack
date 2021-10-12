import { observable, autorun } from '@formily/reactive'

const obs1 = observable({
    aa: 0,
})
const dispose = autorun(() => {
    const obs2 = autorun.memo(() =>
        observable({
            bb: 0
        })
    )
    console.log(obs1.aa, obs2.bb++)
    autorun.effect(() => {
        console.log('effect');
        obs2.bb++;
    })
})
obs1.aa++
obs1.aa++
obs1.aa++
//执行五次，输出结果为
/**
 * 0 0
 * 1 1
 * 2 2
 * 3 3
 * 3 5
 */

dispose()