
class OtehonCanvas {
    #context = null;

    constructor(canvas) {
        this.#context = canvas.getContext("2d", {willReadFrequently: true});
    }

    draw(hira) {
        const strSokkiCode = 速記文字一覧[hira].slice(3, 7);
        const sokkiCode = parseInt(strSokkiCode, 16);
        
        const tmpCanvas = new OffscreenCanvas(400, 400);
        const tmpContext = tmpCanvas.getContext("2d", {willReadFrequently: true});

        const hira4mmReg = /^(あ|い|う|え|お|つ|わ)$/;
        const hira16mmReg = /^(け|こ|せ|そ|て|と|ね|の|へ|ほ|め|も|よ|れ|ろ|ぺ|ぽ|しょ|にょ|ぴゅ|ぴょ)$/;
        if (hira16mmReg.test(hira)) {
            tmpContext.font = "235px Xim-Sans";
        }
        else {
            tmpContext.font = "200px Xim-Sans";
        }
        if (hira4mmReg.test(hira)) {
            tmpContext.fillStyle = "rgba(255, 0, 0, 0.5)";
        }
        else if (hira16mmReg.test(hira)) {
            tmpContext.fillStyle = "rgba(0, 0, 255, 0.5)";
        }
        else {
            tmpContext.fillStyle = "rgba(0, 255, 0, 0.5)";
        }
        tmpContext.textAlign = "center";
        tmpContext.textBaseline = "middle";
        tmpContext.fillText(String.fromCodePoint(sokkiCode), tmpCanvas.width / 2, tmpCanvas.height / 2);
        
        const tmpImageData = tmpContext.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
        const trimmed = trimming(tmpImageData);

        const sokkiImageData = tmpContext.getImageData(trimmed.x, trimmed.y, trimmed.width, trimmed.height);
        
        const canvas = this.#context.canvas;
        const dstX = (canvas.width - trimmed.width) / 2;
        const dstY = (canvas.height - trimmed.height) / 2;

        this.#context.putImageData(sokkiImageData, dstX, dstY);
    }

    clear() {
        const canvas = this.#context.canvas;
        this.#context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
