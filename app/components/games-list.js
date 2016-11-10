import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        filterTag: function(tag) {
            this.sendAction('filterTag', tag);
        }
    }
});
