'use strict'

import { topsmith, ComponentDatatable } from './../../../../src/app.js'

import template from './template.html'
import './styles.scss'

export class PageDatatable extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/components\/datatable$/i
  }

  static get settings () {
    return {
      size: 'x3'
    }
  }

  execute () {
    topsmith.registerComponent( ComponentDatatable )
  }
}
