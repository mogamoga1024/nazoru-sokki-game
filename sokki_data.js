
// anyは末尾のみOK

const sokkiData = {    
    "あ": {
        patternList: [
            {
                dxList: ["4mm"],
                dyList: ["+", "-"]
            }
        ]
    },
    "い": {
        patternList: [
            {
                dxList: ["4mm"],
                dyList: ["-", "+"]
            }
        ]
    },
    "う": {
        patternList: [
            {
                dxList: [],
                dyList: ["4mm"]
            }
        ]
    },
    "え": {
        patternList: [
            {
                dxList: ["4mm"],
                dyList: ["4mm"]
            }
        ]
    },
    "お": {
        patternList: [
            {
                dxList: ["-4mm"],
                dyList: ["4mm"]
            }
        ]
    },
    "か": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: []
            }
        ]
    },
    "き": {
        patternList: [
            {
                dxList: ["8mm", "*-1/4>=", "any"],
                dyList: ["-", "+"]
            }
        ]
    },
    "く": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "any"],
                dyList: ["-", "+"]
            }
        ]
    },
    "け": {
        patternList: [
            {
                dxList: ["16mm", "*-1/4>=", "any"],
                dyList: ["-", "+"]
            }
        ]
    },
    "こ": {
        patternList: [
            {
                dxList: ["16mm"],
                dyList: []
            }
        ]
    },
    "さ": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: ["-8mm>="]
            },
            {
                dxList: ["8mm>="],
                dyList: ["-8mm"]
            }
        ]
    },
    "し": {
        patternList: [
            {
                dxList: ["8mm", "*-1/4>=", "any"],
                dyList: ["-8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["-8mm", "*-1/4>=", "any"]
            }
        ]
    },
    "す": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "any"],
                dyList: ["-8mm>=", "+", "any"]
            },
            {
                dxList: ["8mm>=", "-", "any"],
                dyList: ["-8mm", "*-1/2<=", "any"]
            }
        ]
    },
    "せ": {
        patternList: [
            {
                dxList: ["16mm", "*-1/4>=", "any"],
                dyList: ["-16mm>=", "+", "any"]
            },
            {
                dxList: ["16mm>=", "-", "any"],
                dyList: ["-16mm", "*-1/4>=", "any"]
            }
        ]
    },
    "そ": {
        patternList: [
            {
                dxList: ["16mm"],
                dyList: ["-"]
            },
            {
                dxList: ["+"],
                dyList: ["-16mm"]
            }
        ]
    },
    "た": {
        patternList: [
            {
                dxList: ["-"],
                dyList: ["8mm"]
            }
        ]
    },
    "ち": {
        patternList: [
            {
                dxList: ["-", "+"],
                dyList: ["8mm", "*-1/4>=", "any"]
            }
        ]
    },
    "つ": {
        patternList: [
            {
                dxList: ["-", "+"],
                dyList: ["4mm", "*-1/3>=", "any"]
            }
        ]
    },
    "て": {
        patternList: [
            {
                dxList: ["16mm", "*-1/4>=", "any"],
                dyList: ["-16mm>=", "+", "any"]
            },
            {
                dxList: ["16mm>=", "-", "any"],
                dyList: ["-16mm", "*-1/4>=", "any"]
            }
        ]
    },
    "と": {
        patternList: [
            {
                dxList: ["16mm"],
                dyList: ["-"]
            },
            {
                dxList: ["+"],
                dyList: ["-16mm"]
            }
        ]
    },
    "な": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: ["+", "-"]
            }
        ]
    },
    "に": {
        patternList: [
            {
                dxList: ["8mm", "*-1/4>=", "any"],
                dyList: ["+", "-", "+"]
            }
        ]
    },
    "ぬ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "any"],
                dyList: ["+", "-", "+"]
            }
        ]
    },
    "ね": {
        patternList: [
            {
                dxList: ["16mm", "*-1/4>=", "any"],
                dyList: ["+", "-", "+"]
            }
        ]
    },
    "の": {
        patternList: [
            {
                dxList: ["16mm"],
                dyList: ["+", "-"]
            }
        ]
    },
    "は": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: ["8mm>="]
            },
            {
                dxList: ["8mm>="],
                dyList: ["8mm"]
            }
        ]
    },
    "ひ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/4>=", "any"],
                dyList: ["8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["8mm", "*-1/4>=", "any"]
            }
        ]
    },
    "ふ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "any"],
                dyList: ["8mm>=", "+", "any"]
            },
            {
                dxList: ["8mm>=", "-", "any"],
                dyList: ["8mm", "*-1/2<=", "any"]
            }
        ]
    },
    "へ": {
        patternList: [
            {
                dxList: ["16mm", "*-1/4>=", "any"],
                dyList: ["16mm>=", "-", "any"]
            },
            {
                dxList: ["16mm>=", "-", "any"],
                dyList: ["16mm", "*-1/4>=", "any"]
            }
        ]
    },
    "ほ": {
        patternList: [
            {
                dxList: ["16mm"],
                dyList: ["+"]
            },
            {
                dxList: ["+"],
                dyList: ["16mm"]
            }
        ]
    },
    "ま": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: ["-", "+"]
            }
        ]
    },
    "み": {
        patternList: [
            {
                dxList: ["8mm", "*-1/4>=", "any"],
                dyList: ["-", "+", "-"]
            }
        ]
    },
    "む": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "any"],
                dyList: ["-", "+", "-"]
            }
        ]
    },
    "め": {
        patternList: [
            {
                dxList: ["16mm", "*-1/4>=", "any"],
                dyList: ["-", "+", "-"]
            }
        ]
    },
    "も": {
        patternList: [
            {
                dxList: ["16mm"],
                dyList: ["-", "+"]
            }
        ]
    },
    "や": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: ["-8mm>="]
            },
            {
                dxList: ["8mm>="],
                dyList: ["-8mm"]
            }
        ]
    },
    "ゆ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/4>=", "any"],
                dyList: ["-8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["-8mm", "*-1/4>=", "any"]
            }
        ]
    },
    "よ": {
        patternList: [
            {
                dxList: ["16mm"],
                dyList: ["-"]
            },
            {
                dxList: ["+"],
                dyList: ["-16mm"]
            }
        ]
    },
    "ら": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "り": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "る": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "れ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ろ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "わ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぱ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぴ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぷ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぺ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぽ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "きゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "きゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "きょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "しゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "しゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "しょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ちゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ちゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ちょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "にゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "にゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "にょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ひゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ひゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ひょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "みゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "みゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "みょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "りゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "りゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "りょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぴゃ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぴゅ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    },
    "ぴょ": {
        patternList: [
            {
                dxList: [],
                dyList: []
            }
        ]
    }
};

