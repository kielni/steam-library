import $ from 'jquery';
import Route from '@ember/routing/route';
import config from 'steam-library/config/environment';
import ParsesGame from 'steam-library/mixins/parses-game';

export default Route.extend(ParsesGame, {
  model() {
    const hidden = JSON.parse(localStorage.getItem('hidden') || '[]');

    return $.ajax(config.APP.LIBRARY).then((response) => {
      return {
        games: response.data.map(game => this.normalize(game, hidden, []))
          .filter(game => !game.get('ageRestricted') && game.get('hidden'))
          .sortBy('index')
      };
    });
    },
});
