
function loadSound(path) {
    const sound = new Howl({
        src: [path],
        html5: true,
    });
    return new Promise(resolve => {
        sound.once("load", () => {
            resolve(sound);
        });
        sound.once("loaderror", () => {
            resolve(sound);
        });
    });
}
