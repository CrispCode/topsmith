'use strict'

import { topsmith } from './../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class SectionProjects extends topsmith.classes.Section {
  get template () {
    return template
  }
}
