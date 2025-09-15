import type {IScene} from "../../models/IScene";
import {Application, Container, Graphics} from "pixi.js";
import {Input} from "../Input";
import type {IHero} from "../../models/IHero";
import type {IYard} from "../../models/IYard";
import type {IAnimal} from "../../models/IAnimal";
import {GroupManager} from "../../systems/GroupManager";
import {Score} from "../../ui/score";
import {Spawner} from "../../systems/Spawner";
import {PatrolSystem} from "../../systems/PatrolSystem";
import type {IEntityFactory} from "../../models/IEntityFactory";
import {randRange} from "../utils";
import {MARGIN} from "../../config/config";

export class GameScene implements IScene {
    root: Container = new Container();
    group: GroupManager = new GroupManager();
    score: Score = new Score();

    input!: Input;
    hero!: IHero;
    yard!: IYard;
    animals: IAnimal[] = [];

    spawner?: Spawner;
    patrol?: PatrolSystem;

    get field() {
        return {
            x: MARGIN,
            y: MARGIN,
            w: this.app.screen.width - MARGIN * 2,
            h: this.app.screen.height - MARGIN * 2,
        };
    }

    constructor(
        private app: Application,
        private factory: IEntityFactory,
    ) {
    }

    async init(): Promise<void> {
        this.app.stage.addChild(this.root);

        const border: Graphics = new Graphics()
            .rect(this.field.x, this.field.y, this.field.w, this.field.h)
            .stroke({color: 0xffffff, width: 2, alpha: 0.2});
        this.root.addChild(border);

        this.input = new Input(this.app);

        this.yard = this.factory.createYard(
            this.field.x + this.field.w - 160,
            this.field.y + this.field.h - 120,
            140,
            100,
        );
        this.root.addChild(this.yard as any);

        this.hero = this.factory.createHero(
            this.field.x + this.field.w / 2,
            this.field.y + this.field.h / 2,
        );
        this.root.addChild(this.hero as any);

        const count: number = Math.floor(randRange(6, 12));
        for (let i = 0; i < count; i++) {
            if (this.animals.length >= 25) break;
            this.spawnAnimal();
        }

        this.spawner = new Spawner(
            this.app,
            this.root,
            this.field,
            this.animals,
            (x, y) => this.factory.createAnimal(x, y),
            2,
            5,
            25
        );
        this.patrol = new PatrolSystem(this.field);
    }

    update(dt: number): void {
        const click = this.input.consumeClick();
        if (click) this.hero.setTarget(click);

        this.hero.update(dt);

        this.group.tryCapture(this.hero, this.animals);

        this.group.updateFollowers(dt, this.hero);

        this.patrol?.update(dt, this.animals);

        for (const a of [...this.group.followers]) {
            if (this.yard.containsXY(a.x, a.y)) {
                this.score.add(1);
                this.root.removeChild(a);
                this.animals.splice(this.animals.indexOf(a), 1);
                this.group.removeFollower(a);
            }
        }

        this.clampToField(this.hero);
        for (const a of this.group.followers) this.clampToField(a);

        this.spawner?.update(dt);
    }

    destroy(): void {
        this.root.removeChildren();
        this.root.destroy({children: true});
    }

    private clampToField(obj: { x: number; y: number }) {
        obj.x = Math.min(this.field.x + this.field.w - 5, Math.max(this.field.x + 5, obj.x));
        obj.y = Math.min(this.field.y + this.field.h - 5, Math.max(this.field.y + 5, obj.y));
    }

    private spawnAnimal(): void {
        const x: number = randRange(this.field.x + 30, this.field.x + this.field.w - 30);
        const y: number = randRange(this.field.y + 30, this.field.y + this.field.h - 30);
        const animal: IAnimal = this.factory.createAnimal(x, y);
        this.animals.push(animal);
        this.root.addChild(animal as any);
    }
}
