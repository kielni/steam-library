import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  filterFunctions() {
    return {
      players: this.filterPlayers,
      controller: this.filterController,
      played: this.filterPlayed,
      tags: this.filterTags,
      starred: this.filterStarred,
      search: this.filterSearch,
    };
  },

  // ['single', 'multi', 'coop']
  filterPlayers(game, value) {
    if (!value || value.length === 0 || value.length === 3) {
      return true;
    }
    /*
    "players": "single" || players": "multi",
    "tags": ["Singleplayer","Multiplayer", "Co-op"]
    "features": ["Co-op"]
    */
    const data = (game.get('players') || []).concat(game.get('tags') || []).concat(game.get('features') || []);

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

  filterController(game, isSupported) {
    if (!isSupported) {
      return true;
    }
    const features = (game.get('features') || []).concat(game.get('tags') || []);

    return features.find((f) => {
      return f.toLowerCase().indexOf('controller') >= 0;
    });
  },

  // true = played, false = unplayed
  filterPlayed(game, value) {
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

  filterTags(game, wantTags) {
    if (!wantTags || wantTags.length === 0) {
      return true;
    }
    const gameTags = new Set((game.get('tags') || []).concat(game.get('genres') || []));
    const hasTags = wantTags.filter(tag => gameTags.has(tag));

    console.log(`${game.get('name')}\twant ${wantTags} (${wantTags.length}) has=${hasTags} (${hasTags.length})`);
    // game must have all selected tags
    return hasTags.length === wantTags.length;
  },

  filterStarred(game, isStarred) {
    if (!isStarred) {
      return true;
    }
    return game.get('starred');
  },

  filterSearch(/*game, value*/) {
    return true;
  },

  topTags: computed('filteredGames.{tags,genres}.@each', function topTags() {
    const tags = {};
    const games = (this.get('filteredGames') || []);
    const minCount = parseInt(games.length / 20);

    games.forEach((game) => {
      (game.get('tags') || []).forEach((tag) => {
          tags[tag] = (tags[tag] || 0) + 1;
      });
      (game.get('genres') || []).forEach((tag) => {
          tags[tag] = (tags[tag] || 0) + 1;
      });
    });

    const popular = Object.keys(tags).filter((tag) => tags[tag] > minCount);
    const sorted = popular.sort((a, b) => {
      return tags[a] > tags[b] ? -1 : tags[a] === tags[b] ? 0 : 1;
    });
    console.log(sorted.length, ' tags');
    return sorted.slice(0, 30).sort();
  }),

  // eslint-disable-next-line ember/use-brace-expansion
  filteredGames: computed('filters.{players,played,tags}.[]', 'filters.{controller,starred}', 'model.games', 'model.games.@each.hidden', function filteredGames() {
    let filters = this.get('filters') || {};
    let filterFunctions = this.filterFunctions();

    console.log('filter games: filters=', filters);

    return this.get('model.games').filter((game) => {
      if (game.get('hidden')) {
          return false;
      }
      return !Object.keys(filters).find((filter) => {
          return !filterFunctions[filter](game, this.filters[filter]);
      });
    });
  }),

  saveFilters() {
      localStorage.setItem('filters', JSON.stringify(this.get('filters')));
  },

  actions: {
    clickTag(tag) {
      console.log('clickTag', tag);
      let tags = this.get('filters.tags') || [];
      if (tags.indexOf(tag) >= 0) {
        return;
      }
      this.set('filters.tags', tags.concat(tag));
      this.saveFilters();
    },

    selectTags(tags) {
      console.log('selectTags', tags);
      this.set('filters.tags', tags);
      this.saveFilters();
    },

    toggleStar(game) {
      game.set('starred', !game.get('starred'));
      let saved = JSON.parse(localStorage.getItem('starred') || '[]');
      if (game.get('starred')) {
        saved.push(game.get('appid'));
      } else {
        saved.splice(saved.indexOf(game.get('appid')), 1);
      }
      localStorage.setItem('starred', JSON.stringify(saved));
    },

    toggleHide(game) {
      game.set('hidden', !game.get('hidden'));
      let saved = JSON.parse(localStorage.getItem('hidden') || '[]');
      if (game.get('hidden')) {
        saved.push(game.get('appid'));
      } else {
        saved.splice(saved.indexOf(game.get('appid')), 1);
      }
      localStorage.setItem('hidden', JSON.stringify(saved));
    },
  },
});
