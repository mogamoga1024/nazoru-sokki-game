
function changeLineColor(canvas, {r: red, g: green, b: blue}) {
    const context = canvas.getContext("2d", {willReadFrequently: true});
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const i = (x * 4) + (canvas.width * 4 * y);
            const a = imageData.data[i + 3];
            if (a > 0) {
                imageData.data[i + 0] = red;
                imageData.data[i + 1] = green;
                imageData.data[i + 2] = blue;
            }
        }
    }
    context.putImageData(imageData, 0, 0);
}

function trimming(imageData) {
    const data = imageData.data;
    let targetLeftX = -1;
    let targetRightX = -1;
    let targetTopY = -1;
    let targetBottomY = -1;

    // left-xを求める
    for (let col = 0; col < imageData.width; col++) {
        for (let row = 0; row < imageData.height; row++) {
            const i = row * imageData.width * 4 + col * 4;
            if (data[i + 3] > 0) {
                targetLeftX = col;
                break;
            }
        }
        if (targetLeftX !== -1) {
            break;
        }
    }

    if (targetLeftX === -1) {
        throw new Error("文字がない！！真っ白！！");
    }

    // right-xを求める
    for (let col = imageData.width - 1; col >= 0; col--) {
        for (let row = 0; row < imageData.height; row++) {
            const i = row * imageData.width * 4 + col * 4;
            if (data[i + 3] > 0) {
                targetRightX = col;
                break;
            }
        }
        if (targetRightX !== -1) {
            break;
        }
    }

    // top-yを求める
    for (let row = 0; row < imageData.height; row++) {
        for (let col = targetLeftX; col <= targetRightX; col++) {
            const i = row * imageData.width * 4 + col * 4;
            if (data[i + 3] > 0) {
                targetTopY = row;
                break;
            }
        }
        if (targetTopY !== -1) {
            break;
        }
    }

    // bottom-yを求める
    for (let row = imageData.height - 1; row >= 0; row--) {
        for (let col = targetLeftX; col <= targetRightX; col++) {
            const i = row * imageData.width * 4 + col * 4;
            if (data[i + 3] > 0) {
                targetBottomY = row;
                break;
            }
        }
        if (targetBottomY !== -1) {
            break;
        }
    }

    return {
        x: targetLeftX, y: targetTopY,
        width: targetRightX - targetLeftX + 1,
        height: targetBottomY - targetTopY + 1
    };
}

