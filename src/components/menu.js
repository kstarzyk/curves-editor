class Menu extends Component {
  constructor() {
    super('#menu')
    this.buttons = ['open', 'save', 'print', 'trash', 'divider', 'picture', 'divider', 'console', 'question-sign', 'info-sign', 'divider']
    this.initButtons()
  }

  initButtons() {
    this.buttons.map(x => {
      if (x !== 'divider')
        this.elem.innerHTML += this.renderButton(x) 
      else 
        this.elem.innerHTML += this.renderDivider()      
    })
  }

  renderButton(name) {
    return `  
      <button id="button-${name}" type="button" class="btn btn-default" aria-label="Add Curve">
        <span class="glyphicon glyphicon-${name}" aria-hidden="true"</span>
      </button>`
  }

  renderDivider() {
    return `<span class="divider" />`
  }
}

