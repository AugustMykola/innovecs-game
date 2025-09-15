import { distance } from '../core/utils';
import {IHero} from "../models/IHero";
import {IAnimal} from "../models/IAnimal";


export class GroupManager {
    private maxGroup = 5;
    private captureRadius = 40;
    private formation: { x: number; y: number }[] = [
        { x: -24, y: -24 },
        { x: 24, y: -24 },
        { x: -24, y: 24 },
        { x: 24, y: 24 },
        { x: 0, y: 48 },
    ];


    followers: IAnimal[] = [];


    tryCapture(hero: IHero, animals: IAnimal[]) {
        if (this.followers.length >= this.maxGroup) return;
        for (const a of animals) {
            if (a.state === 'follow') continue;
            if (distance(hero, a) <= this.captureRadius) {
                const slot = this.formation[this.followers.length];
                a.setFollow(slot);
                this.followers.push(a);
                if (this.followers.length >= this.maxGroup) break;
            }
        }
    }


    updateFollowers(dt: number, hero: IHero) {
        for (const a of this.followers) {
            a.updateFollow(dt, hero);
        }
    }


    removeFollower(a: IAnimal) {
        const i = this.followers.indexOf(a);
        if (i >= 0) this.followers.splice(i, 1);
        a.setIdle();
    }


    clear() {
        for (const a of this.followers) a.setIdle();
        this.followers.length = 0;
    }
}