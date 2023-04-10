'use strict'

import { topsmith, ComponentCalendar, ComponentClock, ComponentDatatable, ComponentHtmlEditor } from './../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class PageComponents extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/components$/i
  }

  static get settings () {
    return {
      size: 'x3'
    }
  }

  execute () {
    topsmith.registerComponent( ComponentCalendar )
    topsmith.registerComponent( ComponentClock )
    topsmith.registerComponent( ComponentDatatable )
    topsmith.registerComponent( ComponentHtmlEditor )
  }
}
