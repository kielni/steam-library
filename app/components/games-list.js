import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        expand: function(appid) {
            Ember.$(`div[data-id="${appid}"] .description`).removeClass('short');
            Ember.$(`div[data-id="${appid}"] .expand`).hide();
        }
    }
});
