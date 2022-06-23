'use strict'

import { Component, loop } from '@crispcode/modux'

export class BaseComponent extends Component {
  setup () {
    return {}
  }

  init () {
    this._parameters = this.setup()

    // Build the component with the set parameters
    loop( this._parameters, ( config ) => {
      let value = this.parent.getAttribute( config.attribute )
      value = ( value !== null && value !== undefined ) ? value : config.default
      if ( typeof config.parse === 'function' ) {
        value = config.parse( value )
      }
      config.value = value
      if ( typeof config.update === 'function' ) {
        config.update( value )
      }
    } )
  }

  set ( name, value ) {
    let config = this._parameters[ name ]
    let oldValue = config.value
    if ( typeof config.parse === 'function' ) {
      value = config.parse( value )
    }
    config.value = value
    if ( typeof config.update === 'function' ) {
      config.update( value, oldValue )
    }
  }

  get ( name ) {
    return this._parameters[ name ].value
  }
}
