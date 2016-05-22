'use strict'
class Point {
  constructor(x, y, parent_id) {
    this.x = x
    this.y = y
    this.parent_id = parent_id || null
  }

  draw(parent_id, key) {
    this.parent_id = parent_id
    var elem = app.createElement('circle')
    elem.setAttribute('class', 'draggable')
    elem.setAttribute('cx', this.x)
    elem.setAttribute('cy', this.y)
    elem.setAttribute('r', 4)
    elem.setAttribute('key', key)
    elem.addEventListener('mousedown', e => this.select(e))

    elem.setAttribute('transform', 'matrix(1 0 0 1 0 0)')
    this.elem = elem
    return elem
  }

  drawControl(parent_id, key) {
    var elem =  this.draw(...arguments)
    elem.setAttribute('fill', 'blue')
    return elem
  }

  getMatrix() {
    return this.elem.getAttributeNS(null, 'transform').slice(7, -1).split(' ')
  }

  select(e) {
    if (!app.drawing) app.drawing = true
    if (app.selectedElement.attributes.key.value === e.target.attributes.key.value) { this.deselect(e); return; }  
    app.selectedElement = e.target
    app.currentX = e.clientX
    app.currentY = e.clientY
    app.currentMatrix = app.selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ')
    for (var i=0; i < app.currentMatrix.length; i++)
      app.currentMatrix[i] = parseFloat(app.currentMatrix[i])
    this.moveA = e => this.move(e)
    app.canvas.addEventListener('mousemove', this.moveA)
  }

  deselect(e) {
    if (app.selectedElement != 0) {
      app.drawing = false
      app.finishDrawing = true
      app.selectedElement.removeAttributeNS(null, 'mousemove')
      app.selectedElement.removeAttributeNS(null, 'onmouseout')
      app.selectedElement.removeAttributeNS(null, 'onmouseup')
      app.canvas.removeEventListener('mousemove', this.moveA, false)
      app.selectedElement = {attributes: {key: -1}}
    }

    this.transform()
  }


  move(e) {
    app.updateCurveById(this.parent_id)
    var dx = e.clientX - app.currentX
    var dy = e.clientY - app.currentY
    app.currentMatrix[4] += dx
    app.currentMatrix[5] += dy
    var newMatrix = "matrix(" + app.currentMatrix.join(' ') + ")"

    this.x += dx
    this.y += dy

    app.selectedElement.setAttributeNS(null, "transform", newMatrix)
    app.currentX = e.clientX
    app.currentY = e.clientY
  }

  transform() {
    var matrix = this.getMatrix()
    this.elem.setAttributeNS(null, 'cx', this.x)  
    this.elem.setAttributeNS(null, 'cy', this.y)
    this.elem.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)')
  }

}


function addPoints(a, b) {
  return new Point(a.x+b.x, a.y+b.y)
}

function mult(t, a) {
  return new Point(t*a.x, t*a.y)
}

