import Ember from 'ember';

export default Ember.Component.extend({
    filters: {
        players: 'both'
    },
    players: 'both',

    singleChecked: function() {
        return this.get('players') === 'single';
    }.property('players'),

    bothChecked: function() {
        return this.get('players') === 'both';
    }.property('players'),

    multiChecked: function() {
        return this.get('players') === 'multi';
    }.property('players'),

    actions: {
        playersChanged: function() {
            console.log('playersChanged');
            let filters = this.get('filters') || {};
            let players = this.get('players');
            filters.players = players === 'both' ? ['single', 'multi'] : [players];
            this.sendAction('action', filters);
        },
    }
});
