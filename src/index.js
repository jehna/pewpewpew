const interval = (time, cb) => setInterval(cb, time)
const next10 = (from, cb) => {
  [...Array(10).keys()].map(i => i + from).forEach(n => cb(n))
}

const everySecond = interval.bind(null, 1000)

const map = iter => cb => v => cb(iter(v))
const filter = iter => cb => v => iter(v) && cb(v)
const compose = (...fns) => fns.reduceRight((b, a) => a(b))
const debounce = time => {
  let timeout
  return cb => v => {
    clearTimeout(timeout)
    timeout = setTimeout(() => cb(v), time)
  }
}
const throttle = time => {
	let canFire = true
  return cb => v => {
  	if (!canFire) return
    cb(v)
    canFire = false
		setTimeout(() => { canFire = true }, time)
  }
}

compose(
  next10.bind(null, 5),
  map(x => x + 10),
  filter(x => x % 2 === 0),
  console.log
)
