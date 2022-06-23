'use strict'

import { html } from '@crispcode/modux'
import { topsmith } from './../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class PageHome extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/$/i
  }

  static get settings () {
    return {
      size: 'x2'
    }
  }

  execute () {
    topsmith.popup( html( '<div>hello</div>' ) )
  }
}
