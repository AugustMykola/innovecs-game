import {IScene} from "../../models/IScene";
import {Application, Container, Text} from "pixi.js";
import {Button} from "../../ui/button";

export class MenuScene implements IScene {
    root = new Container();
    private title!: Text;
    private startBtn!: Button;
    private onResize = () => this.layout();

    constructor(
        private app: Application,
        private onStart: () => void,
    ) {}

    init(): void {
        this.app.stage.addChild(this.root);

        this.title = new Text({
            text: "HERDSMAN",
            style: { fill: 0xffffff, fontSize: 36, fontWeight: "800" },
        });
        this.title.anchor.set(0.5);
        this.root.addChild(this.title);

        this.startBtn = new Button("Start Game", 220, 56, this.onStart);
        this.root.addChild(this.startBtn);

        this.layout();
        window.addEventListener("resize", this.onResize);

        window.addEventListener("keydown", this.handleKey);
    }

    update(): void {}

    destroy(): void {
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener("keydown", this.handleKey);
        this.root.removeChildren();
        this.root.destroy({ children: true });
    }

    private layout() {
        const w = this.app.screen.width;
        const h = this.app.screen.height;

        this.title.position.set(w / 2, h / 2 - 80);

        this.startBtn.centerIn(w, h, 0, 0);
    }

    private handleKey = (e: KeyboardEvent) => {
        if (e.key === "Enter") this.onStart();
    };
}