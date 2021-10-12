import { observable, Tracker, isObservable, isAnnotation, isSupportObservable } from '@formily/reactive'

// isObservable 判断某个对象是否是 observable 对象
// isAnnotation 判断某个对象是否是 Annotation
// isSupportObservable 判断某个对象是否可以被 observable

const obs = observable({
    aa: 11,
})

const view = () => {
    console.log(obs.aa)
}

const tracker = new Tracker(() => {
    tracker.track(view)
})

tracker.track(view)

obs.aa = 22
obs.aa = 33

tracker.dispose()