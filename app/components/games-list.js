import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  pageSize: 6,
  fullyRendered: false,

  didReceiveAttrs() {
    const size = this.get('pageSize');
    const all = this.get('games') || [];

    this._super(...arguments);
    if (this.get('fullyRendered')) {
      this.set('displayGames', all);
    } else {
      this.set('displayGames', all.slice(0, size * 2));
      this.set('start', (new Date()).getTime());
      this.incrementalRender(size * 2);
    }
  },

  incrementalRender(size) {
    const all = this.get('games') || [];

    run.next(this, function() {
      const elapsed = ((new Date()).getTime() - this.get('start'))/1000;

      console.log(`incrementalRender to ${size} (${elapsed}s)`);
      this.set('displayGames', all.slice(0, size));
      if (size < all.length) {
        this.incrementalRender(size + this.get('pageSize') * 2);
      } else {
        this.set('fullyRendered', true);
        console.log(`fully rendered in ${elapsed}s`);
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
