import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/iron-form/iron-form.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-button/paper-button.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class MyProfileLogin extends PolymerElement {
  static get template() {
    return html`
    <style>
        paper-button {
            font-family: 'Roboto', 'Noto', sans-serif;
            font-weight: normal;
            font-size: 14px;
            -webkit-font-smoothing: antialiased;
        }
        paper-button.indigo {
            background-color: var(--paper-indigo-500);
            color: white;
            --paper-button-raised-keyboard-focus: {
                background-color: var(--paper-pink-a200) !important;
                color: white !important;
            };
        }
    </style>
    <app-location route="{{route}}"></app-location>
    <my-profile-data id="myData"></my-profile-data>

    <iron-form id="loginForm">
        <form method="post">
            <paper-input always-float-label="" label="Username" autofocus="" name="username" value="admin">
                <iron-icon icon="account-box" slot="prefix"></iron-icon>
            </paper-input>
            <paper-input always-float-label="" label="Password" type="password" name="password" value="myP@ss123">
                <iron-icon icon="lock" slot="prefix"></iron-icon>
            </paper-input>
            <div style="text-align: center;">
                <paper-button raised="" class="indigo" id="btnSubmit">Submit</paper-button>
                <paper-button>Back</paper-button>
            </div>
            <div id="loginResult"></div>
        </form>

        <p><i>This login is simulated with <strong>local storage</strong> and <strong>session storage</strong>.<br>
        It's your own security risk to store login data into session storage.</i></p>
    </iron-form>
`;
  }

  static get properties() { return {
      visible: {
          type: Boolean,
          value: false
      }
  }}

  static get is() {
      return 'my-profile-login';   // must be same as dom-module id
  }

  static get observers() { return [
      '_showLogin(visible)'
  ]}

  ready() {
      super.ready();
      this.$.btnSubmit.addEventListener('click', e => {this._submit(e)});
      this.$.loginForm.addEventListener('iron-form-submit', e => {this._processSubmit(e)});
  }
  _submit(e) {
      this.$.loginForm.submit();
  }

  // iron-form fields must have "name" attribute
  _processSubmit(e) {
      if (this.loginUser !== null) {
          this.$.myData.logOut();
          this.set('route.path', '/home');
          this.dispatchEvent(new CustomEvent('user-logout', {
              bubbles: true, composed: true, detail: this.loginUser}))
      } else {
          let user = this.$.myData.logIn(e.detail.username, e.detail.password);
          if (user) {
              this.$.loginResult.style.display = 'none';
              //window.location.replace('/');
              //window.history.pushState({}, null, '/home');
              //Polymer.importHref(this.resolveUrl('/home'), null, null, true);
              // this.visible = false;
              this.set('route.path', '/home');
              this.dispatchEvent(new CustomEvent('show-toast', {
                  bubbles: true, composed: true, detail: "Welcome back, " + user.username + "!"}))
          } else {
              this.$.loginResult.style.display = 'block';
              this.$.loginResult.innerHTML = "Wrong authentication. Please try again.";
          }
      }
  }

  _showLogin(visible) {
      if (!visible) {
          return;
      }
      let theTitle = "Log in";
      let buttonText = "Log in";

      this.loginUser = this.$.myData.getLoginUser();
      if (this.loginUser !== null) {
          theTitle = this.loginUser.username;
          buttonText = "Log out";
      }
      this.$.btnSubmit.innerHTML = buttonText;
      this.dispatchEvent(new CustomEvent('change-page', {
          bubbles: true, composed: true, detail: { title: theTitle }}));
  }
}

customElements.define(MyProfileLogin.is, MyProfileLogin);
