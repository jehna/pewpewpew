import React, { Component } from 'react'

export function bind(mapSetStateToProps = () => ({}), initialState = {}) {
  return TargetComponent =>
    class extends Component {
      constructor(props) {
        super(props)
        this.state = initialState

        const setState = async v =>
          new Promise(resolve => this.setState(v, () => resolve(v)))
        this.stateSetters = mapSetStateToProps(setState)
      }

      render() {
        return React.createElement(
          TargetComponent,
          Object.assign({}, this.props, this.state, this.stateSetters)
        )
      }
    }
}
