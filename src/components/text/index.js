'use strict'

import { uid } from '@crispcode/modux'
import { BaseComponent } from './../base-component'

import template from './template.html'
import './styles.scss'

export class ComponentText extends BaseComponent {
  get template () {
    return template
  }

  setup () {
    return {
      label: {
        default: '',
        attribute: 'data-label',
        update: ( value ) => {
          this.element.querySelector( '.topsmith-label' ).innerHTML = value
        }
      },
      name: {
        default: uid(),
        attribute: 'data-name',
        update: ( value ) => {
          // this.element.querySelector( 'label' ).setAttribute( 'for', value )
          this.element.querySelector( 'input' ).setAttribute( 'name', value )
        }
      },
      type: {
        default: 'text',
        attribute: 'data-type',
        update: ( value ) => {
          this.element.querySelector( 'input' ).setAttribute( 'type', value )
        }
      },
      value: {
        default: '',
        attribute: 'data-value',
        update: ( value ) => {
          this.element.querySelector( 'input' ).setAttribute( 'value', value )
        }
      },
      placeholder: {
        default: '',
        attribute: 'data-placeholder',
        update: ( value ) => {
          this.element.querySelector( 'input' ).setAttribute( 'placeholder', value )
        }
      },
      required: {
        default: false,
        attribute: 'data-required',
        update: ( value ) => {
          if ( value ) {
            this.element.querySelector( 'input' ).setAttribute( 'required', '' )
            // this.element.querySelector( 'label' ).classList.add( 'required' )
          } else {
            this.element.querySelector( 'input' ).removeAttribute( 'required' )
            // this.element.querySelector( 'label' ).classList.remove( 'required' )
          }
        }
      },
      error: {
        default: false,
        attribute: 'data-error',
        update: ( value ) => {
          if ( value ) {
            this.element.querySelector( 'input' ).classList.add( 'error' )
            this.element.querySelector( '.topsmith-field' ).classList.add( 'error' )
            this.element.querySelector( '.topsmith-field-error' ).innerHTML = value
          } else {
            this.element.querySelector( 'input' ).classList.remove( 'error' )
            this.element.querySelector( '.topsmith-field' ).classList.remove( 'error' )
            this.element.querySelector( '.topsmith-field-error' ).innerHTML = ''
          }
        }
      }
    }
  }
}
