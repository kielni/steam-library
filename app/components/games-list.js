import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  chunkSize: 9,
  fullyRendered: false,

  didReceiveAttrs() {
    const size = this.get('chunkSize');
    const all = this.get('games') || [];

    this._super(...arguments);
    if (this.get('fullyRendered')) {
      this.set('displayGames', all);
    } else {
      this.set('displayGames', all.slice(0, size));
      this.set('start', (new Date()).getTime());
      this.incrementalRender(size + size);
    }
  },

  incrementalRender(size) {
    const all = this.get('games') || [];

    run.next(this, function() {
      console.log('incrementalRender: ', size);
      this.set('displayGames', all.slice(0, size));
      if (size < all.length) {
        this.incrementalRender(size + this.get('chunkSize'));
      } else {
        this.set('fullyRendered', true);
        console.log('rendered in ', ((new Date()).getTime() - this.get('start'))/1000, 's');
      }
    });

  },

  actions: {
    filterTag: function(tag) {
      this.filterTag(tag);
    },

    toggleStar: function(game) {
      this.toggleStar(game);
    },

    toggleHide: function(game) {
      this.toggleHide(game);
    },
  },
});
