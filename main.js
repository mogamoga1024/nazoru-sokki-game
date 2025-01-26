
let mondaiList = [];

const app = {
    data() {
        return {
            scene: "game", // top, countdown, game, result
            mondaiListIndex: 0,
            mondai: [],
            kaitou: [],
            message: "選んでね🤔",
        };
    },
    created() {
        // debug
        this.mondai = ["あ", "い", "う", "え", "お"];
    },
    computed: {
        sintyoku() {
            return `${this.mondaiListIndex}/${mondaiList.length}`;
        },
    },
    methods: {

    }
};

Vue.createApp(app).mount("#app");
