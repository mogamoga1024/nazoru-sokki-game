
function loadSound(path, _option = null) {
    const option = {
        src: [path],
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
        let flg = false;
        sound.once("load", () => {
            if (!flg) {
                flg = true;
                resolve(sound);
            }
        });
        sound.once("loaderror", () => {
            if (!flg) {
                flg = true;
                resolve(sound);
            }
        });
    });
}
