import {IScene} from "../../models/IScene";
import {Application, Container} from "pixi.js";

export class SceneManager {
    public currentScene: IScene | null = null;
    public root: Container;

    constructor(public app: Application) {
        this.root = new Container();
        this.app.stage.addChild(this.root);
    }

    async changeScene(scene: IScene) {
        if (this.currentScene !== null) {
            this.currentScene.destroy();
            this.root.removeChildren();
        }
        this.currentScene = scene;
        await scene.init();
    }

    update(delta: number) {
        this.currentScene?.update(delta);
    }
}