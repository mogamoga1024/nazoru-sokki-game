
function loadSound(path, _option = null, needTimeout = true) {
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
        let isCompleted = false;
        let timer = 0;
        if (needTimeout) {
            timer = setTimeout(() => {
                if (isCompleted) return;
                isCompleted = true;
                sound.isOK = sound.state() === "loaded";
                resolve(sound);
            }, 1000 * 10);
        }
        sound.once("load", () => {
            if (isCompleted) return;
            isCompleted = true;
            clearTimeout(timer);
            sound.isOK = true;
            resolve(sound);
        });
        sound.once("loaderror", () => {
            if (isCompleted) return;
            isCompleted = true;
            clearTimeout(timer);
            sound.isOK = false;
            resolve(sound);
        });
    });
}

function soundPlay(sound, callback = () => {}) {
    return new Promise(resolve => {
        // https://github.com/goldfire/howler.js/issues/1753
        if (Howler.ctx.state === "suspended" || Howler.ctx.state === "interrupted") {
            Howler.ctx.resume().then(() => {
                sound.play();
                callback();
                resolve();
            });
        }
        else {
            sound.play();
            callback();
            resolve();
        }
    });
}
