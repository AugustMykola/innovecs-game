import {Application, Container, Graphics} from 'pixi.js';
import {randRange} from './core/utils';
import {Input} from './core/Input';
import {EventBus, type EventMap} from './core/EventBus';
import {Hero} from './objects/Hero';
import {Animal} from './objects/Animal';
import {Yard} from './objects/Yard';
import {GroupManager} from './systems/GroupManager';
import {Score} from './ui/score';
import {Spawner} from './systems/Spawner';
import {PatrolSystem} from './systems/PatrolSystem';


export class Game {
    app!: Application;
    root!: Container;
    input!: Input;
    bus = new EventBus<EventMap>();

    readonly field = {x: 40, y: 40, w: 920, h: 560};

    hero!: Hero;
    yard!: Yard;
    animals: Animal[] = [];
    group = new GroupManager();
    score = new Score();

    spawner?: Spawner;
    patrol?: PatrolSystem;

    async init(viewParent: HTMLElement) {
        this.app = new Application();
        await this.app.init({width: 1000, height: 640, background: '#134E18'}); // green field bg

        viewParent.appendChild(this.app.canvas);

        this.root = new Container();
        this.app.stage.addChild(this.root);

        const border = new Graphics()
            .rect(this.field.x, this.field.y, this.field.w, this.field.h)
            .stroke({color: 0xffffff, width: 2, alpha: 0.2});
        this.root.addChild(border);

        this.input = new Input(this.app);

        this.yard = new Yard(this.field.x + this.field.w - 160, this.field.y + this.field.h - 120, 140, 100);
        this.root.addChild(this.yard);

        this.hero = new Hero(this.field.x + this.field.w / 2, this.field.y + this.field.h / 2);
        this.root.addChild(this.hero);

        const count = Math.floor(randRange(6, 12));
        for (let i = 0; i < count; i++) this.spawnAnimal();

        this.spawner = new Spawner(this.app, this.root, this.field, this.animals);
        this.patrol = new PatrolSystem();

        let last = performance.now();
        this.app.ticker.add(() => {
            const now = performance.now();
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            this.update(dt);
        });
    }

    spawnAnimal() {
        const x = randRange(this.field.x + 30, this.field.x + this.field.w - 30);
        const y = randRange(this.field.y + 30, this.field.y + this.field.h - 30);
        const a = new Animal(x, y);
        this.animals.push(a);
        this.root.addChild(a);
    }

    update(dt: number) {
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
        for (const a of this.animals) this.clampToField(a);

        this.spawner?.update(dt);
    }

    private clampToField(obj: { x: number; y: number }) {
        obj.x = Math.min(this.field.x + this.field.w - 5, Math.max(this.field.x + 5, obj.x));
        obj.y = Math.min(this.field.y + this.field.h - 5, Math.max(this.field.y + 5, obj.y));
    }

}