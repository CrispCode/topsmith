'use strict'

import { Component, loop, Url } from '@crispcode/modux'

export class Section extends Component {
  onStateChange ( url ) {
    url = new Url( url )
    let element = this.element.querySelector( 'a[data-modux-link][href="' + url.path + '"]' )
    loop( this.element.querySelectorAll( 'a[data-modux-link]' ), ( other ) => {
      if ( element === other ) {
        element.classList.add( 'active' )
      } else {
        other.classList.remove( 'active' )
      }
    } )
  }

  execute () {
    loop( this.element.querySelectorAll( 'a[data-modux-link]' ), ( link ) => {
      link.addEventListener( 'click', () => {
        this.store.set( '#.side.open', false )
      } )
    } )
    this.onStateChange()
  }
}
