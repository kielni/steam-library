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

    stateClass: function() {
        return this.get('expanded') ? 'long' : 'short';
    }.property('expanded'),

    expandClass: function() {
        return this.get('expanded') ? 'fa-angle-up' : 'fa-angle-down';
    }.property('expanded'),

    actions: {
        toggleExpand: function() {
            this.set('expanded', !this.get('expanded'));
        },

        addTag: function(tag) {
            this.sendAction('filterTag', tag);
        }
    }
});
