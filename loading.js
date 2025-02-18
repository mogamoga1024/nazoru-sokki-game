
let okSound = null;
let ngSound = null;

{
    let completeCount = 0;

    Promise.all([
        Sound.loadSound("asset/ピコン.mp3"),
        Sound.loadSound("asset/プホッ.mp3"),
    ]).then((result) => {
        completeCount++;
        okSound = result[0];
        ngSound = result[1];
        endIfEnd();
    });

    document.fonts.onloadingdone = () => {
        completeCount++;
        endIfEnd();
    };

    document.fonts.ready.then(() => {
        completeCount++;
        endIfEnd();
    });

    function endIfEnd() {
        if (completeCount >= 2) {
            const $loading = document.querySelector("#loading");
            const $app = document.querySelector("#app");
            $loading.style.display = "none";
            $app.style.display = "";
        }
    }
}
