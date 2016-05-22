'use strict'
function deCasteljau(t, points) {
  var n = points.length
  var matrix = []

  for (var i = 0; i < n; i++) {
    matrix.push([])
    for (var j = 0; j < n; j++)
      matrix[i].push([j])
  }
  for (var i = 0; i < n; i++) {
    matrix[i][0] = points[i]
  }

  for (var j = 1; j < n; j++) {
    for (var i = 0; i < n-j; i++) {
      matrix[i][j] = addPoints(mult(1-t, matrix[i][j-1]), mult(t, matrix[i+1][j-1]))
    }
  }

  return matrix[0][n-1]
}
