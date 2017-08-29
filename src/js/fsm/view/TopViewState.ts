import State from "../internal/State";

class TopViewState implements State {
    public static TAG = "TopViewState";

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${TopViewState.TAG}@onEnter`);
    }

    onExit(): void {
        console.log(`${TopViewState.TAG}@onExit`);
    }
}

export default TopViewState;
