import Vector from '../vector/vector'

export default class Polygon {
    constructor(points) {
        if (points.length <= 0) {
            throw new Error('need points')
        }
        this.points = points
    }

    /**
     * get all perpendicular axes from each line
     */
    getAxes() {
        const len = this.points.length
        if (len <= 0) {
            throw new Error('need points')
        }
        const axes = []
        const v = new Vector()
        const vNext = new Vector()
        for (let index = 0; index < len - 1; index++) {
            const p = this.points[index]
            v.x = p.x
            v.y = p.y
            const pNext = this.points[index + 1]
            vNext.x = pNext.x
            vNext.y = pNext.y
            axes.push(v.edge(vNext).normal())
        }
        v.x = this.points[len - 1].x
        v.y = this.points[len - 1].y
        vNext.x = this.points[0].x
        vNext.y = this.points[0].y
        axes.push(v.edge(vNext).normal())
        return axes
    }

    getprojectionRangeOnAxis(axis) {
        const projections = this.getAllprojectionOnAxis(axis)
        if (projections.length > 0) {
            const protechtionRange = {
                max: projections[0],
                min: projections[0]
            }
            projections.forEach((p) => {
                if (p < protechtionRange.min) {
                    protechtionRange.min = p
                }
                if (p > protechtionRange.max) {
                    protechtionRange.max = p
                }
            })
            return protechtionRange
        }
        return null
    }

    getAllprojectionOnAxis(axis) {
        const projections = []
        this.points.forEach((p) => {
            projections.push(new Vector(p).dotProduct(axis))
        })
        return projections
    }

    isCollideOnAxes(axes, polygon) {
        for (let index = 0; index < axes.length; index++) {
            const axis = axes[index]
            const projectionRange = this.getprojectionRangeOnAxis(axis)
            const targetProjectionRange = polygon.getprojectionRangeOnAxis(axis)
            if (projectionRange.max < targetProjectionRange.min
                || projectionRange.min > targetProjectionRange.max) {
                return false
            }
        }
        return true
    }

    isCollideWithOther(polygon) {
        const axes = this.getAxes().concat(polygon.getAxes())
        return this.isCollideOnAxes(axes, polygon)
    }
}
