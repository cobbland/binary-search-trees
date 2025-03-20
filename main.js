import Tree from "./Tree.js";

const test = new Tree(
    [
        3, 67, 12,
    ]
);

const addToTest = [
    89, 45, 1, 4, 5, 90, 46, 47
];

for (let num in addToTest) {
    test.insertItem(addToTest[num]);
}

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

// test.insertItem(6);

// prettyPrint(test.root);

// test.insertItem(101);

// prettyPrint(test.root);

// prettyPrint(test.root);

// console.log(test.find(233));

// try {
//     test.postOrder(console.log);
// } catch(error) {
//     console.log(error);
// }

// console.log(test.depth(test.find(10)));

// test.deleteItem(5);

prettyPrint(test.root);

console.log(test.isBalanced());

console.log(test.rebalance());
