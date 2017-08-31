import GameState from "./GameState";

class PlayingGameState implements GameState {
    public static TAG = "PlayingGameState";

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${PlayingGameState.TAG}@onEnter`);
    }

    onExit(): void {
        console.log(`${PlayingGameState.TAG}@onExit`);
    }
}

export default PlayingGameState;
