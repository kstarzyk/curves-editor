class SelectedComponent extends Component {
  constructor() {
    super('#selected-info')
    this.id = -1
    this.selected = null
    this.elem.addEventListener('click', this, false)
  }

  status() {
  
  }

  onClick(e) {
    switch (e.target.id.slice(7)) {
      case 'animate':
        this.handleAnimate()
        break
      case 'move':
        this.handleMove()
        break
      default:
        console.warn(`Action is not defined: ${e.target.id.slice(7)}`)
    }
  }

  handleEvent(e) {
    switch (e.type) {
      case 'click':
        this.onClick(e)
        break
    }
  }

  handleAnimate() {
    this.selected.animate()
  }

  handleMove() {
    app.canvas.style.cursor = 'pointer'
  }

  display(obj) {
    this.selected = obj
    this.removeClass('no-selected')
    this.addClass('selected')
    console.debug('Selected:', obj)   
  }

  dummy() {
    if (this.selected === null)
      return false
    this.selected.deselect()
    this.selected = null
    this.addClass('no-selected')
    this.removeClass('selected')
    console.debug('Selected: Nope')
  }

}
