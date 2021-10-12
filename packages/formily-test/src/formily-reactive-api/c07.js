import { observable, autorun } from '@formily/reactive'

const obs1 = observable({
    aa: 0,
})

let obj = { age: 12 }

const dispose = autorun(() => {
    const obs2 = autorun.memo(() => {
        console.log(11);
        // return observable({
        //     bb: 0,
        // })
        return {
            bb: '123'
        }
    }, [obj])

    console.log('obs2', obs2)
    console.log('obs1.aa', obs1.aa)
})

obs1.aa++
obs1.aa++
obj = { age: 18 };
obs1.aa++


dispose()