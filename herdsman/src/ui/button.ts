import { Graphics, Text } from "pixi.js";

export class Button extends Graphics {
    private bg = new Graphics();
    private labelText: Text = {} as Text;
    private _w: number;
    private _h: number;

    constructor(text: string, width = 180, height = 50, onClick?: () => void) {
        super();
        this._w = width; this._h = height;

        this.addChild(this.bg);
        this.redraw(0x2e7d32);

        this.labelText = new Text({
            text,
            style: { fill: 0xffffff, fontSize: 20, fontWeight: "700" },
        });
        this.labelText.anchor.set(0.5);
        this.labelText.position.set(this._w / 2, this._h / 2);
        this.addChild(this.labelText);

        this.eventMode = "static";
        this.cursor = "pointer";
        this.on("pointerover", () => this.redraw(0x388e3c));
        this.on("pointerout",  () => this.redraw(0x2e7d32));
        this.on("pointerdown", () => this.redraw(0x1b5e20));
        this.on("pointerup",   () => { this.redraw(0x388e3c); onClick?.(); });
    }

    centerIn(w: number, h: number, offsetX = 0, offsetY = 0) {
        this.pivot.set(this._w / 2, this._h / 2);
        this.position.set(w / 2 + offsetX, h / 2 + offsetY);
        return this;
    }

    setSize(width: number, height: number) {
        this._w = width; this._h = height;
        this.redraw(0x2e7d32);
        this.labelText.position.set(this._w / 2, this._h / 2);
        return this;
    }

    private redraw(color: number) {
        this.bg.clear();
        this.bg.roundRect(0, 0, this._w, this._h, 12).fill({ color });
        this.bg.stroke({ color: 0xffffff, width: 2, alpha: 0.15 });
    }
}
