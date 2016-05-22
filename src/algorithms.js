'use strict'
function deCasteljau(t, points) {
  var n = points.length
  var cos = []

  for (var i = 0; i < n; i++) {
    cos.push([])
    for (var j = 0; j < n; j++)
      cos[i].push([j])
  }
  for (var i = 0; i < n; i++) {
    cos[i][0] = points[i]
  }

  for (var j = 1; j < n; j++) {
    for (var i = 0; i < n-j; i++) {
      cos[i][j] = addPoints(mult(1-t, cos[i][j-1]), mult(t, cos[i+1][j-1]))
    }
  }

  return cos[0][n-1]
}
