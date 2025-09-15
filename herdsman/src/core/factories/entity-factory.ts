import {IEntityFactory} from "../../models/IEntityFactory";
import {IHero} from "../../models/IHero";
import {Hero} from "../../objects/Hero";
import {IAnimal} from "../../models/IAnimal";
import {Animal} from "../../objects/Animal";
import {IYard} from "../../models/IYard";
import {Yard} from "../../objects/Yard";

export class EntityFactory implements IEntityFactory {
    createHero(x: number, y: number): IHero { return new Hero(x, y); }
    createAnimal(x: number, y: number): IAnimal {return new Animal(x, y); }
    createYard(x: number, y: number, w: number, h: number): IYard { return  new Yard(x, y, w, h)}
}