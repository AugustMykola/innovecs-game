// import { Graphics } from 'pixi.js';
//
//
// export class FollowTrail extends Graphics {
//     constructor() {
//         super();
//         this.alpha = 0.15;
//     }
//     drawOffsets(points: {x:number;y:number}[], originX: number, originY: number) {
//         this.clear();
//         this.lineStyle({ color: 0xffffff, width: 1 });
//         for (const p of points) {
//             this.drawCircle(originX + p.x, originY + p.y, 3);
//         }
//     }
// }