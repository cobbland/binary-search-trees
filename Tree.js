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

    deleteItem(value) {

    }

}