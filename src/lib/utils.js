utils = {}

var path = './res'
load = filename => {
  if (filename.indexOf('.html') < -1) filename += '.html'
  var xhr = new XMLHttpRequest()
  xhr.open('GET', filename, true)
  xhr.onreadystatechange = () => {
    if (this.readyState !== 4) return
    if (this.status === 404) return
    if (this.status !== 200) return
    document.getElementById('header').innerHTML = this.responseText
  }
  xhr.send()
}


clearNode = elem => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild)
  }
}
