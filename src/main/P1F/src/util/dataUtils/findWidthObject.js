/**
 * 주어진 너비(width)에 가장 가까운 너비포인트의 객체를 찾아 반환하는 함수
 * @param {number} width - 현재 화면의 너비값
 * @param {Object} widthObject - 너비포인트별 설정 객체가 담긴 객체
 * @returns {Object} 주어진 너비에 가장 가까운 너비포인트 객체를 반환합니다.
 */
export const findWidthObject = (width, widthObject) => {
    // 너비포인트들을 오름차순으로 정렬하여 배열에 담습니다.
    const sortedKeys = Object.keys(widthObject).map(Number).sort((a, b) => a - b);

    // 주어진 너비가 가장 작은 너비포인트보다 작거나 같은 경우, 가장 작은 너비포인트 객체를 반환합니다.
    if (width <= sortedKeys[0]) {
        return widthObject[sortedKeys[0]];
    }

    // 이분 탐색을 통해 주어진 너비에 가장 가까운 너비포인트를 찾습니다.
    let left = 0;
    let right = sortedKeys.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedKeys[mid] < width) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    // 가장 가까운 너비포인트의 키를 찾고, 해당 객체를 반환합니다.
    const nearestKey = sortedKeys[left];
    return widthObject[nearestKey];
}
