
let bgm = null;
let prevScene = "";

let gameConfig = {
    course: "", order: "", type: ""
};
let prevGameConfig = {
    course: "", order: "", type: ""
};

let isPC = true;
let otehonCanvas = null;
let drawingCanvas = null;
let sokki = null;

const nextMondaiInterval = 400;

let startTime = 0;
let nigateCountMap = null;
let renzokuMizzCount = 0;

let canClickResultBtn = false;

let is全文debug = false;

const app = {
    data() {
        return {
            scene: "top", // top, countdown, game, result
            needBgm: false,
            canClickBgmBtn: true,
            otehon: "あり",
            sokkiTable: [],

            moon: "🌑",
            soundLoadSintyoku: "",
            countdownText: "3",

            mondaiListIndex: 0,
            mondaiList: [],
            mondai: [],
            kaitou: [],
            message: "書いてね🤔",

            hira: "",

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

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                bgm?.stop();
            } else {
                this.canClickBgmBtn = true;
                this.needBgm = false;
            }
        });

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

        const params = (new URL(window.location.href)).searchParams;
        is全文debug = params.has("d");
    },
    mounted() {
        // noop
    },
    watch: {
        scene(_, oldScene) {
            prevScene = oldScene;
        }
    },
    computed: {
        mondaiSintyoku() {
            return `${this.mondaiListIndex}/${this.mondaiList.length}`;
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
            if (this.score >= 6000) {
                return "S";
            }
            else if (this.score >= 5000) {
                return "A+";
            }
            else if (this.score >= 4000) {
                return "A";
            }
            else if (this.score >= 3000) {
                return "B+";
            }
            else if (this.score >= 2000) {
                return "B";
            }
            else if (this.score >= 1000) {
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

        onMouseDownCanvas(e) {
            // 左クリック以外描画不可
            if (e.buttons !== 1) {
                return;
            }
            this.canvasDrawStart(e.offsetX, e.offsetY);
        },
        onMouseUpCanvas(e) {
            this.canvasDrawEnd(e.offsetX, e.offsetY);
        },
        onMouseMoveCanvas(e) {
            this.canvasDraw(e.offsetX, e.offsetY);
        },

        onTouchStartCanvas(e) {
            const {x, y} = this.getTouchXY(e);
            this.canvasDrawStart(x, y);
        },
        onTouchEndCanvas(e) {
            const {x, y} = this.getTouchXY(e);
            this.canvasDrawEnd(x, y);
        },
        onTouchMoveCanvas(e) {
            const {x, y} = this.getTouchXY(e);
            this.canvasDraw(x, y);
        },

        getTouchXY(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.changedTouches[0].clientX - rect.left;
            const y = e.changedTouches[0].clientY - rect.top;
            return {x, y};
        },

        canvasDrawStart(x, y) {
            drawingCanvas.drawStart();
            sokki = new Sokki(x, y);
        },

        canvasDrawEnd(x, y) {
            // 既にクリアしているなら何もしない
            if (this.mondaiListIndex >= this.mondaiList.length) {
                return;
            }

            if (!drawingCanvas.canDraw) {
                return;
            }

            sokki.changeLineColorIfNeed(this.$refs.sokkiCanvas, x, y);
            
            drawingCanvas.drawEnd(x, y, sokki.lineColor.hex);

            sokki.lastUpdate(x, y, this.hira);

            const isOK = sokki.test(this.hira);
            if (isOK || is全文debug) {
                playSound(okSound);
                this.correctCount++;
                renzokuMizzCount = 0;
                this.message = "正解！😆";
                this.kaitou.push(速記文字一覧[this.hira]);
                if (this.mondai.length === this.kaitou.length) {
                    this.mondaiListIndex++;
                    const isClear = this.mondaiListIndex >= this.mondaiList.length;
                    if (isClear) {
                        this.clearTime = performance.now() - startTime - nextMondaiInterval * (this.mondaiList.length - 1);
                    }
                    setTimeout(() => {
                        if (isClear) {
                            this.scene = "result";

                            let resultTitle = `${gameConfig.type}${gameConfig.course}`;
                            if (gameConfig.order !== "") {
                                resultTitle += `（${gameConfig.order}）`;
                            }
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
                    drawingCanvas.clear();
                    otehonCanvas.clear();
                    if (this.otehon === "あり") {
                        otehonCanvas.draw(this.hira);
                    }
                }
            }
            else if (sokki.isEmpty()) {
                drawingCanvas.clear();
            }
            else {
                playSound(ngSound);
                this.missCount++;
                renzokuMizzCount++;
                this.message = "違う…😢";
                drawingCanvas.clear();

                if (nigateCountMap.has(this.hira)) {
                    const missCount = nigateCountMap.get(this.hira);
                    nigateCountMap.set(this.hira, missCount + 1);
                }
                else {
                    nigateCountMap.set(this.hira, 1);
                }

                if (this.otehon === "なし" && renzokuMizzCount === 3) {
                    otehonCanvas.draw(this.hira);
                }
            }
        },

        canvasDraw(x, y) {
            if (!drawingCanvas.canDraw) {
                return;
            }

            sokki.changeLineColorIfNeed(this.$refs.sokkiCanvas, x, y);

            drawingCanvas.draw(x, y, sokki.lineColor.hex);

            sokki.update(x, y, this.hira);
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
            this.startCountdown(true);
        },

        onClickTweet() {
            if (!canClickResultBtn) {
                return;
            }

            const text = `なぞって覚える早稲田式速記アプリの${this.resultTitle}お手本${this.otehon}でランクは「${this.rank}」、スコアは「${this.score}」でした。`;

            const link = document.createElement("a");
            link.href = `https://twitter.com/intent/tweet?url=https://mogamoga1024.github.io/nazoru-sokki-game/&text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent("早稲田式速記")}`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.click();
        },

        onClickBgm() {
            if (!this.canClickBgmBtn) {
                return;
            }
            this.needBgm = !this.needBgm;
            if (this.needBgm) {
                if (bgm === null) {
                    this.canClickBgmBtn = false;
                    const volume = isPC ? 0.3 : 0.18;
                    loadSound("asset/bgm.mp3", {loop: true, volume}).then(sound => {
                        bgm = sound;
                        playSound(bgm, () => {
                            this.canClickBgmBtn = true;
                        });
                    });
                }
                else {
                    this.canClickBgmBtn = false;
                    playSound(bgm, () => {
                        this.canClickBgmBtn = true;
                    });
                }
            }
            else {
                bgm?.stop();
            }
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

        async startCountdown() {
            this.scene = "countdown";

            const p = func => new Promise((resolve, reject) => {
                const start = performance.now();
                const checkTime = () => {
                    if (this.scene !== "countdown") {
                        reject(new Error("countdown中にsceneが変化した"));
                    }
                    else if (performance.now() - start >= 600) {
                        func();
                        resolve();
                    } else {
                        requestAnimationFrame(checkTime);
                    }
                };
                requestAnimationFrame(checkTime);
            });

            this.countdownText = "";
            const moons = ["🌑", "🌘", "🌗", "🌖", "🌕", "🌔", "🌓", "🌒"];
            let moonIndex = 0;
            this.moon = moons[moonIndex];
            let lastTime = performance.now();
            const updateMoon = () => {
                const now = performance.now();
                if (this.countdownText !== "") {
                    return;
                }
                if (now - lastTime >= 100) {
                    lastTime = now;
                    moonIndex = (moonIndex + 1) % moons.length;
                    this.moon = moons[moonIndex];
                }
                requestAnimationFrame(updateMoon);
            };
            requestAnimationFrame(updateMoon);

            const {course, order, type} = gameConfig;
            const {course: prevCourse, order: prevOrder, type: prevType} = prevGameConfig;
            this.mondaiListIndex = 0;
            if (prevCourse === course && prevType === type && course === "基礎") {
                if (order === "ランダム") {
                    shuffle(this.mondaiList);
                }
                else if (prevOrder === "ランダム") {
                    this.mondaiList.sort((a, b) => a.id - b.id);
                }
            }
            else {
                // 音声の開放
                for (const mondai of this.mondaiList) {
                    mondai.sound.unload();
                    mondai.sound = null;
                }
                this.mondaiList = []; // 次のcreateMondaiList関数内でエラーが発生する可能性があるため必要
                this.mondaiList = await this.createMondaiList();
            }

            if (this.scene === "countdown") {
                prevGameConfig = {...gameConfig};
                this.countdownText = "3";
                await p(() => this.countdownText = "2");
                await p(() => this.countdownText = "1");
                await p(() => this.countdownText = "GO!");
                await p(() => this.startGame());
            }
        },

        async startGame() {
            this.scene = "game";
            
            // DOMのCanvasが存在しないとinitCanvasがエラーになるため待つ
            await this.$nextTick();

            this.initCanvas();
            this.initMondai();

            canClickResultBtn = false;
            this.correctCount = 0;
            this.missCount = 0;
            renzokuMizzCount = 0;
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

        async createMondaiList() {
            const {course, order, type} = gameConfig;

            let textList = [];
            const mondaiList = [];
            if (course === "基礎") {
                textList = 平仮名一覧(type);
            }
            else if (course === "実践") {
                textList = 実践問題文リスト生成(type === "全部");
            }

            // memo：デバグで問題をテキトーに作りたいときは、ここでtextListをいじる
            // textList = [
            //     "あ",
            //     "い",
            //     "う",
            //     "え",
            //     "お"
            // ];

            if (is全文debug) {
                textList = デバグ全問();
                this.mondaiListIndex = 0;
            }

            // 複数のmp3ファイルを一度にリクエストするのは負荷がかかる可能性があるため、全てをPromise.allはしない
            this.soundLoadSintyoku = "空".repeat(textList.length);
            let loadResult = "";
            for (let i = 0; i < textList.length; i += 3) {
                const batch = textList.slice(i, i + 3);
                
                const batchResults = await Promise.all(batch.map(async (text, index) => {
                    const sound = await loadSound(`asset/読み上げ/${text}.mp3`);
                    const mondai = text2mondai(text, type !== "清音" || is全文debug);
                    return {id: i + index + 1, mondai, sound, isOK: sound.isOK};
                }));

                mondaiList.push(...batchResults);

                loadResult += batchResults.map(res => res.isOK ? "可" : "不").join("");
                this.soundLoadSintyoku = loadResult + "空".repeat(textList.length - (i + batchResults.length));

                if (this.scene !== "countdown") {
                    gameConfig = {course: "", order: "", type: ""};
                    prevGameConfig = {course: "", order: "", type: ""};
                    throw new Error("問題生成中にsceneが変化した");
                }
            }

            await new Promise(r => setTimeout(r, 200));

            if (order === "ランダム") {
                shuffle(mondaiList);
            }

            return mondaiList;
        },

        initMondai() {
            this.message = "書いてね🤔";
            this.kaitou = [];
            this.mondai = this.mondaiList[this.mondaiListIndex].mondai;
            this.hira = this.mondai[0];

            drawingCanvas.clear();
            otehonCanvas.clear();
            if (this.otehon === "あり") {
                otehonCanvas.draw(this.hira);
            }

            const sound = this.mondaiList[this.mondaiListIndex].sound;
            playSound(sound);
        },
    }
};

Vue.createApp(app).mount("#app");
