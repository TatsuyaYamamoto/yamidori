import GameState from "./GameState";

class CountGameState implements GameState {
    public static TAG = "CountGameState";

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${CountGameState.TAG}@onEnter`);
    }

    onExit(): void {
        console.log(`${CountGameState.TAG}@onExit`);
    }
}

export default CountGameState;
