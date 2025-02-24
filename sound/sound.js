
function loadSound(path, _option = null) {
    const option = {
        src: [path],
        volume: 1,
        html5: true,
    };
    if (_option !== null) {
        Object.assign(option, _option);
        if (option.volume < 1) {
            // https://github.com/goldfire/howler.js/issues/1691
            option.html5 = false;
        }
    }
    const sound = new Howl(option);
    return new Promise(resolve => {
        sound.once("load", () => {
            sound.isOk = true;
            resolve(sound);
        });
        sound.once("loaderror", () => {
            sound.isOk = false;
            resolve(sound);
        });
    });
}
