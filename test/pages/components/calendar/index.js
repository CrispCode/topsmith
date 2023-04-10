'use strict'

import { topsmith, ComponentCalendar } from './../../../../src/app.js'

import template from './template.html'
import './styles.scss'

export class PageCalendar extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/components\/calendar$/i
  }

  static get settings () {
    return {
      size: 'x3'
    }
  }

  execute () {
    topsmith.registerComponent( ComponentCalendar )
  }
}
