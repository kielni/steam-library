import Ember from 'ember';

export default Ember.Controller.extend({

    filters: {},

    filterFunctions: {
        // ['single', 'multi', 'coop']
        players(game, value) {
            if (!value || value.length === 0 || value.length === 3) {
                return true;
            }
            /*
            "players": "single" || players": "multi",
            "tags": ["Singleplayer","Multiplayer", "Co-op"]
            "features": ["Co-op"]
            */
            var data = (game.players || []).concat(game.tags || []).concat(game.features || []);
            return value.find((val) => {
                if (val === 'coop') {
                    return data.indexOf('Co-op') >= 0;
                }
                if (data.indexOf(val) >= 0) {
                    return true;
                }
                return data.indexOf(val.substr(0, 1).toUpperCase()+val.substr(1)) >= 0;
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

        // true = played, false = unplayed
        played(game, value) {
            if (!value || value.length !== 1) {
                return true;
            }
            let playtime = game.playtime_forever || 0;
            // played = playtime > 15 minutes
            if (value[0]) {
                return playtime > 15;
            }
            return playtime <= 15;
        },

        tags(game, values) {
            if (!values || values.length === 0) {
                return true;
            }
            var data = (game.tags || []).concat(game.genres || []);
            return values.find((val) => {
                return data.indexOf(val) >= 0;
            });
        },

        starred(game, isStarred) {
            return true;
        },

        search(game, value) {
            return true;
        },
    },

    topTags: function() {
        return (this.get('orderedTags') || []).slice(0, 20).sort();
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
            this.set('addTag', null);
            this.set('filters', filters);
            this.set('updated', (new Date()).getTime());
        },

        filterTag: function(tag) {
            let filters = this.get('filters') || {};
            let tags = filters.tags || [];
            if (tags.indexOf(tag) > 0) {
                return;
            }
            tags.push(tag);
            filters.tags = tags;
            this.set('addTag', tag);
            this.set('filters', filters);
            this.set('updated', (new Date()).getTime());
        }
    }
});
