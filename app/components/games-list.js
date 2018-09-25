import Component from '@ember/component';

export default Component.extend({
    actions: {
        filterTag: function(tag) {
            this.sendAction('filterTag', tag);
        },

        toggleStar: function(game) {
            this.sendAction('toggleStar', game);
        },

        toggleHide: function(game) {
            this.sendAction('toggleHide', game);
        }
    }
});
