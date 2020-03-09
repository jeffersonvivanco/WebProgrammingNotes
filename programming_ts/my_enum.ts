enum Direction {
    UP, DOWN, LEFT, RIGHT
}

enum Direction2 {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}

enum Order {
    one, two, three, four
}

// console.log(Direction.UP);
// console.log(Direction2.UP);

// let ds = Object.keys(Direction2).map((d:any) => Direction2[d]);
// console.log(ds);
console.log(Direction2['UP']);