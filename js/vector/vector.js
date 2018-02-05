export default class Vector {
    constructor(point) {
        if (point === undefined) {
            this.x = 0
            this.y = 0
        }
        else {
            this.x = point.x
            this.y = point.y
        }
    }

    getMagnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    add(vector) {
        const v = new Vector()
        v.x = this.x + vector.x
        v.y = this.y + vector.y
        return v
    }

    subtract(vector) {
        const v = new Vector()
        v.x = this.x - vector.x
        v.y = this.y - vector.y
        return v
    }

    dotProduct(vector) {
        return this.x * vector.x + this.y * vector.y
    }

    // 由两点生成边
    edge(vector) {
        return this.subtract(vector)
    }

    // 垂直，即投影轴
    perpendicular() {
        const v = new Vector()
        v.x = this.y
        v.y = 0 - this.x
        return v
    }

    normalize() {
        const v = new Vector(0, 0)
        const m = this.getMagnitude()
        if (m !== 0) {
            v.x = this.x / m
            v.y = this.y / m
        }
        return v
    }

    // 投影轴的单位向量
    normal() {
        const p = this.perpendicular()
        return p.normalize()
    }
}
