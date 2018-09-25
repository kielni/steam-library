import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
    setup: function() {
        $('.controller input[type="checkbox"]').bootstrapToggle({
            on: 'Controller',
            off: 'All inputs'
        });
        $('.star input[type="checkbox"]').bootstrapToggle({
            on: '<i class="fa fa-star starred" />',
            off: '<i class="fa fa-star-half-full starred" />'
        });
        this.set('tagSelect', $('#tagSelect').select2({tags: true}));
        $('#tagSelect').on('change', (/*e*/) => {
            let filters = (this.get('filters.tags') || []);
            let select = this.get('tagSelect').val();
            if (select.toString() === filters.toString()) {
                // filters match select; nothing to do
                return;
            }
            this.sendAction('action', 'tags', select);
        });
        this.tagsUpdate();
        this.setInitialState();
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

    setInitialState: function() {
        let players = this.get('filters.players') || [];
        ['single', 'multi', 'coop'].forEach((p) => {
            this.set(`${p}Checked`, players.indexOf(p) >= 0);
        });
        let played = this.get('filters.played') || [];
        ['played', 'unplayed'].forEach((p) => {
            this.set(`${p}Checked`, played.indexOf(p) >= 0);
        });
    },

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
