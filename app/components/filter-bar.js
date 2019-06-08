import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    $('.controller input[type="checkbox"]').bootstrapToggle({
      on: 'Controller',
      off: 'All inputs',
    });
    $('.star input[type="checkbox"]').bootstrapToggle({
      on: '<i class="fa fa-star starred" />',
      off: '<i class="fa fa-star-half-full starred" />',
    });
    this.setInitialState();
  },

  selectTag() {
    let filters = (this.get('filters.tags') || []);
    let select = this.get('tagSelect').val();
    if (select.toString() === filters.toString()) {
      // filters match select; nothing to do
      return;
    }
    this.filter('tags', select);
  },

  setInitialState: function() {
    let players = this.get('filters.players') || [];
    ['single', 'multi', 'coop'].forEach((p) => {
        this.set(`${p}Checked`, players.indexOf(p) >= 0);
    });
    let played = this.get('filters.played') || [];
    ['played', 'unplayed'].forEach((p) => {
        this.set(`${p}Checked`, played.indexOf(p) >= 0);
    });
  },

  toggleListFilter(filter, value) {
    let current = this.get(`filters.${filter}`) || [];
    let newValues = [];
    let pos = current.indexOf(value);
    if (pos >= 0) {
        newValues = current.filter((val) => val !== value);
    } else {
        newValues = current.concat(value);
    }
    this.filter(filter, newValues);
  },

  actions: {
    clickPlayers(clicked) {
      this.toggleListFilter('players', clicked);
    },

    clickPlayed(clicked) {
      this.toggleListFilter('played', clicked);
    },

    clickController() {
      this.filter('controller', !this.get('filters.controller'));
    },

    clickStarred() {
      this.filter('starred', !this.get('filters.starred'));
    },
  },
});
