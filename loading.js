
let okSound = null;
let ngSound = null;

{
    let isFontLoaded = false;
    let isSoundLoaded = false;

    Promise.all([
        loadSound("asset/ピコン.mp3"),
        loadSound("asset/プホッ.mp3"),
    ]).then((result) => {
        isSoundLoaded = true;
        okSound = result[0];
        ngSound = result[1];
        endIfEnd();
    });

    document.fonts.onloadingdone = () => {
        isFontLoaded = true;
        endIfEnd();
    };

    document.fonts.ready.then(() => {
        isFontLoaded = true;
        endIfEnd();
    });

    function endIfEnd() {
        if (isFontLoaded && isSoundLoaded) {
            const $loading = document.querySelector("#loading");
            const $app = document.querySelector("#app");
            $loading.style.display = "none";
            $app.style.display = "";
        }
    }
}
