import Component from '@ember/component';

export default Component.extend({
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
