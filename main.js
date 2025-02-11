
let prevScene = "";

let isPC = true;
let otehonCanvas = null;
let drawingCanvas = null;
let sokki = null;

let mondaiList = [];

const nextMondaiInterval = 400;

const app = {
    data() {
        return {
            scene: "top", // top, countdown, game, result
            sokkiTable: [],

            mondaiListIndex: 0,
            mondai: [],
            kaitou: [],
            message: "書いてね🤔",

            hira: "",
            sokkiLength: "4mm", // todo
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
        // noop
        // debug
        this.onClickPlay();
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
    },
    methods: {
        onClickPlay() {
            // todo
            history.pushState(null, "", "");
            this.startGame();
        },

        onClickRetire() {
            history.back();
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

        canvasDrawStart(e) {
            // 左クリック以外描画不可
            if (e.buttons !== 1) {
                return;
            }
            drawingCanvas.drawStart();

            sokki = new Sokki(e.offsetX, e.offsetY);
        },

        canvasDrawEnd(e) {
            if (!drawingCanvas.canDraw) {
                return;
            }

            sokki.changeLineColorIfNeed(this.$refs.sokkiCanvas, e.offsetX, e.offsetY);
            this.sokkiLength = sokki.lineLength;
            
            drawingCanvas.drawEnd(e.offsetX, e.offsetY, sokki.lineColor.hex);

            sokki.lastUpdate(e.offsetX, e.offsetY);

            const isOK = sokki.test(this.hira);
            if (isOK) {
                this.message = "正解！😆";
                this.kaitou.push(速記文字一覧[this.hira]);
                if (this.mondai.length === this.kaitou.length) {
                    this.mondaiListIndex++;
                    const isClear = this.mondaiListIndex >= mondaiList.length;
                    // todo clearTime
                    setTimeout(() => {
                        if (isClear) {
                            // todo
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
                this.message = "違う…😢";
                drawingCanvas.clear();
            }
        },

        canvasDraw(e) {
            if (!drawingCanvas.canDraw) {
                return;
            }

            sokki.changeLineColorIfNeed(this.$refs.sokkiCanvas, e.offsetX, e.offsetY);
            this.sokkiLength = sokki.lineLength;

            drawingCanvas.draw(e.offsetX, e.offsetY, sokki.lineColor.hex);

            sokki.update(e.offsetX, e.offsetY);
        },

        startCountdown() {
            // todo
        },

        async startGame() {
            this.scene = "game";
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
                // todo
                // todo #canvas-containerのwidth, heightも変えたほうがよい
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
