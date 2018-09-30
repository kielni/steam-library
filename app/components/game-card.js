import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  expanded: false,

  tags: computed('genres', 'tags', function tags() {
    // remove duplicates and preserve popularity order
    let gameTags = this.get('game.genres') || [];
    (this.get('game.tags') || []).forEach((tag) => {
        if (gameTags.indexOf(tag) < 0) {
            gameTags.push(tag);
        }
    });
    return gameTags;
  }),

  starClass: computed('game.starred', function starClass() {
    return this.get('game.starred') ? 'fa-star starred' : 'fa-star-o';
  }),

  hideClass: computed('game.hidden', function hideClass() {
    return this.get('game.hidden') ? 'fa-eye' : 'fa-minus-circle';
  }),

  stateClass: computed('expanded', function stateClass() {
    return this.get('expanded') ? 'long' : 'short';
  }),

  expandClass: computed('expanded', function expandClass () {
    return this.get('expanded') ? 'fa-angle-up' : 'fa-angle-down';
  }),

  actions: {
    toggleExpand: function(appid) {
      this.set('expanded', !this.get('expanded'));
      if (!this.get('expanded')) {
        document.getElementById(`game${appid}`).scrollIntoView();
      }
    },

    addTag: function(tag) {
      this.filterTag(tag);
    },

    toggleStar: function() {
      this.toggleStar(this.get('game'));
    },

    toggleHide: function() {
      this.toggleHide(this.get('game'));
    }
  }
});
