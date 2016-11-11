import Ember from 'ember';

export default Ember.Component.extend({
    expanded: false,

    tags: function() {
        // remove duplicates and preserve popularity order
        let tags = this.get('game.genres') || [];
        (this.get('game.tags') || []).forEach((tag) => {
            if (tags.indexOf(tag) < 0) {
                tags.push(tag);
            }
        });
        return tags;
    }.property('genres', 'tags'),

    starClass: function() {
        return this.get('game.starred') ? 'fa-star starred' : 'fa-star-o';
    }.property('game.starred'),

    hideClass: function() {
        return this.get('game.hidden') ? 'fa-eye' : 'fa-minus-circle';
    }.property('game.hidden'),

    stateClass: function() {
        return this.get('expanded') ? 'long' : 'short';
    }.property('expanded'),

    expandClass: function() {
        return this.get('expanded') ? 'fa-angle-up' : 'fa-angle-down';
    }.property('expanded'),

    actions: {
        toggleExpand: function(appid) {
            this.set('expanded', !this.get('expanded'));
            if (!this.get('expanded')) {
                document.getElementById(`game${appid}`).scrollIntoView();
            }
        },

        addTag: function(tag) {
            this.sendAction('filterTag', tag);
        },

        toggleStar: function() {
            this.sendAction('toggleStar', this.get('game'));
        },

        toggleHide: function() {
            this.sendAction('toggleHide', this.get('game'));
        }
    }
});
