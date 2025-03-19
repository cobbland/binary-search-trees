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

        // The following seems better but isn't my own:
        // return Array.from(new Set(arr));
        // return arr;
    }

    /*
    Write a buildTree(array) function that takes an array of data 
    (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into 
    a balanced binary tree full of Node objects appropriately placed 
    (don’t forget to sort and remove duplicates!). 
    The buildTree function should return the level-0 root node.
    */
    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) {
            return null;
        }
        const mid = Math.floor((start + end) / 2) // does that work to calculate the middle of the array?
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
        // base cases:
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

    levelOrder(callback = null, queueArr = [], root = this.root) {
        if (callback === null) {
            throw new Error("Callback required.");
        }
        queueArr.push(root);
        while (root !== null) {
            if (root.left) {
                queueArr.push(root.left);
            }
            if (root.right) {
                queueArr.push(root.right);
            }
            root = root.left
        }
        callback(queueArr);
    } // does not currently work

}