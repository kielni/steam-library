import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  pageSize: 6,
  rendered: 0,

  didReceiveAttrs() {
    const size = this.get('pageSize');
    const all = this.get('games') || [];

    this._super(...arguments);
    if (this.get('rendered') >= all.length) {
      this.set('displayGames', all);
    } else {
      this.set('displayGames', all.slice(0, size * 2));
      this.set('rendered', this.get('displayGames.length'));
      this.set('start', (new Date()).getTime());
      this.set('renderSize', Math.max(size*10, Math.ceil(all.length / 4)));
      this.incrementalRender(this.get('renderSize'));
    }
  },

  incrementalRender(size) {
    const all = this.get('games') || [];

    run.next(this, function() {
      const elapsed = ((new Date()).getTime() - this.get('start'))/1000;

      console.log(`incrementalRender to ${size} (${elapsed}s)`);
      this.set('displayGames', all.slice(0, size));
      this.set('rendered', this.get('displayGames.length'));
      if (size < all.length) {
        this.incrementalRender(size + this.get('renderSize'));
      } else {
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
