import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-card';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-button';
import { SharedStyles } from '../shared-styles';

export default class BookmarkList extends LitElement {

  static get properties() {
    return {
      allContacts: { type: Array }
    }
  }

  constructor() {
    super();
    this.displayBookmarkContacts = this.displayBookmarkContacts.bind(this);
  }

  _editContact(e) {
    window.dispatchEvent(new CustomEvent('show-form', {
      detail: {
        mode: 'edit',
        id: e.currentTarget.parentElement.id,
        data: this.allContacts[e.currentTarget.parentElement.id]
      }
    }));
  }

  _callContact(e) {
    const contact = this.allContacts[e.currentTarget.parentElement.id];
    window.open('tel:' + contact.phone_number);
  }

  displayBookmarkContacts() {
    return this.allContacts.map((contact, index) => {
      if (contact.bookmark) {
        return html`
          <paper-card heading="${contact.first_name + " " + contact.last_name}" image="/assets/img/${contact.image ? contact.image : 'user-image.jpg'}">
            <div class="card-content">
              <vaadin-button theme="tertiary">
                <iron-icon icon="vaadin:phone-landline" slot="prefix"></iron-icon>
                <span class="text">${contact.phone_number}</span>
              </vaadin-button>
              <vaadin-button theme="tertiary">
                <iron-icon icon="vaadin:envelope" slot="prefix"></iron-icon>
                <span class="text">${contact.email}</span>
              </vaadin-button>
            </div>
            <div class="card-actions" .id="${index}">
              <vaadin-button @click="${this._callContact}">
                <iron-icon icon="vaadin:phone" slot="prefix"></iron-icon>Call
              </vaadin-button>
              <vaadin-button @click="${this._editContact}">
                <iron-icon icon="vaadin:edit" slot="prefix"></iron-icon>Edit
              </vaadin-button>
            </div>
          </paper-card>
          `;
      }
    });
  }

  render() {
    return html`
      <h2>Bookmark</h2>
      <section class="bookmark">
        ${this.displayBookmarkContacts()}
      </section>
    `;
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          display: block;
          --paper-card-header-color: #1676F3;
        }
        h2 {
            color: #3e4162;
            font-weight: 300;
            grid-column: 1/4;
        }
        .bookmark {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 20px;
        }
        paper-card {
          max-width: 300px;
        }
        .card-content {
          text-align: center;
        }
        .card-actions {
            display: grid;
            grid-template-columns: 3fr 2fr;
            grid-gap: 5px;
        }
        @media only screen and (max-width: 900px) {
          .bookmark {
            grid-template-columns: 1fr 1fr;
          }
        }
      `
    ];
  }
}

window.customElements.define('bookmark-list', BookmarkList);
