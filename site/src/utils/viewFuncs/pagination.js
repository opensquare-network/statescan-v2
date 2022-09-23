export default function constructGroups(total = 0, page = 0) {
  let arr = [page - 1, page, page + 1];
  const zeroIndex = arr.findIndex((item) => item === 0);
  if (zeroIndex > 0) {
    arr = arr.slice(zeroIndex);
  }
  if (arr[0] <= 3) {
    while (arr[0] > 0) {
      arr.unshift(arr[0] - 1);
    }
  }

  const totalIndex = arr.findIndex((item) => item === total);
  if (totalIndex >= 0) {
    arr = arr.slice(0, totalIndex + 1);
  }
  if (arr[arr.length - 1] > total - 3) {
    while (arr[arr.length - 1] < total) {
      arr.push(arr[arr.length - 1] + 1);
    }
  }

  const last = [total - 1, total];
  const first = [0, 1];
  let result = [arr];
  if (arr[arr.length - 1] < total) {
    result.push(last);
  }
  if (arr[0] > 0) {
    result.unshift(first);
  }

  return result;
}
