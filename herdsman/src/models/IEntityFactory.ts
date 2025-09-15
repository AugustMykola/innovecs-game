import {IAnimal} from "./IAnimal";
import {IHero} from "./IHero";
import {IYard} from "./IYard";

export interface IEntityFactory {
    createHero(x:number, y:number): IHero
    createAnimal(x:number, y:number): IAnimal
    createYard(x: number, y: number, w: number, h: number): IYard
}