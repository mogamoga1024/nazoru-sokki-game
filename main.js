
let isPC = true;
let drawingCanvas = null;
let sokki = null;

let mondaiList = [];

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

        // debug
        this.mondai = ["ち", "く", "わ"];
        this.kaitou = [
            速記文字一覧["ち"], 
        ];
        this.hira = "く";
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
            // this.result = isOK ? "正解" : "不正解"; // todo
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
    }
};

Vue.createApp(app).mount("#app");
