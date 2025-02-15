
let prevScene = "";

let gameConfig = {
    course: "", order: "", type: ""
};

let isPC = true;
let otehonCanvas = null;
let drawingCanvas = null;
let sokki = null;

let mondaiList = [];

const nextMondaiInterval = 400;

let startTime = 0;
let nigateCountMap = null;

let canClickResultBtn = false;

const app = {
    data() {
        return {
            scene: "top", // top, countdown, game, result
            otehon: "あり",
            sokkiTable: [],

            countdownText: "3",

            mondaiListIndex: 0,
            mondai: [],
            kaitou: [],
            message: "書いてね🤔",

            hira: "",
            sokkiLength: "4mm", // todo

            resultTitle: "",
            clearTime: 0,
            correctCount: 0,
            missCount: 0,
            nigate: "",
        };
    },
    created() {
        const mobileRegex = /iphone;|(android|nokia|blackberry|bb10;).+mobile|android.+fennec|opera.+mobi|windows phone|symbianos/i;
        const isMobileByUa = mobileRegex.test(navigator.userAgent);;
        const isMobileByClientHint = navigator.userAgentData && navigator.userAgentData.mobile;
        isPC = !isMobileByUa && !isMobileByClientHint;

        this.initSokkiTable();

        window.addEventListener("popstate", () => {
            // 進むボタンが押されたとき
            if (this.scene === "top") {
                if (prevScene === "countdown" || prevScene === "game") {
                    this.startCountdown();
                }
                else if (prevScene === "result") {
                    this.scene = "result";
                }
            }
            // 戻るボタンが押されたとき
            else if (
                this.scene === "countdown" ||
                this.scene === "game" ||
                this.scene === "result"
            ) {
                this.scene = "top";
            }
        });
    },
    mounted() {
        // debug
        
        // isPC = false;
        
        // this.onClickPlay();
    },
    watch: {
        scene(_, oldScene) {
            prevScene = oldScene;
        }
    },
    computed: {
        sintyoku() {
            return `${this.mondaiListIndex}/${mondaiList.length}`;
        },
        score() {
            const bunbo1 = this.clearTime / 1000 / 60;
            const bunbo2 = this.correctCount + this.missCount;
            if (bunbo1 === 0 || bunbo2 === 0) {
                return 0;
            }
            const s = this.correctCount / bunbo1 * Math.pow(this.correctCount / bunbo2, 3);
            return Math.floor(s * 100);
        },
        rank() {
            // todo
            if (this.score >= 8000) {
                return "S";
            }
            else if (this.score >= 7000) {
                return "A+";
            }
            else if (this.score >= 6000) {
                return "A";
            }
            else if (this.score >= 5000) {
                return "B+";
            }
            else if (this.score >= 4000) {
                return "B";
            }
            else if (this.score >= 3000) {
                return "C+";
            }
            return "C";
        },
        displayClearTime() {
            const tmp = Math.round(this.clearTime / 1000 * 10);
            return tmp / 10;
        },
        hitomoji() {
            if (this.correctCount === 0) {
                return 0;
            }
            const tmp = Math.round(this.clearTime / 1000 / this.correctCount * 10);
            return tmp / 10;
        },
        seikakuritu() {
            const bunbo = this.correctCount + this.missCount;
            if (bunbo === 0) {
                return 0;
            }
            const tmp = Math.round(this.correctCount / bunbo * 100 * 10);
            return tmp / 10;
        },
    },
    methods: {
        onClickPlay(course, order, type) {
            console.log(course, order, type);
            history.pushState(null, "", "");
            gameConfig = {course, order, type};
            this.startCountdown();
        },

        onClickRetire() {
            history.back();
        },

        onMouseDown(e) {
            // 左クリック以外描画不可
            if (e.buttons !== 1) {
                return;
            }
            this.canvasDrawStart(e.offsetX, e.offsetY);
        },
        onMouseUp(e) {
            this.canvasDrawEnd(e.offsetX, e.offsetY);
        },
        onMouseMove(e) {
            this.canvasDraw(e.offsetX, e.offsetY);
        },

        onTouchStart(e) {
            const {x, y} = this.getTouchXY(e);
            this.canvasDrawStart(x, y);
        },
        onTouchEnd(e) {
            const {x, y} = this.getTouchXY(e);
            this.canvasDrawEnd(x, y);
        },
        onTouchMove(e) {
            const {x, y} = this.getTouchXY(e);
            this.canvasDraw(x, y);
        },

        getTouchXY(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.changedTouches[0].clientX - rect.left;
            const y = e.changedTouches[0].clientY - rect.top;
            return {x, y};
        },

        initSokkiTable() {
            const hiraTable = [
                ["あ", "い", "う", "え", "お"],
                ["か", "き", "く", "け", "こ"],
                ["さ", "し", "す", "せ", "そ"],
                ["た", "ち", "つ", "て", "と"],
                ["な", "に", "ぬ", "ね", "の"],
                ["は", "ひ", "ふ", "へ", "ほ"],
                ["ま", "み", "む", "め", "も"],
                ["や", "", "ゆ", "", "よ"],
                ["ら", "り", "る", "れ", "ろ"],
                ["わ", "", "", "", ""],
                ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
                ["きゃ", "", "きゅ", "", "きょ"],
                ["しゃ", "", "しゅ", "", "しょ"],
                ["ちゃ", "", "ちゅ", "", "ちょ"],
                ["にゃ", "", "にゅ", "", "にょ"],
                ["ひゃ", "", "ひゅ", "", "ひょ"],
                ["みゃ", "", "みゅ", "", "みょ"],
                ["りゃ", "", "りゅ", "", "りょ"],
                ["ぴゃ", "", "ぴゅ", "", "ぴょ"],
            ];
    
            for (const hiraRow of hiraTable) {
                const sokkiRow = [];
                let pad = "";
                if (["さ", "た", "や", "しゃ"].includes(hiraRow[0])) {
                    pad = "top";
                }
                else if (["は", "ら", "ぱ", "ぴゃ"].includes(hiraRow[0])) {
                    pad = "bottom";
                }
                for (const hira of hiraRow) {
                    let sokki = "";
                    if (hira !== "") {
                        sokki = 速記文字一覧[hira];
                    }
                    sokkiRow.push({hira, sokki, pad});
                }
                this.sokkiTable.push(sokkiRow);
            }
        },

        canvasDrawStart(x, y) {
            drawingCanvas.drawStart();
            sokki = new Sokki(x, y);
        },

        canvasDrawEnd(x, y) {
            // 既にクリアしているなら何もしない
            if (this.mondaiListIndex >= mondaiList.length) {
                return;
            }

            if (!drawingCanvas.canDraw) {
                return;
            }

            sokki.changeLineColorIfNeed(this.$refs.sokkiCanvas, x, y);
            this.sokkiLength = sokki.lineLength;
            
            drawingCanvas.drawEnd(x, y, sokki.lineColor.hex);

            sokki.lastUpdate(x, y);

            const isOK = sokki.test(this.hira);
            if (isOK) {
                this.correctCount++;
                this.message = "正解！😆";
                this.kaitou.push(速記文字一覧[this.hira]);
                if (this.mondai.length === this.kaitou.length) {
                    this.mondaiListIndex++;
                    const isClear = this.mondaiListIndex >= mondaiList.length;
                    if (isClear) {
                        this.clearTime = performance.now() - startTime - nextMondaiInterval * (mondaiList.length - 1);
                    }
                    setTimeout(() => {
                        if (isClear) {
                            this.scene = "result";

                            let resultTitle = `${gameConfig.type}${gameConfig.course}`;
                            if (gameConfig.order !== "") {
                                resultTitle += `（${gameConfig.order}）`;
                            }
                            resultTitle += `<br>お手本${this.otehon}`;
                            this.resultTitle = resultTitle;

                            const nigateList = Array.from(nigateCountMap).sort((a, b) => b[1] - a[1]).map(a => a[0]);
                            if (nigateList.length === 0) {
                                this.nigate = "ない！";
                            }
                            else {
                                this.nigate = nigateList.slice(0, 3).join(" ");
                            }

                            // リザルト画面のボタンを思わぬ形で押してほしくないため
                            setTimeout(() => {
                                canClickResultBtn = true;
                            }, 800);
                        }
                        else {
                            this.initMondai();
                        }
                    }, nextMondaiInterval);
                }
                else {
                    this.hira = this.mondai[this.kaitou.length];
                    otehonCanvas.clear();
                    drawingCanvas.clear();
                    otehonCanvas.draw(this.hira);
                }
            }
            else {
                this.missCount++;
                this.message = "違う…😢";
                drawingCanvas.clear();

                if (nigateCountMap.has(this.hira)) {
                    const missCount = nigateCountMap.get(this.hira);
                    nigateCountMap.set(this.hira, missCount + 1);
                }
                else {
                    nigateCountMap.set(this.hira, 1);
                }
            }
        },

        canvasDraw(x, y) {
            if (!drawingCanvas.canDraw) {
                return;
            }

            sokki.changeLineColorIfNeed(this.$refs.sokkiCanvas, x, y);
            this.sokkiLength = sokki.lineLength;

            drawingCanvas.draw(x, y, sokki.lineColor.hex);

            sokki.update(x, y);
        },

        onClickResultEnd() {
            if (!canClickResultBtn) {
                return;
            }
            history.back();
        },

        onClickResultTudukeru() {
            if (!canClickResultBtn) {
                return;
            }
            this.startCountdown();
        },

        onClickTweet() {
            if (!canClickResultBtn) {
                return;
            }

            // todo

            // const text = `四択で覚える早稲田式速記アプリの${this.resultTitle}でランクは「${this.rank}」、スコアは「${this.score}」でした。`;

            // const link = document.createElement("a");
            // link.href = `https://twitter.com/intent/tweet?url=https://mogamoga1024.github.io/nazoru-sokki-game/&text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent("早稲田式速記")}`;
            // link.target = "_blank";
            // link.rel = "noopener noreferrer";
            // link.click();
        },

        async startCountdown() {
            this.scene = "countdown";

            const p = func => new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (this.scene !== "countdown") {
                        reject("countdown中にsceneが変化した");
                        return;
                    }
                    func();
                    resolve();
                }, 600);
            });

            this.countdownText = "3"
            await p(() => this.countdownText = "2");
            await p(() => this.countdownText = "1");
            await p(() => this.countdownText = "GO!");
            await p(() => this.startGame());
        },

        async startGame() {
            this.scene = "game";
            const {course, order, type} = gameConfig;
            // todo
            mondaiList = [
                ["ぺ", "と"],
                ["ち", "く", "わ"],
                ["な"],
                ["あ", "い"],
            ];
            this.mondaiListIndex = 0;

            // DOMのCanvasが存在しないとinitCanvasがエラーになるため待つ
            await this.$nextTick();

            this.initCanvas();
            this.initMondai();

            canClickResultBtn = false;
            this.correctCount = 0;
            this.missCount = 0;
            this.clearTime = 0;
            startTime = performance.now();
            this.nigate = "";
            nigateCountMap = new Map();
        },

        initCanvas() {
            if (isPC) {
                // width, heightはcssと合わせる
                this.$refs.otehonCanvas.width = 400;
                this.$refs.otehonCanvas.height = 250;
                this.$refs.sokkiCanvas.width = 400;
                this.$refs.sokkiCanvas.height = 250;
            }
            else {
                const clientWidth = document.body.clientWidth;
                const canvasWidth = Math.floor(clientWidth * 0.9);
                this.$refs.canvasContainer.style.width = `${canvasWidth}px`;
                this.$refs.otehonCanvas.style.width = `${canvasWidth}px`;
                this.$refs.sokkiCanvas.style.width = `${canvasWidth}px`;
                this.$refs.otehonCanvas.width = canvasWidth;
                this.$refs.otehonCanvas.height = 250;
                this.$refs.sokkiCanvas.width = canvasWidth;
                this.$refs.sokkiCanvas.height = 250;
            }
            otehonCanvas = new OtehonCanvas(this.$refs.otehonCanvas);
            drawingCanvas = new DrawingCanvas(this.$refs.sokkiCanvas);
        },

        initMondai() {
            this.message = "書いてね🤔";
            this.kaitou = [];
            this.mondai = mondaiList[this.mondaiListIndex];
            this.hira = this.mondai[0];

            otehonCanvas.clear();
            drawingCanvas.clear();
            otehonCanvas.draw(this.hira);
        },
    }
};

Vue.createApp(app).mount("#app");
