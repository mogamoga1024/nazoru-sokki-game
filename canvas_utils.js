
function changeLineColor(canvas, red, green, blue) {
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

