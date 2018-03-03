const identity = v => v

export const map = iter => cb => v => cb(iter(v))

export const filter = iter => cb => v => iter(v) && cb(v)

const prop = (value, prop) =>
  value && value.hasOwnProperty(prop) ? value[prop] : undefined

export const path = steps => map(item => steps.reduce(prop, item))

function isAsync(fn) {
  return fn.constructor.name === 'AsyncFunction'
}

export const compose = (...fns) => value =>
  fns.reduceRight((b, a) => (isAsync(a) ? v => a(v).then(b) : a(b)), value)

export const debounce = time => {
  let timeout
  return cb => v => {
    clearTimeout(timeout)
    timeout = setTimeout(() => cb(v), time)
  }
}

export const throttle = time => {
  let canFire = true
  return cb => v => {
    if (!canFire) return
    cb(v)
    canFire = false
    setTimeout(() => {
      canFire = true
    }, time)
  }
}

export const tap = tapper => cb => v => {
  tapper(v)
  cb(v)
}

export const createStream = (...args) => value =>
  compose(cb => cb(value), ...args)(identity)
