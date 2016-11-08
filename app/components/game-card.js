import Ember from 'ember';

export default Ember.Component.extend({
    expanded: false,

    stateClass: function() {
        return this.get('expanded') ? 'long' : 'short';
    }.property('expanded'),

    expandClass: function() {
        return this.get('expanded') ? 'fa-minus' : 'fa-plus';
    }.property('expanded'),

    actions: {
        toggleExpand: function() {
            this.set('expanded', !this.get('expanded'));
        }
    }
});