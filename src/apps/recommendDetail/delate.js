
const $ = require('jquery');


$(document).ready(() => {
  $('.btn-delete').click(() => {
    $('.whole-page').addClass('page-opacity');
    $('.prompt-box').css('display', 'block');
  });
});
$(() => {
  $('.cancel').click(() => {
    $('.whole-page').removeClass('page-opacity');
    $('.prompt-box').css('display', 'none');
  });
});
