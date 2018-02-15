const interval = time => cb => setInterval(cb, time)
const map = iter => cb => v => cb(iter(v))

const everySecond = interval(1000)
const mapTo10 = map(() => 10)

const compose = (...fns) => fns.reduceRight((b, a) => a(b))

compose(
  everySecond,
  mapTo10,
  console.log
)
