window.createDiv = function (value) {
    var oDiv = document.createElement('div')
    oDiv.id = 'myDiv'
    oDiv.innerHTML = value
    document.body.appendChild(oDiv)
}