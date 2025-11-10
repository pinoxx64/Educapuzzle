export interface Puzzle {
    id: number,
    nombre: string
}

export interface PuzzleResponse {
    message: string,
    status: number,
    puzzle: Puzzle
}
