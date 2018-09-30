import EmberObject from '@ember/object';
import $ from 'jquery';
import Route from '@ember/routing/route';
import config from 'steam-library/config/environment';

export default Route.extend({
  model() {
    let hidden = JSON.parse(localStorage.getItem('hidden') || '[]');
    let starred = JSON.parse(localStorage.getItem('starred') || '[]');

    console.log('loading', config.APP.LIBRARY);
    const iconMap = {
      single: 'fa-user',
      multi: 'fa-users',
    };

    return $.ajax(config.APP.LIBRARY).then((response) => {
      let data = response.data.map((game) => {
        // "players": "Single-player" || players": "Multi-player",
        game.playersIcon = (game.players || []).map((player) => iconMap[player]);
        game.starred = starred.indexOf(game.appid) >= 0;
        game.hidden = hidden.indexOf(game.appid) >= 0;
        game.index = Math.random();
        return EmberObject.create(game);
      });
      return {
        games: data.filter((game) => {
          return !game.get('ageRestricted') && !game.get('hidden');
        }).sortBy('index')
      };
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('filters', JSON.parse(localStorage.getItem('filters') || '{}'));
  }
});
