(function(){
/**
 * Shows a grid. Toggle with Ctrl+g or hold down Alt/Option key.
 */

var colorSmallBlock = '#F7E1F6';
var colorBigBlock = '#ADE2E0';
var sizeSmallBlock = 8;
var sizeBigBlock = 32;

runWhenComplete(initGrid);

function initGrid() {
  console.info('running grid-8px 0.1 🐷🏁');
  var height = findDocumentHeight();
  var overlay = createOverlay(height);
  var tempVisibility = false;

  function updateGridVisibility() {
    overlay.style.opacity = localStorage.grid8px === 'on' || tempVisibility ? 0.8 : 0;
  }

  function onKeydown(e) {
    if(e.ctrlKey && e.which === 71) {
      localStorage.grid8px = localStorage.grid8px === 'on' ? 'off' : 'on';
    } else if (e.altKey) {
      tempVisibility = true;
    }
    updateGridVisibility();
  }

  function onKeyup(e) {
    if (e.which === 71) {
      return;
    }
    tempVisibility = false;
    updateGridVisibility();
  }

  document.body.appendChild(overlay);
  document.body.addEventListener('keydown', onKeydown, true);
  document.body.addEventListener('keyup', onKeyup , true);
  updateGridVisibility();
}

/**
 * Helper functions
 */

function createSvgBlock(size, color) {
  var svgString = "data:image/svg+xml;utf8," +
      "<svg xmlns='http://www.w3.org/2000/svg' width='" + size + "px' height='" + size + "px'>" +
      "<rect stroke-opacity='1' fill='none' stroke='" + color + "' x='0' y='0' width='" + (size + 1) +
      "' height='" + (size + 1) + "'>" +
      "</rect></svg>";
  return svgString;
}

function createOverlay(height) {
  var div = document.createElement('div');
  var background = 'url("' + createSvgBlock(sizeBigBlock, colorBigBlock) +'"),' +
                   'url("' + createSvgBlock(sizeSmallBlock, colorSmallBlock ) + '")';
  var style = 'position: absolute; opacity: 0; top: 0; left: 0; right: 0; z-index: 999; pointer-events: none; ' +
      'background: ' + background + ';' +
      'height:' + height + 'px;';
  div.setAttribute('style', style);
  return div;
}

function findDocumentHeight() {
  var html = document.documentElement;
  var height = Math.max(document.body.scrollHeight,
                        document.body.offsetHeight,
                        html.clientHeight,
                        html.scrollHeight,
                        html.offsetHeight);
  return height;
}

function runWhenComplete(fn) {
  if (document.readyState == 'complete') {
    fn();
  } else {
    document.addEventListener('readystatechange', function() {
      if (document.readyState == 'complete') {
        fn();
      }
    }, true);
  }
}

})();
