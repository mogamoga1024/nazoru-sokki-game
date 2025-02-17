
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
    #lineLength = "4mm";
    #lineColor = this.#color.line4;

    // 4mm,8mm,16mmのpx
    #line4Len = 50;
    #line8Len = 100;
    #line16Len = 200 * 1.1;

    get lineLength() {
        return this.#lineLength;
    }
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
        if (this.#lineColor === this.#color.line16) {
            return;
        }
        const len = this.#chebyshevDistance(this.#prevVertexX, this.#prevVertexY, x, y);
        if (
            this.#lineColor === this.#color.line4 &&
            len > this.#line4Len * 1.3 && len <= this.#line8Len * 1.3
        ) {
            this.#lineLength = "8mm";
            this.#lineColor = this.#color.line8;
            changeLineColor(canvas, this.#lineColor);
        }
        else if (
            this.#lineColor === this.#color.line8 &&
            len > this.#line8Len * 1.3
        ) {
            this.#lineLength = "16mm";
            this.#lineColor = this.#color.line16;
            changeLineColor(canvas, this.#lineColor);
        }
    }

    update(x, y, hira) {
        if (this.#dxList.length === 0 && this.#currentDxSign === 0) {
            this.#currentDxSign = Math.sign(this.#antiShake(x - this.#prevVertexX, hira));
        }
        else {
            const dxSign = Math.sign(x - this.#prevX);
            if (dxSign != 0 && this.#currentDxSign != dxSign) {
                const dx = this.#prevX - this.#prevVertexX;
                if (this.#antiShake(dx, hira) !== 0) {
                    this.#currentDxSign = dxSign;
                    this.#dxList.push(dx);
                    this.#prevVertexX = this.#prevX;
                }
            }
        }
        
        if (this.#dyList.length === 0 && this.#currentDySign === 0) {
            this.#currentDySign = Math.sign(this.#antiShake(y - this.#prevVertexY, hira, false));
        }
        else {
            const dySign = Math.sign(y - this.#prevY);
            if (dySign != 0 && this.#currentDySign != dySign) {
                const dy = this.#prevY - this.#prevVertexY;
                if (this.#antiShake(dy, hira, false) !== 0) {
                    this.#currentDySign = dySign;
                    this.#dyList.push(dy);
                    this.#prevVertexY = this.#prevY;
                }
            }
        }

        this.#prevX = x;
        this.#prevY = y;
    }

    lastUpdate(x, y, hira) {
        const dx = this.#antiShake(x - this.#prevVertexX, hira);
        if (dx != 0) {
            this.#dxList.push(dx);
        }
        
        const dy = this.#antiShake(y - this.#prevVertexY, hira, false);
        if (dy != 0) {
            this.#dyList.push(dy);
        }
    }

    isEmpty() {
        return this.#dxList.length === 0 && this.#dyList.length === 0;
    }

    test(hira) {
        this.#removeNoise(hira);

        console.log("-----------------");
        console.log("実際値");
        console.log(this.#dxList, this.#dyList);

        for (const pattern of sokkiData[hira].patternList) {
            console.log("期待値");
            console.log(pattern.dxList, pattern.dyList);

            const isOK = this.#testPart(this.#dxList, pattern.dxList) && this.#testPart(this.#dyList, pattern.dyList);
            if (isOK) {
                return true;
            }
        }
        return false;
    }

    #removeNoise(hira) {
        if (/^[か|き|く|け|こ]$/.test(hira)) {
            if (this.#dyList.length > 2 && Math.abs(this.#dyList[0]) < 20) {
                this.#dyList = this.#dyList.slice(-2);
            }
        }

        // 同じ符号が連続するなら加算する
        // なおlistには0が含まれていないように事前に処理されている
        // 例：[1, 2, -1, -5, 3, -4] → [3, -6, 3, -4]
        const f = list => {
            const newList = [];
            let val = 0;
            for (let i = 0; i < list.length; i++) {
                if (i === 0) {
                    val = list[i];
                }
                else if (Math.sign(val) === Math.sign(list[i])) {
                    val += list[i];
                }
                else {
                    newList.push(val);
                    val = list[i];
                }
                if (i === list.length - 1) {
                    newList.push(val);
                }
            }
            return newList;
        };

        this.#dxList = f(this.#dxList);
        this.#dyList = f(this.#dyList);
    }

    #antiShake(value, hira, isDx = true) {
        let max = 4;
        if (isDx && /^(う|つ)$/.test(hira)) {
            max = 8;
        }
        else if (/^(か|き|く|け|こ)$/.test(hira)) {
            max = 13;
        }
        if (Math.abs(value) <= max) {
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
                
                const lowAdj = 0.7;
                let highAdj = 1.3;
                let low = 0;
                
                if (expected === "4mm") {
                    eDif = this.#line4Len;
                    low = 0;
                }
                else if (expected === "8mm") {
                    eDif = this.#line8Len;
                    low = this.#line4Len * highAdj;
                }
                else if (expected === "10mm") {
                    const line10Len = this.#line8Len + this.#line4Len / 2
                    eDif = line10Len;
                    low = this.#line8Len * highAdj;
                }
                else if (expected === "16mm") {
                    eDif = this.#line16Len;
                    low = this.#line8Len * highAdj;
                }
                else if (expected === "-4mm") {
                    eDif = -this.#line4Len;
                    low = 0;
                }
                else if (expected === "-8mm") {
                    eDif = -this.#line8Len;
                    low = this.#line4Len * highAdj;
                }
                else if (expected === "-16mm") {
                    eDif = -this.#line16Len;
                    low = this.#line8Len * highAdj;
                }
                else if (expected === "8mm>=") {
                    eDif = this.#line8Len;
                    low = 1;
                }
                else if (expected === "10mm>=") {
                    const line10Len = this.#line8Len + this.#line4Len / 2
                    eDif = line10Len;
                    low = 1;
                }
                else if (expected === "16mm>=") {
                    eDif = this.#line16Len;
                    low = 1;
                }
                else if (expected === "-8mm>=") {
                    eDif = -this.#line8Len;
                    low = 1;
                }
                else if (expected === "-16mm>=") {
                    eDif = -this.#line16Len;
                    low = 1;
                }
                // else if (expected === "4mm<=") {
                //     eDif = this.#line4Len;
                //     low = Math.abs(eDif) * lowAdj;
                //     highAdj = Number.POSITIVE_INFINITY;
                // }
                // else if (expected === "8mm<=") {
                //     eDif = this.#line8Len;
                //     low = Math.abs(eDif) * lowAdj;
                //     highAdj = Number.POSITIVE_INFINITY;
                // }
                // else if (expected === "-4mm<=") {
                //     eDif = -this.#line4Len;
                //     low = Math.abs(eDif) * lowAdj;
                //     highAdj = Number.POSITIVE_INFINITY;
                // }
                // else if (expected === "-8mm<=") {
                //     eDif = -this.#line8Len;
                //     low = Math.abs(eDif) * lowAdj;
                //     highAdj = Number.POSITIVE_INFINITY;
                // }
                else if (expected === "6mm<=") {
                    const line6Len = (this.#line4Len + this.#line8Len) / 2;
                    eDif = line6Len;
                    low = Math.abs(eDif) * lowAdj;
                    highAdj = Number.POSITIVE_INFINITY;
                }
                else if (expected === "-6mm<=") {
                    const line6Len = (this.#line4Len + this.#line8Len) / 2;
                    eDif = -line6Len;
                    low = Math.abs(eDif) * lowAdj;
                    highAdj = Number.POSITIVE_INFINITY;
                }
                else if (expected === "*-1/4") {
                    eDif = actualList[i - 1] * -1 / 4;
                    low = Math.abs(eDif) * lowAdj;
                }
                else if (expected === "*-1/2") {
                    eDif = actualList[i - 1] * -1 / 2;
                    low = Math.abs(eDif) * lowAdj;
                }
                else if (expected === "*-1/4>=") {
                    eDif = actualList[i - 1] * -1 / 4;
                    low = 1;
                }
                else if (expected === "*-1/3>=") {
                    eDif = actualList[i - 1] * -1 / 3;
                    low = 1;
                }
                else if (expected === "*-1/2>=") {
                    eDif = actualList[i - 1] * -1 / 2;
                    low = 1;
                }
                else if (expected === "*-1/3<=") {
                    eDif = actualList[i - 1] * -1 / 3;
                    low = Math.abs(eDif) * lowAdj;
                    highAdj = Number.POSITIVE_INFINITY;
                }
                else if (expected === "*-2/3<=") {
                    eDif = actualList[i - 1] * -2 / 3;
                    low = Math.abs(eDif) * lowAdj;
                    highAdj = Number.POSITIVE_INFINITY;
                }
                else if (expected === "*-1/2<=") {
                    eDif = actualList[i - 1] * -1 / 2;
                    low = Math.abs(eDif) * lowAdj;
                    highAdj = Number.POSITIVE_INFINITY;
                }

                if (expected === "any") {
                    isOK = true;
                }
                else if (expected === "+") {
                    isOK = Math.sign(aDif) > 0;
                    if (!isOK) {
                        console.log("Math.sign(aDif) > 0", Math.sign(aDif));
                    }
                }
                else if (expected === "-") {
                    isOK = Math.sign(aDif) < 0;
                    if (!isOK) {
                        console.log("Math.sign(aDif) < 0", Math.sign(aDif));
                    }
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
                    if (!(Math.sign(aDif) === Math.sign(eDif))) {
                        console.log("Math.sign(aDif) === Math.sign(eDif)", Math.sign(aDif), Math.sign(eDif));
                    }
                    else if (!(Math.abs(aDif) > low)) {
                        console.log("Math.abs(aDif) > low", Math.abs(aDif), low);
                    }
                    else if (!(Math.abs(aDif) <= Math.abs(eDif) * highAdj)) {
                        console.log("Math.abs(aDif) <= Math.abs(eDif) * highAdj", Math.abs(aDif), Math.abs(eDif) * highAdj);
                    }
                }
    
                if (!isOK) {
                    break;
                }
            }
        }
        else {
            if (expectedList.at(-1) !== "any") {
                console.log("not any && actualList.length === expectedList.length", actualList.length, expectedList.length);
            }
            else {
                console.log("any && actualList.length === expectedList.length || actualList.length === expectedList.length - 1", actualList.length, expectedList.length);
            }
        }
        return isOK;
    }

    #chebyshevDistance(x1, y1, x2, y2) {
        return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }
}
