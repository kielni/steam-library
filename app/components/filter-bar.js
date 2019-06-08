import $ from 'jquery';
import Component from '@ember/component';
import { computed } from '@ember/object';

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

  singleChecked: computed('filters.players.[]', function single() {
    return (this.get('filters.players') || []).indexOf('single') >= 0;
  }),

  multiChecked: computed('filters.players.[]', function multi() {
    return (this.get('filters.players') || []).indexOf('multi') >= 0;
  }),

  coopChecked: computed('filters.players.[]', function coop() {
    return (this.get('filters.players') || []).indexOf('coop') >= 0;
  }),

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
