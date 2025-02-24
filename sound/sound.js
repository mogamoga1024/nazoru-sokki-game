
function loadSound(path, _option = null) {
    const option = {
        src: [path],
        volume: 1,
        html5: false, // trueだとユーザー操作がどうのこうので音が鳴らない場合がある。例えユーザー操作があっても。
    };
    if (_option !== null) {
        Object.assign(option, _option);
    }
    const sound = new Howl(option);
    return new Promise(resolve => {
        sound.once("load", () => {
            sound.isOK = true;
            resolve(sound);
        });
        sound.once("loaderror", () => {
            sound.isOK = false;
            resolve(sound);
        });
    });
}
