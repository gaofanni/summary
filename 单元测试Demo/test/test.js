const expect = chai.expect
mocha.ui('bdd')

describe('Test', function () {
    before(function () {
        createDiv('test')
    })
    it('content right', function () {
        var el = document.querySelector('#myDiv');
        expect(el).to.not.equal(null)
        expect(el.innerHTML).to.equal('test')
    })
})
// mocha.run()