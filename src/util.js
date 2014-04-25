/**
 * This file contains some extra utility functions.
 */

ROT.Color.randomizeRound = function(color, diff) {
  var newColor = ROT.Color.randomize(color, diff);
  newColor[0] = Math.round(newColor[0]);
  newColor[1] = Math.round(newColor[1]);
  newColor[2] = Math.round(newColor[2]);
  return newColor;
}

ROT.Color.randomizeClamp = function(color, diff) {
  var newColor = ROT.Color.randomizeRound(color, diff);
  newColor[0] = Math.max(0, Math.min(255, (newColor[0])));
  newColor[1] = Math.max(0, Math.min(255, (newColor[1])));
  newColor[2] = Math.max(0, Math.min(255, (newColor[2])));
  return newColor;
}

// Set up movement keys and their respective directions.
var KEYS = {}
KEYS[ROT.VK_K] = 0;
KEYS[ROT.VK_UP] = 0;
KEYS[ROT.VK_NUMPAD8] = 0;
KEYS[ROT.VK_U] = 1;
KEYS[ROT.VK_PAGE_UP] = 1;
KEYS[ROT.VK_NUMPAD9] = 1;
KEYS[ROT.VK_L] = 2;
KEYS[ROT.VK_RIGHT] = 2;
KEYS[ROT.VK_NUMPAD6] = 2;
KEYS[ROT.VK_N] = 3;
KEYS[ROT.VK_PAGE_DOWN] = 3;
KEYS[ROT.VK_NUMPAD3] = 3;
KEYS[ROT.VK_J] = 4;
KEYS[ROT.VK_DOWN] = 4;
KEYS[ROT.VK_NUMPAD2] = 4;
KEYS[ROT.VK_B] = 5;
KEYS[ROT.VK_END] = 5;
KEYS[ROT.VK_NUMPAD1] = 5;
KEYS[ROT.VK_H] = 6;
KEYS[ROT.VK_LEFT] = 6;
KEYS[ROT.VK_NUMPAD4] = 6;
KEYS[ROT.VK_Y] = 7;
KEYS[ROT.VK_HOME] = 7;
KEYS[ROT.VK_NUMPAD7] = 7;