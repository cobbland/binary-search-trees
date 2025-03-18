import Tree from "./Tree.js";

const test = new Tree([1, 7, 4, 3, 23, 8, 9, 4, 3, 5, 7, 9, 67, 3, 6345, 324]);

console.log(test.root);

/*
Tip: If you would like to visualize your binary search tree, 
here is a prettyPrint() function that will console.log your tree 
in a structured format. This function will expect to receive 
the root of your tree as the value for the node parameter.
*/
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

prettyPrint(test.root);

test.insertItem(6);

prettyPrint(test.root);

test.insertItem(101);

prettyPrint(test.root);