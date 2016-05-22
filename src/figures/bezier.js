class Bezier {
  constructor(start, end, cpoints, id) {
    // this.n = n || !!cpoints.length ? 1 + cpoints.length : 1
    this.n = cpoints.length + 1
    this.start = start
    this.end = end
    this.points = [start, ...cpoints, end]
    this.view = app.createElement('g')
    this.pointsView = app.createElement('g')
    this.lines = app.createElement('g')
    this.dashedLines = app.createElement('g')
    this.setId(id)
    this.name = 'bezier_' + this.id
    this.selected = false
    this.updating = false
  }

  addControlPoint() {


  }

  drawPoints() {
    this.pointsView.appendChild(this.start.draw(this.id, 0))
    for (var i = 1; i < this.points.length - 1; i++) {
      this.pointsView.appendChild(this.points[i].drawControl(this.id, i))
    }
    this.pointsView.appendChild(this.end.draw(this.id, this.points.length-1))
  }

  drawCurve() {
    var prev = deCasteljau(0, this.points)
    for (var t = 0.01; t <= 1.01; t += 1 / app.options.accuracy) {
      var next = deCasteljau(t, this.points)
      var line = app.lineFactory(prev, next)
      line.addEventListener('mouseover', this.select.bind(this))
      line.addEventListener('mouseout', this.deselect.bind(this))
      line.addEventListener('click', this.selectPernament.bind(this))
      this.lines.appendChild(line)
      prev = next
    } 
  }

  clearCurve() {
    clearNode(this.lines)
  }

  clearPoints() {
    clearNode(this.pointsView)
  }

  clear() {
    clearNode(this.view)
  }

  draw(_update) {
    var update = _update || false
    if (update) {
      this.clear()
    }

    if (this.selected) {
      this.drawPoints()
      this.drawDashed()
    }
    this.drawCurve()
    this.view.appendChild(this.lines)
    this.view.appendChild(this.pointsView)
    this.view.appendChild(this.dashedLines)
    app.append(this.view)
  }

  clearDashed() {
    clearNode(this.dashedLines)
  }

  update() {
    this.clearPoints()
    this.clearCurve()
    this.clearDashed()

    if (this.selected) {
      this.drawPoints()
      this.drawDashed()
    }
    this.drawCurve()
  }

  drawDashed() {
    for (var i = 0; i < this.points.length-1; i++) {
      this.dashedLines.appendChild(app.lineFactory(this.points[i], this.points[i+1], true))
    }
  }

  select() {
    if (app.pernamentSelect || this.selected) {
      return false
    }
    this.selected = true
    app.selectedCurve = this.id
    this.drawDashed()
    this.drawPoints()
  }

  selectPernament(e) {
    e.stopPropagation()
    this.select()
    app.pernamentSelect = true
  }

  deselect() {
    if (app.pernamentSelect || app.drawing) {
      return false
    }

    this.selected = false
    app.selectedCurve = -1
    this.clearPoints()
    this.clearDashed()
  }

  get info() {
    return {
      deg: this.n,
      points: this.points,
      name: this.name
    }
  }

  addPoint(p) {
    this.points.push(p)
    this.end = this.points[this.points.length-1]
    this._incDeg()
    this.update()
  }

  setId(id) {
    this.id = id
  }

  _incDeg() {
    this.n += 1
  }

}


