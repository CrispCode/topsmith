'use strict'

import { SectionBase } from './../base.js'

import template from './template.html'
import './styles.scss'

export class SectionComponents extends SectionBase {
  get template () {
    return template
  }
}
