// https://s3.amazonaws.com/tomgermeau.com/tools/grid-8px.js

var overlay = document.createElement('div');
var svg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8px' height='8px'><rect stroke-opacity='1' fill='none' stroke='#F7E1F6' x='0' y='0' width='9' height='9'></rect></svg>";
var background = 'url("' + svg.replace(/8/g, '32').replace(/9/g, '33').replace('#F7E1F6', '#ADE2E0') + '"), url("' + svg + '")';

var html = document.documentElement;
var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
                      html.clientHeight, html.scrollHeight, html.offsetHeight);

var style = 'position: absolute; opacity: 0; top: 0; left: 0; height: 100%; right: 0; z-index: 999; pointer-events: none; background: ' + background;
overlay.setAttribute('style', style);

document.addEventListener('DOMContentLoaded', function() {
  document.body.appendChild(overlay);
  document.body.addEventListener('keydown', function(e) {
    if(e.ctrlKey && e.which === 71 || e.altKey) {
      overlay.style.opacity = 0.8;
    }
  }, true);
  document.body.addEventListener('keyup', function(e) {
    overlay.style.opacity = 0;
  }, true);
}, true);
