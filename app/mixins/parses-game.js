import EmberObject from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  iconMap() {
    return {
      single: 'fa-user',
      multi: 'fa-users',
    }
  },

  normalize(game, hidden, starred) {
    // "players": "Single-player" || players": "Multi-player",
    game.playersIcon = (game.players || []).map((player) => this.iconMap()[player]);
    game.starred = starred.indexOf(game.appid) >= 0;
    game.hidden = hidden.indexOf(game.appid) >= 0;
    game.index = Math.random();
    game.url = `https://store.steampowered.com/app/${game.appid}`;

    return EmberObject.create(game);
  },
});
