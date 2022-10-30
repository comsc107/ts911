'use babel';

import Ts911View from './ts911-view';
import { CompositeDisposable } from 'atom';

export default {

  ts911View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ts911View = new Ts911View(state.ts911ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ts911View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ts911:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ts911View.destroy();
  },

  serialize() {
    return {
      ts911ViewState: this.ts911View.serialize()
    };
  },

  toggle() {
    console.log('Ts911 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
