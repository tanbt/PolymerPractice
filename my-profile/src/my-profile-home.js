import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class MyProfileHome extends PolymerElement {
  static get template() {
    return html`
    <my-profile-data id="myData"></my-profile-data>
    Home page...
    <div>[[loginUser.username]]</div>

    <h3>Skills: </h3>
    Search skill: <input value="{{searchString::input}}">
    <br><br>
    <template is="dom-repeat" id="skill-list" items="{{skills}}" as="skill" filter="{{computeFilter(searchString)}}">
      <div id\$="skill=[[index]]">
        [[skill.name]]: [[skill.level]] <button on-click="deleteSkill">Delete</button>
      </div>
      <br>
    </template>
`;
  }

  static get properties() { return {
      visible: {
          type: Boolean,
          value: false
      },
      skills: {
          type: Array,
          value: [
              {name: "Polymer", level: "Beginner"},
              {name: "ES6", level: "Intermediate"},
              {name: "CSS3", level: "Intermediate"},
              {name: "HTML5", level: "Advanced"}
          ]
      }
  }}

  static get is() {
      return 'my-profile-home';   // must be same as dom-module id
  }

  static get observers() { return [
      '_showHome(visible)'
  ]}

  _showHome(visible) {
      if (!visible) {
          return;
      }
      let theTitle = "Home";
      this.loginUser = this.$.myData.getLoginUser();
      if (this.loginUser !== null) {
          theTitle = this.loginUser.username;
      }

      this.dispatchEvent(new CustomEvent('change-page', {
          bubbles: true, composed: true, detail: { title: theTitle }}));
  }

  deleteSkill(e) {
      this.splice('skills', e.model.itemsIndex, 1);
      this.notifyPath('skills');
  }

  computeFilter(string) {
      if (!string) {
          // set filter to null to disable filtering
          return null;
      } else {
          // return a filter function for the current search string
          string = string.toLowerCase();
          return function(skill) {
              let skillName = skill.name.toLowerCase();
              return (skillName.indexOf(string) != -1);
          };
      }
  }
}

customElements.define(MyProfileHome.is, MyProfileHome);
