import React, { Component } from 'react'

export function bind(mapStateToProps, mapSetStateToProps, initialState = {}) {
  return TargetComponent =>
    class extends Component {
      constructor(props) {
        super(props)
        this.state = initialState
      }

      render() {
        const { state } = this
        const setState = async v =>
          new Promise(resolve => this.setState(v, () => resolve(v)))

        return React.createElement(TargetComponent, {
          ...(mapStateToProps ? mapStateToProps(state) : {}),
          ...(mapSetStateToProps ? mapSetStateToProps(setState) : {})
        })
      }
    }
}
