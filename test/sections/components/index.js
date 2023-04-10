'use strict'

import { topsmith } from './../../../src/app.js'

import template from './template.html'
import './styles.scss'

export class SectionComponents extends topsmith.classes.Section {
  get template () {
    return template
  }
}
