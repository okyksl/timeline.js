import { Timeline } from '../js/timeline.js';

const options = {
  size: {
    height: 50,
    width: 150
  },
  radius: 5,
  color: {
    fill: 'transparent',
    stroke: 'red',
    text: 'black',
    line: 'green'
  },
  text: {
    font: '15px Arial',
    align: 'center',
    baseline: 'middle'
  },
  offset: 20
};

const items = {
  'test_1': {
    name: 'Fire',
    position: {
      x: 100,
      y: 100
    }
  },
  'test_2': {
    name: 'Farming',
    position: {
      x: 300,
      y: 100
    },
    dependencies: ['test_1']
  },
  'test_3': {
    name: 'Animal Husbandary',
    position: {
      x: 500,
      y: 150
    },
    dependencies: ['test_2']
  },
  'test_4': {
    name: 'Trade',
    position: {
      x: 500,
      y: 50
    },
    dependencies: ['test_2']
  }
};

const canvas = document.getElementById('timeline');
const context = canvas.getContext('2d');
const timeline = new Timeline(items, options);

timeline.draw(context);
