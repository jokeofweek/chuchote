/**
 * This file contains some extra utility functions.
 */

ROT.Color.randomizeClamp = function(color, diff) {
  var newColor = ROT.Color.randomize(color, diff);
  newColor[0] = Math.max(0, Math.min(255, Math.round(newColor[0])));
  newColor[1] = Math.max(0, Math.min(255, Math.round(newColor[1])));
  newColor[2] = Math.max(0, Math.min(255, Math.round(newColor[2])));
  return newColor;
}