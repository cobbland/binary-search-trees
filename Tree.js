import Node from "./Node.js";

export default class Tree {

    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        return new Node(arr[1]); // testing...
    }

}