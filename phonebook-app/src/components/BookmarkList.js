import { LitElement, html, css, unsafeCSS } from 'lit-element';
import '@polymer/paper-card';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-button';
import { SharedStyles, SmallScreen } from '../shared-styles';

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
          <paper-card image="/assets/img/${contact.image ? contact.image : 'user-image.jpg'}">
            <div class="card-content">
              <h3>${contact.first_name + " " + contact.last_name}</h3>
              <div>
                <iron-icon icon="vaadin:phone-landline" slot="prefix" size="8"></iron-icon>
                <span class="text">${contact.phone_number}</span>
              </div>
              <div>
                <iron-icon icon="vaadin:envelope" slot="prefix"></iron-icon>
                <span class="text">${contact.email}</span>
              </div>
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
      ${this.allContacts.filter(c => c.bookmark).length > 0 ?
        html `<h2>Bookmark</h2>
        <section class="bookmark">${this.displayBookmarkContacts()}</section>` :
        ''}
    `;
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          display: block;
          --paper-card-header-color: var(--main-color);
          --iron-icon-width: 1.3rem;
          --iron-icon-height: 1.3rem;
          font-size: 1.3rem;
        }
        h2 {
          color: #3e4162;
          font-weight: 300;
          grid-column: 1/4;
        }
        h3 {
          margin: 5px 0;
        }
        paper-card {
          width: 25rem;
          margin: 0 2rem 2rem 0;
        }
        .card-content {
          text-align: left;
          font-size: 1.5rem;
          padding: 1rem;
          text-align: center;
          color: var(--main-color);
        }
        .card-content div {
          margin: 3px 0;
          white-space: nowrap;
        }
        .card-actions {
          display: grid;
          grid-template-columns: 3fr 2fr;
          grid-gap: .5rem;
        }
      `,
      unsafeCSS(SmallScreen(`
        .bookmark {
          text-align: center;
        }
      `))
    ];
  }
}

window.customElements.define('bookmark-list', BookmarkList);
