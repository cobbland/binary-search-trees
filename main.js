import Tree from "./Tree.js";

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

const arrTest = (num) => {
    const arr = [];
    while (num > 0) {
        arr.push(
            Math.round(Math.random() * 100)
        );
        --num;
    }
    return arr;
}

const test = new Tree(arrTest(10));

prettyPrint(test.root);

console.log(`Balanced: ${test.isBalanced()}`);

// console.log("## Level Order")
// test.levelOrder(console.log);

// console.log("## In Order")
// test.inOrder(console.log);

// console.log("## Pre Order")
// test.preOrder(console.log);

// console.log("## Post Order")
// test.postOrder(console.log);

const higherArr = (num) => {
    const arr = [];
    while (num > 0) {
        arr.push(
            Math.round(Math.random() * 1000)
        );
        --num;
    }
    return arr;
}

for (const num of higherArr(5)) {
    test.insertItem(num);
}

prettyPrint(test.root);

console.log(`Balanced: ${test.isBalanced()}`);

test.rebalance();

prettyPrint(test.root);

console.log(`Balanced: ${test.isBalanced()}`);

// console.log("## Level Order")
// test.levelOrder(console.log);

// console.log("## In Order")
// test.inOrder(console.log);

// console.log("## Pre Order")
// test.preOrder(console.log);

// console.log("## Post Order")
// test.postOrder(console.log);