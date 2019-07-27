/**
 * 配列をシャッフルして返却する
 * @param arr
 */
export function getShuffleData<T>(arr: T[]): T[] {
  const index = shuffledIndex(arr.length);
  return arr.map((_, i) => arr[index[i]]);
}

/**
 * シャッフルされた配列のインデックスを返す
 * @param arrayLength
 */
function shuffledIndex(arrayLength: number) {
  let index: number;
  const arr = Array(arrayLength);
  const rest = [...Array(arrayLength - 1)].map((_, i) => i + 1); // 0は抜いておく

  // 0番目に値を入れる
  let _n = 0 | (Math.random() * rest.length);
  arr[0] = rest[_n];
  index = rest[_n]; // 今回の値が次のnの値
  rest.splice(_n, 1);

  while (rest.length > 0) {
    // 以下同様に繰り返す
    _n = 0 | (Math.random() * rest.length);
    arr[index] = rest[_n];

    index = rest[_n];
    rest.splice(_n, 1);
  }
  arr[index] = 0; // 最後の位置に0を入れて完了
  return arr;
}
