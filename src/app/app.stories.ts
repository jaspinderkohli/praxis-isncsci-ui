import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {html} from 'lit-html';
import type {Meta, StoryObj} from '@storybook/web-components';
import {getAppLayoutTemplate} from '@web/praxisIsncsciAppLayout';
import {AppStoreProvider} from '@app/providers';

import '@app/webApp';
import '@web/praxisIsncsciAppBar';
import '@web/praxisIsncsciDialogHeader';
import '@web/praxisIsncsciAppLayout';
import '@web/praxisIsncsciIcon';
import '@web/praxisIsncsciInputLayout';
import '@web/praxisIsncsciClassification';

import 'assets/css/design-system.css';
import {PraxisIsncsciWebApp} from '@app/webApp';
import {appStore} from './store';

const styles = html`
  <style>
    #root-inner {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
  </style>
`;

class webAppStory extends HTMLElement {
  private template() {
    return `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        ::slotted(praxis-isncsci-web-app) {
          flex-grow: 1;
        }
      </style>
      <slot></slot>
    `;
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = this.template();
  }

  public connectedCallback() {
    const webApp = document.querySelector(
      'praxis-isncsci-web-app',
    ) as PraxisIsncsciWebApp;

    if (webApp) {
      webApp.initialize(appStore, new AppStoreProvider(appStore));
    }
  }
}
window.customElements.define('web-app-story', webAppStory);

const meta = {
  title: 'App/App',
  render: (args) =>
    html`
      ${styles}
      <web-app-story>
        <praxis-isncsci-web-app>
          ${unsafeHTML(
            getAppLayoutTemplate(args.classificationStyle, 'assets/icons'),
          )}
        </praxis-isncsci-web-app>
      </web-app-story>
    `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {};