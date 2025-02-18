
class Sound {
    #audio = null;
    constructor(audio, volume = 1) {
        this.#audio = audio;
        this.#audio.volume = volume;
    }

    static loadSound(path, volume = 1) {
        const audio = new Audio(path);
        return new Promise(resolve => {
            audio.oncanplaythrough = () => {
                resolve(new Sound(audio, volume));
            };
            audio.onerror = () => {
                resolve(new Sound(audio, volume));
            };
        });
    }

    play() {
        this.reset();
        this.#audio.play();
    }
    stop() {
        this.#audio.pause();
    }
    reset() {
        if (!this.#audio.paused) {
            this.#audio.pause();
        }
        this.#audio.currentTime = 0;
    }
}
