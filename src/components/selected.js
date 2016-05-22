class SelectedComponent extends Component {
  constructor() {
    super('#selected-info')
    this.id = -1
    this.selected = null
  }

  display(obj) {
    this.selected = obj
    this.removeClass('no-selected')
    this.addClass('selected')
    console.log('Selected:', obj)   
  }

  dummy() {
    if (this.selected === null)
      return false
    this.selected.deselect()
    this.selected = null
    console.log('Selected: Nope')
    this.addClass('no-selected')
    this.removeClass('selected')
  }

}
