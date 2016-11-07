import Ember from 'ember';

export default Ember.Controller.extend({

    filters: {},

    filterFunctions: {
        // ['single', 'multi']
        players(game, value) {
            if (!value || value.length !== 1) {
                return true;
            }
            /*
            "players": "single" || players": "multi",
            */
            let val = value[0];
            if (game.players && game.players.indexOf(val) >= 0) {
                return true;
            }
            if (!game.tags) {
                return false;
            }
            /*
            "tags": ["Singleplayer","Multiplayer",]
            */
            let players = val.substr(0, 1).toUpperCase()+val.substr(1);
            return game.tags.find((tag) => {
                return tag.indexOf(players) === 0;
            });
        },

        controller(game, isSupported) {
            if (!isSupported) {
                return true;
            }
        },

        genre(game, value) {
            return true;
        },

        coop(game, isCoop) {
            return true;
        },

        starred(game, isStarred) {
            return true;
        },

        search(game, value) {
            return true;
        },
    },

    filteredGames: function() {
        let filters = this.get('filters');
        if (!filters) {
            return this.get('model.games');
        }
        return this.get('model.games').filter((game) => {
            return !Object.keys(filters).find((filter) => {
                return !this.filterFunctions[filter](game, this.filters[filter]);
            });
        });
    }.property('filter.players.@each', 'model.games', 'updated'),

    actions: {
        onFilter: function(filters) {
            console.log('filter=', filters);
            this.set('filters', filters);
            this.set('updated', (new Date()).getTime());
        }
    }
});
