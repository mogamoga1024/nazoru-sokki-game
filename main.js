
let isPC = true;
let drawingCanvas = null;
let sokki = null;

let mondaiList = [];

const nextMondaiInterval = 400;

const app = {
    data() {
        return {
            scene: "game", // top, countdown, game, result

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
    },
    mounted() {
        if (isPC) {
            // width, heightはcssと合わせる
            this.$refs.canvas.width = 400;
            this.$refs.canvas.height = 250;
        }
        else {
            // todo
        }
        drawingCanvas = new DrawingCanvas(this.$refs.canvas);

        // debug
        this.startGame();
    },
    computed: {
        sintyoku() {
            return `${this.mondaiListIndex}/${mondaiList.length}`;
        },
    },
    methods: {
        onClickRetire() {
            // todo
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

            sokki.changeLineColorIfNeed(this.$refs.canvas, e.offsetX, e.offsetY);
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
                    drawingCanvas.clear();
                    this.addOtehon();
                }
            }
            else {
                this.message = "違う…😢";
                drawingCanvas.clear();
                this.addOtehon();
            }
        },

        canvasDraw(e) {
            if (!drawingCanvas.canDraw) {
                return;
            }

            sokki.changeLineColorIfNeed(this.$refs.canvas, e.offsetX, e.offsetY);
            this.sokkiLength = sokki.lineLength;

            drawingCanvas.draw(e.offsetX, e.offsetY, sokki.lineColor.hex);

            sokki.update(e.offsetX, e.offsetY);
        },

        addOtehon() {
            const strSokkiCode = 速記文字一覧[this.hira].slice(3, 7);
            const sokkiCode = parseInt(strSokkiCode, 16);
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d");
            context.font = "200px Xim-Sans";
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(String.fromCodePoint(sokkiCode), canvas.width / 2, canvas.height / 2);
        },

        startGame() {
            // todo
            mondaiList = [
                ["ち", "く", "わ"],
                ["な"],
                ["あ", "い"]
            ];
            this.mondaiListIndex = 0;
            this.initMondai();
        },

        initMondai() {
            this.message = "書いてね🤔";
            this.kaitou = [];
            this.mondai = mondaiList[this.mondaiListIndex];
            this.hira = this.mondai[0];

            // debug
            drawingCanvas.clear();
            this.addOtehon();
        },
    }
};

Vue.createApp(app).mount("#app");
