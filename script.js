const tree = require('./bst')

const randomArr = Array.from({length: 100}, () => Math.floor(Math.random() * 100))


let x = tree(randomArr)
console.log(x.isBal()) /* true */
console.log(x.inOrder()) /* should return an array in ascending order */
console.log(x.preOrder())
console.log(x.postOrder())
x.ins(200)
x.ins(201)
x.ins(203)
console.log(x.isBal())  /* false */
x.reBal()
console.log(x.isBal()) /* true */
console.log(x.inOrder()) /* should return an array in ascending order */
console.log(x.preOrder())
console.log(x.postOrder())

