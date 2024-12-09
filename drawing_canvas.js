

class DrawingCanvas {
    #context; #lastPosition; #canDraw;

    get canDraw() {
        return this.#canDraw;
    }

    constructor(canvas, lineWidth = 5) {
        this.#context = canvas.getContext("2d", {willReadFrequently: true});
        this.#context.lineCap = "round";
        this.#context.lineJoin = "round";
        this.#context.lineWidth = lineWidth;
        this.#context.strokeStyle = "black";

        this.#lastPosition = {x: null, y: null};
        this.#canDraw = false;
    }

    draw(x, y) {
        if(this.#canDraw === false) {
            return;
        }
    
        if (this.#lastPosition.x === null || this.#lastPosition.y === null) {
            this.#context.moveTo(x, y);
        } else {
            this.#context.moveTo(this.#lastPosition.x, this.#lastPosition.y);
        }
        this.#context.lineTo(x, y);
        this.#context.stroke();
        
        this.#lastPosition.x = x;
        this.#lastPosition.y = y;
    }
    
    drawStart() {
        this.#context.beginPath();
        this.#canDraw = true;
    }
    
    drawEnd(x, y) {
        this.draw(x, y); // クリックのみでドラッグされなかった場合、点を描画するために呼び出す。
        this.#context.closePath();
        this.#canDraw = false;
        this.#lastPosition.x = null;
        this.#lastPosition.y = null;
    }
    
    clear() {
        const canvas = this.#context.canvas;
        this.#context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
