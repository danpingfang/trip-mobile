import Vue from 'vue';
import anmationTypes from './lib/animationTypes';

Object.keys(anmationTypes).map(key => {
  Vue.transition(key, anmationTypes[key]);
  return null;
});
