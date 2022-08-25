const node = (value) => {
    return {
        value: value,
        left: null,
        right: null
    }
}


const tree = (arr) => {
    let nullfunc = function () { }
    let root = buildTree(arr)
    function buildTree(arr) {
        let treeArr = []
        arr.sort((a, b) => a - b)
        arr.forEach((el) => {
            if (!treeArr.includes(el)) {
                treeArr.push(el)
            }
        })
        const mid = Math.trunc(treeArr.length / 2)
        const left = treeArr.slice(0, mid)
        const right = treeArr.slice(mid + 1)
        const x = node(treeArr[mid])
        if (treeArr.length > 1) {
            if (left.length > 0) x.left = buildTree(left)
            if (right.length > 0) x.right = buildTree(right)
        }
        return x
    }

    function ins(val) {
        root = insNode(root, val)
    }

    function insNode(root, val) {
        if (root == null) {
            root = node(val)
            return root
        }
        if (root.value == val) {
            return root
        }
        if (root.value > val) {
            root.left = insNode(root.left, val)
        }
        if (root.value < val) {
            root.right = insNode(root.right, val)
        }
        return root
    }

    function del(val) {
        root = delNode(root, val)
    }

    function delNode(root, val) {
        if (root == null) {
            return null
        }
        if (root.value == val) {
            if (root.left == null) {
                return root.right
            } else if (root.right == null) {
                return root.left
            } else {
                let cur = root.right
                while (cur.left) {
                    cur = cur.left
                }
                root.value = cur.value
                root.right = delNode(root.right, root.value)
            }

        }
        else if (root.value > val) {
            root.left = delNode(root.left, val)
        } else if (root.value < val) {
            root.right = delNode(root.right, val)
        }
        return root
    }

    function findNode(val) {
        let current = root
        while (current) {
            if (current.value == val) {
                return current
            }
            else if (val > current.value) {
                current = current.right
            }
            else if (val < current.value) {
                current = current.left
            }
        }
        return 'Value not found'
    }

    function levelOrder(cb) {
        cb = cb || nullfunc
        let queue = []
        let result = []
        let current = root
        queue.push(current)
        if (current == null) {
            return
        }
        while (queue.length > 0) {
            result.push(queue[0].value)
            current = queue[0]
            cb([queue[0].value])
            if (current.left) queue.push(current.left)
            if (current.right) queue.push(current.right)
            queue.shift()
        }

        if (cb == nullfunc) {
            return result
        }
    }
    function inOrder(cb) {
        let result = []
        function trav_inord(tree, cb) {
            cb = cb || nullfunc
            if (tree == null) {
                return
            }
            trav_inord(tree.left)
            result.push(tree.value)
            cb(tree.value)
            trav_inord(tree.right)
        }
        trav_inord(root, cb)
        return result
    }

    function preOrder(cb) {
        let result = []
        function trav_preord(tree, cb) {
            cb = cb || nullfunc
            if (tree == null) {
                return
            }
            result.push(tree.value)
            cb(tree.value)
            trav_preord(tree.left)
            trav_preord(tree.right)
        }
        trav_preord(root, cb)
        return result
    }

    function postOrder(cb) {
        let result = []
        function trav_postord(tree, cb) {
            cb = cb || nullfunc
            if (tree == null) {
                return
            }
            trav_postord(tree.left)
            trav_postord(tree.right)
            result.push(tree.value)
            cb(tree.value)
        }
        trav_postord(root, cb)
        return result
    }

    function height(val) {
        let base = findNode(val)
        if(typeof(val) !== 'number') {
            return
        }
        function trav_height(tree) {
            if (tree == null) {
                return -1
            }
            let left = trav_height(tree.left)
            let right = trav_height(tree.right)
            if (left > right) {
                return left + 1;
            }
            else {
                return right + 1;
            }

        }
        return trav_height(base)
    }

    function depth(val) {
        let current = root
        let result = 0
        while (current) {
            if (current.value == val) {
                return result
            }
            else if (val > current.value) {
                current = current.right
                result += 1
            }
            else if (val < current.value) {
                current = current.left
                result += 1
            }
        }
        return result
    }

    function isBal() {
        let leftH = height(root.left.value)
        let rightH  = height(root.right.value)
        let diffH = Math.abs(leftH - rightH)
        if(diffH > 1) {
            return false
        } else {
            return true
        }
    }

    function reBal() {
        let arr = inOrder()
        let newTree = buildTree(arr)
        root.value = newTree.value
        root.right = newTree.right
        root.left = newTree.left
    }

    return {
        root,
        ins,
        del,
        findNode,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBal,
        reBal,
    }
}

module.exports = tree