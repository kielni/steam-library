import Ember from 'ember';

export default Ember.Controller.extend({
    filteredGames: function() {
        return this.get('model.games').filter((game) => {
            return game.get('hidden');
        });
    }.property('model.games.@each.hidden'),

    actions: {
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
