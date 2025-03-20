import Node from "./Node.js";
import mergeSort from "./merge-sort.js";

export default class Tree {

    constructor(arr) {
        this.arr = this.removeDuplicates(mergeSort(arr));
        this.root = this.buildTree(this.arr);
    }

    removeDuplicates(arr) {
        const newArr = []
        for (let thing in arr) {
            if (arr[thing] !== arr[thing - 1]) {
                newArr.push(arr[thing]);
            }
        }
        return newArr;
    }

    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) {
            return null;
        }
        const mid = Math.floor((start + end) / 2)
        const root = new Node(arr[mid]);
        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);
        return root;
    }

    insertItem(value, root = this.root) {
        if (root.data === value) {
            console.log("Value already in tree.");
            return;
        } else if (root.data > value) {
            if (root.left === null) {
                root.left = new Node(value);
            } else {
                this.insertItem(value, root.left);
            }
        } else if (root.data < value) {
            if (root.right === null) {
                root.right = new Node(value);
            } else {
                this.insertItem(value, root.right);
            }
        }
    }

    lowestHigh(root) {
        // find the lowest leaf on the high (right) side of a root node
        let lowHigh = root.right;
        let lastLowHigh;
        while (lowHigh !== null) {
            lastLowHigh = lowHigh;
            lowHigh = lowHigh.left;
        }
        return lastLowHigh;
    }

    deleteItem(value, root = this.root, lastRoot = new Node(null)) {
        // base case: the tree has been traversed to the end without finding value
        if (root === null) {
            console.log("Value not found in tree.");
            return;
        }

        if (root.data === value) { // Alternative base case(?): value is found...
            if (root.left === null && root.right === null) { //...without children.
                if (value > lastRoot.data) {
                    lastRoot.right = null;
                } else if (value < lastRoot.data) {
                    lastRoot.left = null;
                }
            } else if (root.left === null) { //...with only right child.
                if (value > lastRoot.data) {
                    lastRoot.right = root.right;
                } else {
                    lastRoot.left = root.right;
                }
            } else if (root.right === null) { //...with only left child.
                if (value > lastRoot.data) {
                    lastRoot.right = root.left;
                } else {
                    lastRoot.left = root.left;
                }
            } else { //...with children on both sides.
                const replaceWith = this.lowestHigh(root);
                this.deleteItem(replaceWith.data);
                replaceWith.right = root.right;
                replaceWith.left = root.left;
                if (value === this.root.data) {
                    this.root = replaceWith;
                } else if (value > lastRoot.data) {
                    lastRoot.right = replaceWith;
                } else {
                    lastRoot.left = replaceWith;
                }
            }
        } else if (value > root.data) { // Recursive case: to the right
            this.deleteItem(value, root.right, root);
        } else if (value < root.data) { // Recursive case: to the left
            this.deleteItem(value, root.left, root);
        }
    }

    find(value, root = this.root) {
        if (root === null) {
            console.log("Value not in tree.");
            return;
        } else if (value === root.data) {
            return root;
        }

        if (value > root.data) {
            return this.find(value, root.right);
        } else if (value < root.data) {
            return this.find(value, root.left);
        } 
    }

    levelOrder(callback = null) {
        if (callback === null) {
            throw new Error("Callback required.");
        }
        const queueArr = [this.root];
        while (queueArr.length > 0) {
            const currentNode = queueArr.shift();
            callback(currentNode);
            if (currentNode.left) {
                queueArr.push(currentNode.left);
            }
            if (currentNode.right) {
                queueArr.push(currentNode.right);
            }
        }
    }

    inOrder(callback = null, root = this.root) {
        if (callback === null) {
            throw new Error("Callback required.");
        }
        if (root === null) {
            return;
        }
        // left -> root -> right
        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    preOrder(callback = null, root = this.root) {
        if (callback === null) {
            throw new Error("Callback required.");
        }
        if (root === null) {
            return;
        }
        // root -> left -> right
        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    postOrder(callback = null, root = this.root) {
        if (callback === null) {
            throw new Error("Callback required.");
        }
        if (root === null) {
            return;
        }
        // left -> right -> root
        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    height(node) {
        if (node === null) {
            return -1;
        }
        let nodeHeightLeft = this.height(node.left);
        let nodeHeightRight = this.height(node.right);
        return nodeHeightLeft >= nodeHeightRight ? nodeHeightLeft + 1 : nodeHeightRight + 1;
    }

    depth(node, root = this.root, nodeDepth = 0) {
        if (root === null) {
            console.log("Node not in tree.")
            return;
        }
        if (node.data === root.data) {
            return nodeDepth;
        }
        if (node.data > root.data) {
            return this.depth(node, root.right, nodeDepth + 1);
        } else if (node.data < root.data) {
            return this.depth(node, root.left, nodeDepth + 1);
        }
    }

    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        } else if (
            this.isBalanced(node.left) && 
            this.isBalanced(node.right)
        ) {
            return true;
        } else {
            return false;
        }
    }

    rebalance(node = this.root, arr = []) {
        if (node === null) {
            return;
        }
        this.rebalance(node.left, arr);
        arr.push(node);
        this.rebalance(node.right, arr);
        return arr; // instead of returning, build new tree
    }

}

