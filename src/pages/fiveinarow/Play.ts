import { Ref } from "vue"

type pieces = {
    x: number,
    y: number,
    player?: number
}
export default class Play {
    player: Ref<number>
    checkerboard: pieces[][]
    balckChess: pieces[]
    whiteChess: pieces[]
    constructor(player: Ref<number>, checkerboard: pieces[][], balckChess: pieces[], whiteChess: pieces[]) {
        this.player = player
        this.checkerboard = checkerboard
        this.balckChess = balckChess
        this.whiteChess = whiteChess
        this.init()
    }
    init(){
        this.checkerboard = Array.from(
            { length: 15 }, 
            (_, y) =>  Array.from(
                { length: 15 }, 
                (_, x) => ({x, y})
            )
        )
    }
}