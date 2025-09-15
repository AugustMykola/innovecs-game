export class Score {
    private el: HTMLElement;
    private _score = 0;
    constructor(elementId = 'score') {
        const el = document.getElementById(elementId);
        if (!el) throw new Error('Score element not found');
        this.el = el;
        this.render();
    }
    add(n = 1) { this._score += n; this.render(); }
    get value() { return this._score; }
    private render() { this.el.textContent = `Score: ${this.value}`; }
}