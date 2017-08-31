import GameState from "./GameState";

class OverGameState implements GameState {
    public static TAG = "OverGameState";

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${OverGameState.TAG}@onEnter`);
    }

    onExit(): void {
        console.log(`${OverGameState.TAG}@onExit`);
    }
}

export default OverGameState;
