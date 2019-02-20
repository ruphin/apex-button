/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Goffert van Gool
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { html, render } from '../lit-html/lit-html.js';
import '../../@apex-elements/fonts/fonts.js';

const style = html`
  <style>
    :host {
      outline: none;
      cursor: default;
      user-select: none;
      vertical-align: bottom;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      font-family: sans-serif;
      font-weight: bold;
      font-size: 39px;
      color: rgba(240, 240, 240, 1);
      height: 112px;
      width: 384px;
      text-transform: uppercase;
      font-family: 'TT Squares Condensed', sans-serif;
      font-weight: normal;
      transition: box-shadow 0.3s;
      box-shadow: inset 0px 0px 0px 2px rgba(240, 240, 240, 0.8);
    }

    :host([topbar]) {
      font-weight: bold;
    }

    :host([topbar]) #topBar {
      box-sizing: border-box;
      height: 0px;
      width: 190px;
      border-top: 11px solid white;
      border-left: 11px solid rgba(0, 0, 0, 0);
      border-right: 11px solid rgba(0, 0, 0, 0);
      position: absolute;
      top: 1px;
      left: 50%;
      margin-left: -95px;
      transition: border-top 0.3s, 0.2s;
    }

    :host(:hover),
    :host(:focus) {
      box-shadow: inset 0px 0px 0px 4px rgba(255, 78, 29, 1);
    }

    :host([topbar]:hover) #topBar,
    :host([topbar]:focus) #topBar {
      border-top: 11px solid #ff4e1d;
    }

    :host([cta]) #bottomBar {
      height: 14px;
      width: 100%;
      background: #ff4e1d;
      position: absolute;
      bottom: 0px;
      left: 0px;
    }

    #backgroundGlow {
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(200, 200, 200, 1), rgba(200, 200, 200, 0.8) 15%, rgba(200, 200, 200, 0.2) 48%, transparent 60%),
        rgba(40, 40, 40, 0.8);
      opacity: 0.6;
    }
    :host([cta]) #backgroundGlow {
      background: linear-gradient(to top, rgba(255, 78, 29, 1), rgba(255, 78, 29, 0.8) 15%, rgba(255, 78, 29, 0.2) 48%, transparent 60%), rgba(40, 40, 40, 0.8);
    }

    :host(:hover) #backgroundGlow,
    :host(:focus) #backgroundGlow,
    :host([cta]:hover) #backgroundGlow,
    :host([cta]:focus) #backgroundGlow {
      background: linear-gradient(to top, rgba(255, 78, 29, 1), rgba(255, 78, 29, 0.8) 15%, rgba(255, 78, 29, 0.2) 48%, transparent 60%),
        linear-gradient(to top, rgba(255, 78, 29, 1), rgba(255, 78, 29, 0.2) 25px, transparent 35px),
        linear-gradient(to left, rgba(255, 78, 29, 1), rgba(255, 78, 29, 0.2) 25px, transparent 35px),
        linear-gradient(to bottom, rgba(255, 78, 29, 1), rgba(255, 78, 29, 0.2) 25px, transparent 35px),
        linear-gradient(to right, rgba(255, 78, 29, 1), rgba(255, 78, 29, 0.2) 25px, transparent 35px), rgba(40, 40, 40, 0.8);
    }
    ::slotted(button) {
      display: inline;
      border: none;
      outline: none;
      background: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      text-transform: inherit;
      font-weight: inherit;
    }
  </style>
`;

class ApexButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.tabIndex = 0;
    const button = Array.from(this.childNodes).find(node => node.tagName == 'BUTTON');
    if (button) {
      button.tabIndex = -1;
      this.delegateClicks(button);
    }

    render(
      html`
        ${style}
        <div id="topBar"></div>
        <div id="bottomBar"></div>
        <div id="backgroundGlow"></div>
        <slot></slot>
      `,
      this.shadowRoot
    );
  }
  delegateClicks(button) {
    this.addEventListener('click', () => {
      button.click();
    });
  }
}

customElements.define('apex-button', ApexButton);
