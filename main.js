import Tree from "./Tree.js";

const test = new Tree(
    [
        3, 67, 12, 89, 45, 78, 23, 56, 34, 90,
        1, 54, 76, 32, 87, 43, 21, 65, 98, 10,
        5, 72, 36, 84, 19, 60, 29, 77, 41, 93,
        8, 50, 68, 14, 81, 39, 25, 70, 95, 17
    ]
);

// const addToTest = [
//     4, 61, 27, 86, 49, 75, 20, 57, 92, 38,
//     7, 66, 13, 83, 42, 79, 30, 62, 94, 16,
//     0, 53, 88, 33, 99, 46, 11, 52, 40, 51
// ]

// for (let num in addToTest) {
//     test.insertItem(addToTest[num]);
// }

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

// test.insertItem(6);

// prettyPrint(test.root);

// test.insertItem(101);

// prettyPrint(test.root);

// test.deleteItem(8);

// prettyPrint(test.root);

// console.log(test.find(233));

// try {
//     test.postOrder(console.log);
// } catch(error) {
//     console.log(error);
// }

console.log(test.height(test.find(45)));
