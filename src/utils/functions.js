export const mergeSortedArrays = (arrFirst, arrSecond) => {
    const arrSort = [];
    let i = 0,
        j = 0;

    while (i < arrFirst.length && j < arrSecond.length) {
        arrSort.push(
            (arrFirst[i] < arrSecond[j]) ?
                arrFirst[i++] : arrSecond[j++]
        );
    }

    return [
        ...arrSort,
        ...arrFirst.slice(i),
        ...arrSecond.slice(j)
    ];
};