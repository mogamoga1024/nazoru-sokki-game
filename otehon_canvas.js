
class OtehonCanvas {
    #context = null;

    constructor(canvas) {
        this.#context = canvas.getContext("2d", {willReadFrequently: true});
    }

    draw(hira) {
        const strSokkiCode = 速記文字一覧[hira].slice(3, 7);
        const sokkiCode = parseInt(strSokkiCode, 16);
        const canvas = this.#context.canvas;
        this.#context.font = "200px Xim-Sans";
        this.#context.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.#context.textAlign = "center";
        this.#context.textBaseline = "middle";
        this.#context.fillText(String.fromCodePoint(sokkiCode), canvas.width / 2, canvas.height / 2);
    }

    clear() {
        const canvas = this.#context.canvas;
        this.#context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
