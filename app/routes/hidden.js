import EmberObject from '@ember/object';
import $ from 'jquery';
import Route from '@ember/routing/route';
import config from 'steam-library/config/environment';

export default Route.extend({
    model() {
        let hidden = JSON.parse(localStorage.getItem('hidden') || '[]');
        return $.ajax(config.APP.LIBRARY).then((response) => {
            let data = response.data.map((game) => {
                // "players": "Single-player" || players": "Multi-player",
                if (game.players) {
                    game.players = game.players.toLowerCase().replace('-player', '');
                    game.playersIcon = game.players === 'single' ? 'fa-user' : 'fa-users';
                }
                game.hidden = hidden.indexOf(game.appid) >= 0;
                game.index = Math.random();
                return EmberObject.create(game);
            });
            return {
                games: data.filter((game) => {
                    return !game.get('ageRestricted') && game.get('hidden');
                }).sortBy('title')
            };
        });
    },
});
