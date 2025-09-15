import { Application } from 'pixi.js';
import {SceneManager} from "./core/engine/SceneManager";
import {EntityFactory} from "./core/factories/entity-factory";
import {GameScene} from "./core/scenes/game-scene";
import {MenuScene} from "./core/scenes/menu-scene";


const container = document.getElementById('app')!;

async function bootstrap() {
    const app = new Application();
    await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
        background: '#134E18'
    });
    container.appendChild(app.canvas);

    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    const sceneManager = new SceneManager(app);
    const factory = new EntityFactory();


    await sceneManager.changeScene(
        new MenuScene(app, async () => {
            await sceneManager.changeScene(new GameScene(app, factory))
        })
    );


    let last = performance.now();
    app.ticker.add(() => {
        const now = performance.now();
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        sceneManager.update(dt);
    });

}


void bootstrap();