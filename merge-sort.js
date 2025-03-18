export default function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const arrLeft = mergeSort(arr.slice(0, mid));
    const arrRight = mergeSort(arr.slice(mid));
    const sortedArr = [];
    let indexLeft = 0;
    let indexRight = 0;
    while (
        indexLeft < arrLeft.length &&
        indexRight < arrRight.length
    ) {
        if (arrLeft[indexLeft] <= arrRight[indexRight]) {
            sortedArr.push(arrLeft[indexLeft]);
            indexLeft++;
        } else {
            sortedArr.push(arrRight[indexRight]);
            indexRight++;
        }
    }
    while (indexLeft < arrLeft.length) {
        sortedArr.push(arrLeft[indexLeft]);
        indexLeft++;
    }
    while (indexRight < arrRight.length) {
        sortedArr.push(arrRight[indexRight]);
        indexRight++;
    }
    return sortedArr;
}
