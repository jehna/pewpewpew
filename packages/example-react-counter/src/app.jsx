import React from 'react'
import { createStream, throttle, map } from '@pewpewpew/core'
import { bind } from '@pewpewpew/react'

function MyCounter({ increment, incrementThrottled, value }) {
  return (
    <div>
      <button type="button" onClick={() => increment(value)}>
        Add one
      </button>
      <button type="button" onClick={() => incrementThrottled(value)}>
        Add one (throttled)
      </button>
      <div>Value: {value}</div>
    </div>
  )
}

function mapSetStateToProps(setState) {
  return {
    increment: value => setState({ value: value + 1 }),
    incrementThrottled: createStream(
      map(value => ({ value: value + 1 })),
      throttle(1000),
      setState
    )
  }
}

export default bind(mapSetStateToProps, { value: 0 })(MyCounter)
