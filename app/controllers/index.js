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
            var features = (game.features || []).concat(game.tags || []);
            return features.find((f) => {
                return f.toLowerCase().indexOf('controller') >= 0;
            });
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

    topTags: function() {
        return (this.get('orderedTags') || []).slice(0, 20);
    }.property('orderedTags'),

    filteredGames: function() {
        let filters = this.get('filters');
        let tags = {};
        let games = this.get('model.games').filter((game) => {
            var keep = !Object.keys(filters).find((filter) => {
                return !this.filterFunctions[filter](game, this.filters[filter]);
            });
            if (!keep) {
                return false;
            }
            (game.tags || []).forEach((tag) => {
                tags[tag] = (tags[tag] || 0) + 1;
            });
            (game.genres || []).forEach((tag) => {
                tags[tag] = (tags[tag] || 0) + 1;
            });
            return true;
        });
        let sorted = Object.keys(tags).sort((a, b) => {
            return tags[a] > tags[b] ? -1 : tags[a] === tags[b] ? 0 : 1;
        });
        this.set('orderedTags', sorted);
        return games;
    }.property('filter.players.@each', 'model.games', 'updated'),

    actions: {
        onFilter: function(filters) {
            console.log('filter=', filters);
            this.set('filters', filters);
            this.set('updated', (new Date()).getTime());
        }
    }
});
