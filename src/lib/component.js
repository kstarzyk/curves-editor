class Component {
  constructor(ident) {
    switch (ident[0]) {
      case '#':
        this.id = ident
        this.elem = document.getElementById(ident.slice(1))
        break
      case '.':
        console.log(ident)
        this.elem = document.getElementsByClassName(ident.slice(1))[0]
        break
    }

    console.debug(`Component ${this.constructor.name} initialized`)
  }

  addClass(name) {
    if (this.elem.className.indexOf(name) === -1)
      this.elem.className = `${this.elem.className} ${name}`
  }

  removeClass(name) {
    var ind = this.elem.className.indexOf(name)
    if (ind > -1) {
      this.elem.className = this.elem.className.replace(name, '')
    } else {
      console.warn('Component doesn\'t have the class ' + name + ' to be removed')
    }
  }

  hide() {
    this.elem.css = {display: 'none'}
  }

}
