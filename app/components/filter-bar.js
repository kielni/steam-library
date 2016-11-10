import Ember from 'ember';

export default Ember.Component.extend({
    filters: {
        players: []
    },

    setup: function() {
        Ember.$('.controller input[type="checkbox"]').bootstrapToggle({
            on: 'Yes',
            off: 'Any'
        });
        Ember.$('#tagSelect').select2();
        Ember.$('#tagSelect').on('change', (e) => {
            console.log('tags=', Ember.$('#tagSelect').val());
            let filters =  this.get('filters') || {};
            filters.tags = Ember.$('#tagSelect').val();
            this.sendAction('action', filters);
        });
    }.on('didInsertElement'),

    tagsUpdate: function() {
        console.log('tagsUpdate');
        Ember.$('#tagSelect').select2();
    }.observes('tags.[]'),

    singleChecked: function() {
        return Ember.$('#singlePlayer').is(':checked');
    }.property('players'),

    multiChecked: function() {
        return Ember.$('#multiPlayer').is(':checked');
    }.property('players'),

    coopChecked: function() {
        return Ember.$('#coop').is(':checked');
    }.property('players'),

    playedChecked: function() {
        return Ember.$('#played').is(':checked');
    }.property('players'),

    unplayedChecked: function() {
        return Ember.$('#unplayed').is(':checked');
    }.property('players'),

    addTagToFilter: function() {
        console.log('add tag '+this.get('filterTag')+' to filter');
        let tag = this.get('filterTag');
        if (!tag) {
            return;
        }
        // add to filter
        let filters =  this.get('filters') || {};
        let tags = this.get('filters').tags || [];
        if (tags.indexOf(tag) >= 0) {
            // already selected; nothing to do
            return;
        }
        // add to select
        tags.push(tag);
        Ember.$('#tagSelect').val(tags).trigger('change');
    }.observes('filterTag'),

    actions: {
        playersChanged: function(players) {
            let filters =  this.get('filters') || {};
            let current = this.get('filters').players || [];
            let pos = current.indexOf(players);
            if (pos < 0) {
                current.push(players);
            } else {
                current.splice(pos, 1);
            }
            filters.players = current;
            this.sendAction('action', filters);
        },

        playedChanged: function(played) {
            let filters =  this.get('filters') || {};
            let current = this.get('filters').played || [];
            let pos = current.indexOf(played);
            if (pos < 0) {
                current.push(played);
            } else {
                current.splice(pos, 1);
            }
            filters.played = current;
            this.sendAction('action', filters);
        },

        controllerChanged: function() {
            console.log('played=', Ember.$('input[name="played"]').is(':checked'));
            let filters =  this.get('filters') || {};
            filters.controller = !filters.controller;
            this.sendAction('action', filters);
        }
    }
});
