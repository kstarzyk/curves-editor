class App {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.init()
  }

  init() {
    this.canvas.addEventListener('click', this, false)
    this.pernamentSelect = false
    this.selected = new SelectedComponent()
    this.menu = new Menu()
    this.selectedElement = {attributes: { key: -1}}
    this._selectedCurve = -1
    this.currentX = 0
    this.currentY = 0
    this.currentMatrix = 0
    this.curves = []
    this.options = {}
    this.options = { accuracy: 100 }

    this.drawing = false
    this.finishDrawing = false
    this.offsetTop = 60
  }

  append(elem) {
    this.canvas.appendChild(elem)
  }

  onClick(e) { 
    console.log(this._selectedCurve)
    if (e.shiftKey) {
      if (this.selectedCurve !== -1) 
        this.curves[this._selectedCurve].addPoint(new Point(e.clientX, e.clientY-this.offsetTop))
    } else if(this.finishDrawing) {
      this.finishDrawing = false
    } else if(!this.drawing) {
      this.pernamentSelect = false
      this.selectedCurve = -1
      console.log(window.event)
    } else {
    }

  }

  handleEvent(e) {
    switch(e.type) {
      case 'click':
        this.onClick(e)
        break;
    }
  }

  bezierCurve(points) {
    this.curves.push(new Bezier(points[0], points[points.length-1], points.slice(1, points.length-1), this.curves.length))
    return this.curves[this.curves.length-1]
  }

  draw() {
    for (var i = 0; i < this.curves.length; i++) {
      this.curves[i].draw()
    }
  }

  updateCurveById(id) {
    this.curves[id].update()
  }

  startCurve(e, type) {
    
  }


  set selectedCurve(id) {
    if (id === this._selectedCurve) {
      return false
    }
    this._selectedCurve = id
    if (id === -1) {
      this.selected.dummy()
      return false
    }  
    this.selected.display(this.curves[id])
  }

  untilClickSelect() {
    console.log("TAK")
    console.log(this.pernamentSelect)
    this.pernamentSelect = true
    console.log(this.pernamentSelect)
  }

  createElement(type) {
    return document.createElementNS("http://www.w3.org/2000/svg", type)
  } 


  lineFactory(A, B, dashed) {
    var elem = this.createElement('line')
    elem.setAttribute('x1', A.x)
    elem.setAttribute('y1', A.y)
    elem.setAttribute('x2', B.x)
    elem.setAttribute('y2', B.y)
    if (dashed) {
      elem.setAttribute('stroke', 'gray')
      elem.setAttribute('stroke-dasharray', "10,10")
      elem.setAttribute('stroke-width', 1)
    } else {
      elem.setAttribute('stroke', 'black')
      elem.setAttribute('stroke-width', 2)
    }
    return elem
  }

}


app = new App()
