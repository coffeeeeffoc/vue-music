function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
export function shuffle(arr) {
  let array = arr.slice()
  for (let i = 0; i < array.length; i++) {
    let j = getRandomInt(0, i)
    let t = array[i]
    array[i] = array[j]
    array[j] = t
  }
  return array
}
