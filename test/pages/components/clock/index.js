'use strict'

import { topsmith, ComponentClock } from './../../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class PageClock extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/components\/clock$/i
  }

  static get settings () {
    return {
      size: 'x3'
    }
  }

  execute () {
    topsmith.registerComponent( ComponentClock )
  }
}
