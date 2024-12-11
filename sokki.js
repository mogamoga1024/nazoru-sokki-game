
class Sokki {
    #color = {
        line4: {
            r: 255, g: 0, b: 0,
            hex: "#ff0000"
        },
        line8: {
            r: 0, g: 255, b: 0,
            hex: "#00ff00"
        },
        line16: {
            r: 0, g: 0, b: 255,
            hex: "#0000ff"
        },
    };

    #dxList = [];
    #dyList = [];
    #prevX = -1;
    #prevY = -1;
    #prevVertexX = -1;
    #prevVertexY = -1;
    #currentDxSign = 0;
    #currentDySign = 0;
    #lineColor = this.#color.line4;

    // 4mm,8mm,16mmのpx
    #line4Len = 50;
    #line8Len = 100;
    #line16Len = 200;

    get lineColor() {
        return this.#lineColor;
    }

    constructor(x, y) {
        this.#prevX = x;
        this.#prevY = y;
        this.#prevVertexX = x;
        this.#prevVertexY = y;
    }

    changeLineColorIfNeed(canvas, x, y) {
        const len = this.#chebyshevDistance(this.#prevVertexX, this.#prevVertexY, x, y);
        if (
            this.#lineColor === this.#color.line4 &&
            len > this.#line4Len * 1.3 && len <= this.#line8Len * 1.3
        ) {
            this.#lineColor = this.#color.line8;
            changeLineColor(canvas, this.#lineColor);
        }
        else if (
            this.#lineColor === this.#color.line8 &&
            len > this.#line8Len * 1.3
        ) {
            this.#lineColor = this.#color.line16;
            changeLineColor(canvas, this.#lineColor);
        }
    }

    update(x, y) {
        if (this.#dxList.length === 0 && this.#currentDxSign === 0) {
            this.#currentDxSign = Math.sign(this.#antiShake(x - this.#prevVertexX));
        }
        else {
            const dxSign = Math.sign(x - this.#prevX);
            if (dxSign != 0 && this.#currentDxSign != dxSign) {
                const dx = this.#prevX - this.#prevVertexX;
                if (this.#antiShake(dx) !== 0) {
                    this.#currentDxSign = dxSign;
                    this.#dxList.push(dx);
                    this.#prevVertexX = this.#prevX;
                }
            }
        }
        
        if (this.#dyList.length === 0 && this.#currentDySign === 0) {
            this.#currentDySign = Math.sign(this.#antiShake(y - this.#prevVertexY));
        }
        else {
            const dySign = Math.sign(y - this.#prevY);
            if (dySign != 0 && this.#currentDySign != dySign) {
                const dy = this.#prevY - this.#prevVertexY;
                if (this.#antiShake(dy) !== 0) {
                    this.#currentDySign = dySign;
                    this.#dyList.push(dy);
                    this.#prevVertexY = this.#prevY;
                }
            }
        }

        this.#prevX = x;
        this.#prevY = y;
    }

    lastUpdate(x, y) {
        const dx = this.#antiShake(x - this.#prevVertexX);
        if (dx != 0) {
            this.#dxList.push(dx);
        }
        
        const dy = this.#antiShake(y - this.#prevVertexY);
        if (dy != 0) {
            this.#dyList.push(dy);
        }

        console.log(this.#dxList, this.#dyList);
    }

    test(hira) {
        if (/^[か|き|く|け|こ]$/.test(hira)) {
            if (this.#dyList.length > 2 && Math.abs(this.#dyList[0]) < 20) {
                this.#dyList = this.#dyList.slice(-2);
            }
        }

        return this.#testPart(this.#dxList, sokkiData[hira].dxList) && this.#testPart(this.#dyList, sokkiData[hira].dyList);
    }

    #antiShake(value) {
        if (Math.abs(value) <= 4) {
            return 0;
        }
        else {
            return value;
        }
    }

    #testPart(actualList, expectedList) {
        let isOK = false;
        if (
            expectedList.at(-1) !== "any" && actualList.length === expectedList.length ||
            expectedList.at(-1) === "any" && (
                actualList.length === expectedList.length ||
                actualList.length === expectedList.length - 1
            )
        ) {
            if (actualList.length === 0) {
                isOK = true;
            }
            else for (let i = 0; i < actualList.length; i++) {
                const aDif = actualList[i];
                const expected = expectedList[i];
                let eDif = expected;
                let low = 0;
                const lowAdj = 0.7;
                const highAdj = 1.3;
    
                if (expected === "4mm") {
                    eDif = this.#line4Len;
                }
                else if (expected === "8mm") {
                    eDif = this.#line8Len;
                    low = this.#line4Len * highAdj;
                }
                else if (expected === "16mm") {
                    eDif = this.#line16Len;
                    low = this.#line8Len * highAdj;
                }
                else if (expected === "-4mm") {
                    eDif = -this.#line4Len;
                }
                else if (expected === "-8mm") {
                    eDif = -this.#line8Len;
                    low = this.#line4Len * highAdj;
                }
                else if (expected === "-16mm") {
                    eDif = -this.#line16Len;
                    low = this.#line8Len * highAdj;
                }
                else if (expected === "-1/4") {
                    eDif = actualList[i - 1] * -1 / 4;
                    low = Math.abs(eDif) * lowAdj;
                }
                else if (expected === "-1/2") {
                    eDif = actualList[i - 1] * -1 / 2;
                    low = Math.abs(eDif) * lowAdj;
                }
                else if (expected === "-1/4>=") {
                    eDif = actualList[i - 1] * -1 / 4;
                    low = 1;
                }
    
                if (expected === "any") {
                    isOK = true;
                }
                else if (expected === "+") {
                    isOK = Math.sign(aDif) > 0;
                }
                else if (expected === "-") {
                    isOK = Math.sign(aDif) < 0;
                }
                else if (
                    Math.sign(aDif) === Math.sign(eDif) &&
                    Math.abs(aDif) > low &&
                    Math.abs(aDif) <= Math.abs(eDif) * highAdj
                ) {
                    isOK = true;
                }
                else {
                    isOK = false;
                }
    
                if (!isOK) {
                    break;
                }
            }
        }
        return isOK;
    }

    #chebyshevDistance(x1, y1, x2, y2) {
        return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }
}
