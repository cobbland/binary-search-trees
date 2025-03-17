import Node from "./Node.js";

export default class Tree {

    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(this.arr);
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



}