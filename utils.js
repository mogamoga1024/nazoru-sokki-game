
/**
 * 0以上max未満の整数をランダムに返す
 */
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * 破壊的シャッフル
 */
function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        const j = randomInt(array.length);
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}

