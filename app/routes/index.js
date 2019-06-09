import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import config from 'steam-library/config/environment';
import ParsesGame from 'steam-library/mixins/parses-game';

export default Route.extend(ParsesGame, {
  ajax: inject(),

  model() {
    const hidden = JSON.parse(localStorage.getItem('hidden') || '[]');
    const starred = JSON.parse(localStorage.getItem('starred') || '[]');

    console.log('loading', config.APP.LIBRARY);

    return this.get('ajax').request(config.APP.LIBRARY).then((response) => {
      const games = response.data.map(game => this.normalize(game, hidden, starred));

      this.set('hiddenCount', games.filter(game => game.hidden).length);

      return {
        games: games.filter(game => !game.get('ageRestricted') && !game.get('hidden'))
          .sortBy('index')
      };
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('filters', JSON.parse(localStorage.getItem('filters') || '{}'));
    controller.set('hiddenCount', this.get('hiddenCount'));
  }
});
