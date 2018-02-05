
export const log = console.log.bind(console)
export const random = function random(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1))
}
