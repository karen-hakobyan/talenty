export default function memoPropsAreEqual(prev, next) {
    return JSON.stringify(prev) !== JSON.stringify(next)
}