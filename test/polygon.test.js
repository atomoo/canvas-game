const assert = require('assert')
const Polygon = require('../js/shape/polygon').default
const Point = require('../js/shape/point').default

describe('polygon', () => {
    it('should collide with each other when the ploygons have a same point', () => {
        const p = new Polygon([
            new Point(0, 0),
            new Point(0, 20),
            new Point(20, 20),
            new Point(20, 0)
        ])
        const p2 = new Polygon([
            new Point(20, 20),
            new Point(40, 20),
            new Point(30, 0)
        ])
        assert(p.isCollideWithOther(p2))
    })
})
