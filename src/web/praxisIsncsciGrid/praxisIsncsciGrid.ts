import {
  MotorLevel,
  MotorLevels,
  SensoryLevel,
  SensoryLevels,
} from '@core/domain';

import '@web/praxisIsncsciCell';

/**
 * @tagname praxis-isncsci-grid
 */
export class PraxisIsncsciGrid extends HTMLElement {
  public static get is(): string {
    return 'praxis-isncsci-grid';
  }

  public static get observedAttributes(): string[] {
    return ['left', 'highlighted-cells'];
  }

  private template: string = `
    <style>
      :host {
        column-gap: var(--cell-gap);
        display: grid;
        grid-template-columns: repeat(4, var(--cell-width, 2.5rem));
        grid-template-areas:
          'side side side side'
          '. mh lth pph'
          'label motor light-touch pin-prick';
        grid-template-rows: 1.625rem 1.5rem repeat(28, var(--cell-height, 2.375rem));
        row-gap: var(--cell-gap, 0);
      }

      :host([left]) {
        grid-template-areas:
          'side side side side'
          'lth pph mh .'
          'light-touch pin-prick motor label';
      }

      :host([left]) .label {
        padding-left: 12px;
        padding-right: 0;
      }

      :host([labels-hidden]) .label {
        display: none;
      }

      .header {
        font-weight: lighter;
        margin: 0;
        padding: 0;
        text-align: center;
      }

      .header.side {
        grid-column: side;
      }

      .header.motor {
        grid-column: mh;
      }

      .header.light-touch {
        grid-column: lth;
      }

      .header.pin-prick {
        grid-column: pph;
      }

      .label {
        align-items: center;
        display: flex;
        grid-column: label;
        justify-content: right;
        padding-right: 12px;
      }

      [motor] {
        grid-column: motor;
      }

      [light-touch] {
        grid-column: light-touch;
      }

      [pin-prick] {
        grid-column: pin-prick;
      }
    </style>
  `;

  public constructor() {
    super();

    this.attachShadow({mode: 'open'});
  }

  public connectedCallback() {
    this.updateView(this.hasAttribute('left'));
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'left') {
      console.log('ToDo: Dynamically change side');
      return;
    }

    if (name === 'highlighted-cells') {
      this.updateHighlights(oldValue, newValue);
      return;
    }
  }

  private getCell(
    side: string,
    observationType: string,
    level: SensoryLevel,
  ): string {
    if (
      observationType === 'motor' &&
      !MotorLevels.includes(level as MotorLevel)
    ) {
      return '';
    }

    const slug = `${side}-${observationType}-${level.toLowerCase()}`;
    const value = this.getAttribute(slug);
    return `<praxis-isncsci-cell data-observation="${slug}" ${observationType}>${
      value ?? ''
    }</praxis-isncsci-cell>`;
  }

  private getHeader(left: boolean) {
    return left
      ? `
          <h3 class="header side">Left</h3>
          <div class="header light-touch">LT</div><div class="header pin-prick">PP</div><div class="header motor">M</div>
        `
      : `
          <h3 class="header side">Right</h3>
          <div class="header motor">M</div><div class="header light-touch">LT</div><div class="header pin-prick">PP</div>
        `;
  }

  private getLevels(left: boolean) {
    let levels = '';

    SensoryLevels.forEach((level) => {
      levels += left
        ? `
            ${this.getCell('left', 'light-touch', level)}
            ${this.getCell('left', 'pin-prick', level)}
            ${this.getCell('left', 'motor', level)}

            <div class="label">${level}</div>
          `
        : `
            <div class="label">${level}</div>
            ${this.getCell('right', 'motor', level)}
            ${this.getCell('right', 'light-touch', level)}
            ${this.getCell('right', 'pin-prick', level)}
          `;
    });

    return levels;
  }

  private updateView(left: boolean) {
    if (!this.shadowRoot) {
      throw new Error(
        `${PraxisIsncsciGrid.is} :: updateView :: No shadow root available`,
      );
    }

    this.shadowRoot.innerHTML = `
      ${this.template}
      ${this.getHeader(left)}
      ${this.getLevels(left)}
    `;
  }

  private updateHighlights(oldValue: string, newValue: string) {
    if (!this.shadowRoot) {
      throw new Error('No shadow root available');
    }

    this.shadowRoot
      .querySelectorAll('praxis-isncsci-cell[highlighted]')
      .forEach((cell) => cell.removeAttribute('highlighted'));
    const attribute = newValue
      .split('|')
      .map((observation) => `[data-observation="${observation}"]`)
      .join(',');
    console.log(attribute);
    console.log(this.shadowRoot.querySelectorAll(attribute));

    this.shadowRoot
      .querySelectorAll(attribute)
      .forEach((cell) => cell.setAttribute('highlighted', ''));
  }
}

window.customElements.define(PraxisIsncsciGrid.is, PraxisIsncsciGrid);
