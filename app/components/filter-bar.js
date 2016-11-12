import Ember from 'ember';

export default Ember.Component.extend({
    setup: function() {
        Ember.$('.controller input[type="checkbox"]').bootstrapToggle({
            on: 'Controller',
            off: 'All inputs'
        });
        Ember.$('.star input[type="checkbox"]').bootstrapToggle({
            on: '<i class="fa fa-star starred" />',
            off: '<i class="fa fa-star-half-full starred" />'
        });
        this.set('tagSelect', Ember.$('#tagSelect').select2({tags: true}));
        Ember.$('#tagSelect').on('change', (/*e*/) => {
            let filters = (this.get('filters.tags') || []);
            let select = this.get('tagSelect').val();
            if (select.toString() === filters.toString()) {
                // filters match select; nothing to do
                return;
            }
            this.sendAction('action', 'tags', select);
        });
        this.tagsUpdate();
    }.on('didInsertElement'),

    tagsUpdate: function() {
        let select = this.get('tagSelect');
        let selected = select.val();
        if (selected.toString() === (this.get('filters.tags') || []).toString()) {
            return;
        }
        select.val(this.get('filters.tags'));
        select.trigger('change');
    }.observes('filters.tags.[]'),

    players: function() {
        return this.get('filters.players') || [];
    }.property('filters.players.[]'),

    singleChecked: function() {
        return this.get('players').indexOf('single') >= 0;
    }.property('players'),

    multiChecked: function() {
        return this.get('players').indexOf('multi') >= 0;
    }.property('players'),

    coopChecked: function() {
        return this.get('players').indexOf('coop') >= 0;
    }.property('players'),

    played: function() {
        return this.get('filters.played') || [];
    }.property('filters.played.[]'),

    playedChecked: function() {
        return this.get('played').indexOf(true) >= 0;
    }.property('played'),

    unplayedChecked: function() {
        return this.get('played').indexOf(false) >= 0;
    }.property('played'),

    toggleListFilter: function(filter, value) {
        let current = this.get(`filters.${filter}`) || [];
        let newValues = [];
        let pos = current.indexOf(value);
        if (pos >= 0) {
            newValues = current.filter((val) => val !== value);
        } else {
            newValues = current.concat(value);
        }
        this.sendAction('action', filter, newValues);
    },

    actions: {
        clickPlayers: function(clicked) {
            this.toggleListFilter('players', clicked);
        },

        clickPlayed: function(clicked) {
            this.toggleListFilter('played', clicked);
        },

        clickController: function() {
            this.sendAction('action', 'controller', !this.get('filters.controller'));
        },

        clickStarred: function() {
            this.sendAction('action', 'starred', !this.get('filters.starred'));
        }
    }
});
