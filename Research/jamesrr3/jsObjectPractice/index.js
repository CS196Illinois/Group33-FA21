import 'mathjs'

class Rectangle {
    constructor(height, width) {
        this.height = height
        this.width = width
    }

    area() {
        return this.height * this.width;
    }

    perimeter() {
        return 2 * this.height + 2 * this.width
    }

    diagonal() {
        return Math.sqrt((this.height**2) + (this.width ** 2))
    }
}


let rectangle = Rectangle(3,4)
console.log(rectangle.area)