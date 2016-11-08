import Ember from 'ember';
import config from 'steam-library/config/environment';

export default Ember.Route.extend({
    model() {
        return Ember.$.ajax(config.APP.LIBRARY).then((response) => {
            let data = response.data.map((game) => {
                // "players": "Single-player" || players": "Multi-player",
                if (game.players) {
                    game.players = game.players.toLowerCase().replace('-player', '');
                    game.playersIcon = game.players === 'single' ? 'fa-user' : 'fa-users';
                }
                return game;
            });
            return {
                games: data.filter((game) => !game.ageRestricted)
            };
        });
    }
});
