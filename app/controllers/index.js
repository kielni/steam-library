import Ember from 'ember';

export default Ember.Controller.extend({

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
            var data = (game.get('players') || []).concat(game.get('tags') || []).concat(game.get('features') || []);
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
            var features = (game.get('features') || []).concat(game.get('tags') || []);
            return features.find((f) => {
                return f.toLowerCase().indexOf('controller') >= 0;
            });
        },

        // true = played, false = unplayed
        played(game, value) {
            if (!value || value.length !== 1) {
                return true;
            }
            let playtime = game.get('playtime_forever') || 0;
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
            var data = (game.get('tags') || []).concat(game.get('genres') || []);
            return values.find((val) => {
                return data.indexOf(val) >= 0;
            });
        },

        starred(game, isStarred) {
            if (!isStarred) {
                return true;
            }
            return game.get('starred');
        },

        search(/*game, value*/) {
            return true;
        },
    },

    topTags: function() {
        return (this.get('orderedTags') || []).slice(0, 20).sort();
    }.property('orderedTags'),

    filteredGames: function() {
        let filters = this.get('filters') || {};
        console.log('filter games: filters=', filters);
        let tags = {};
        let games = this.get('model.games').filter((game) => {
            if (game.get('hidden')) {
                return false;
            }
            var keep = !Object.keys(filters).find((filter) => {
                return !this.filterFunctions[filter](game, this.filters[filter]);
            });
            if (!keep) {
                return false;
            }
            (game.get('tags') || []).forEach((tag) => {
                tags[tag] = (tags[tag] || 0) + 1;
            });
            (game.get('genres') || []).forEach((tag) => {
                tags[tag] = (tags[tag] || 0) + 1;
            });
            return true;
        });
        let sorted = Object.keys(tags).sort((a, b) => {
            return tags[a] > tags[b] ? -1 : tags[a] === tags[b] ? 0 : 1;
        });
        this.set('orderedTags', sorted);
        return games;
    }.property('filters.players.[]', 'filters.played.[]', 'filters.controller',
        'filters.tags.[]', 'filters.starred', 'model.games', 'model.games.@each.hidden'),

    actions: {
        onFilter: function(key, value) {
            console.log('onFilter: filters=', this.get('filters'));
            console.log(`onFilter key=${key} value=${value}`);
            this.set(`filters.${key}`, value);
            localStorage.setItem('filters', JSON.stringify(this.get('filters')));
        },

        filterTag: function(tag) {
            let tags = this.get('filters.tags') || [];
            if (tags.indexOf(tag) >= 0) {
                return;
            }
            this.set('filters.tags', tags.concat(tag));
        },

        toggleStar: function(game) {
            game.set('starred', !game.get('starred'));
            let saved = JSON.parse(localStorage.getItem('starred') || '[]');
            if (game.get('starred')) {
                saved.push(game.get('appid'));
            } else {
                saved.splice(saved.indexOf(game.get('appid')), 1);
            }
            localStorage.setItem('starred', JSON.stringify(saved));
        },

        toggleHide: function(game) {
            game.set('hidden', !game.get('hidden'));
            let saved = JSON.parse(localStorage.getItem('hidden') || '[]');
            if (game.get('hidden')) {
                saved.push(game.get('appid'));
            } else {
                saved.splice(saved.indexOf(game.get('appid')), 1);
            }
            localStorage.setItem('hidden', JSON.stringify(saved));
        }
    }
});
