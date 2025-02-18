
// anyは末尾のみOK
// 速記のデータを書くのが心底苦痛だったのでかなりテキトーになっています

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
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["-", "any"] // "any"ではなく"+"のほうが正しいが、手振れ補正との調整がむずい…
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
                dxList: ["16mm", "*-1/3>=", "any"],
                dyList: ["-", "any"] // "any"ではなく"+"のほうが正しいが、手振れ補正との調整がむずい…
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
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["-8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["-8mm", "*-1/3>=", "any"]
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
                dxList: ["16mm", "*-1/3>=", "any"],
                dyList: ["-16mm>=", "+", "any"]
            },
            {
                dxList: ["16mm>=", "-", "any"],
                dyList: ["-16mm", "*-1/3>=", "any"]
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
                dyList: ["8mm", "*-1/3>=", "any"]
            }
        ]
    },
    "つ": {
        patternList: [
            {
                dxList: ["-", "any"], // "any"ではなく"+"のほうが正しいが、手振れ補正との調整がむずい…
                dyList: ["4mm", "*-1/3>=", "any"]
            }
        ]
    },
    "て": {
        patternList: [
            {
                dxList: ["16mm", "*-1/3>=", "any"],
                dyList: ["-16mm>=", "+", "any"]
            },
            {
                dxList: ["16mm>=", "-", "any"],
                dyList: ["-16mm", "*-1/3>=", "any"]
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
                dxList: ["8mm", "*-1/3>=", "any"],
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
                dxList: ["16mm", "*-1/3>=", "any"],
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
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["8mm", "*-1/3>=", "any"]
            }
        ]
    },
    "ふ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "any"],
                dyList: ["8mm>=", "-", "any"]
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
                dxList: ["16mm", "*-1/3>=", "any"],
                dyList: ["16mm>=", "-", "any"]
            },
            {
                dxList: ["16mm>=", "-", "any"],
                dyList: ["16mm", "*-1/3>=", "any"]
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
                dxList: ["8mm", "*-1/3>=", "any"],
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
                dxList: ["16mm", "*-1/3>=", "any"],
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
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["-8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["-8mm", "*-1/3>=", "any"]
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
                dxList: ["8mm"],
                dyList: ["8mm>="]
            },
            {
                dxList: ["8mm>="],
                dyList: ["8mm"]
            }
        ]
    },
    "り": {
        patternList: [
            {
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["8mm", "*-1/3>=", "any"]
            }
        ]
    },
    "る": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "any"],
                dyList: ["8mm>=", "-", "any"]
            },
            {
                dxList: ["8mm>=", "-", "any"],
                dyList: ["8mm", "*-1/2<=", "any"]
            }
        ]
    },
    "れ": {
        patternList: [
            {
                dxList: ["16mm", "*-1/3>=", "any"],
                dyList: ["16mm>=", "-", "any"]
            },
            {
                dxList: ["16mm>=", "-", "any"],
                dyList: ["16mm", "*-1/3>=", "any"]
            }
        ]
    },
    "ろ": {
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
    "わ": {
        patternList: [
            {
                dxList: ["-", "+"],
                dyList: ["4mm"]
            }
        ]
    },
    "ぱ": {
        patternList: [
            {
                dxList: ["-", "+"],
                dyList: ["8mm", "any"]
            }
        ]
    },
    "ぴ": {
        patternList: [
            {
                dxList: ["-", "+", "-", "any"],
                dyList: ["8mm", "-", "+", "any"]
            }
        ]
    },
    "ぷ": {
        patternList: [
            {
                dxList: ["-", "any"],
                dyList: ["16mm"]
            }
        ]
    },
    "ぺ": {
        patternList: [
            {
                dxList: ["-", "+", "-", "any"],
                dyList: ["16mm", "-", "*-1/2>=", "any"]
            }
        ]
    },
    "ぽ": {
        patternList: [
            {
                dxList: ["-", "+", "-", "any"],
                dyList: ["16mm", "-", "*-1/2<="]
            }
        ]
    },
    "きゃ": {
        patternList: [
            {
                dxList: ["-", "+"],
                dyList: ["8mm"]
            }
        ]
    },
    "きゅ": {
        patternList: [
            {
                dxList: ["-", "+", "any"],
                dyList: ["8mm", "*-1/2>=", "+"]
            }
        ]
    },
    "きょ": {
        patternList: [
            {
                dxList: ["-", "+", "any"],
                dyList: ["8mm", "*-1/2<=", "+"]
            }
        ]
    },
    "しゃ": {
        patternList: [
            {
                dxList: ["+", "-"],
                dyList: ["8mm"]
            }
        ]
    },
    "しゅ": {
        patternList: [
            {
                dxList: ["+", "-", "any"],
                dyList: ["8mm", "*-1/2>=", "any"]
            }
        ]
    },
    "しょ": {
        patternList: [
            {
                dxList: ["16mm", "*-1/2<=", "any"],
                dyList: ["-", "+", "any"]
            },
            {
                dxList: ["+", "-", "any"],
                dyList: ["-16mm", "*-1/2<=", "any"]
            }
        ]
    },
    "ちゃ": {
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
    "ちゅ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/3>=", "any"], // "*-1/3>="だとうまくいかないことが多かった
                dyList: ["-8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-1/2>=", "any"],
                dyList: ["-8mm", "*-1/3>=", "any"]
            }
        ]
    },
    "ちょ": {
        patternList: [
            {
                dxList: ["8mm", "*-2/3<=", "any"],
                dyList: ["-8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["8mm>=", "*-2/3<=", "any"],
                dyList: ["-8mm", "*-1/3>=", "any"]
            }
        ]
    },
    "にゃ": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: ["+", "-"]
            }
        ]
    },
    "にゅ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["+", "-5mm<=", "+"]
            }
        ]
    },
    "にょ": {
        patternList: [
            {
                dxList: ["16mm", "*-1/2<=", "any"],
                dyList: ["+", "-", "+"]
            }
        ]
    },
    "ひゃ": {
        patternList: [
            {
                dxList: ["-8mm"],
                dyList: ["8mm>="]
            },
            {
                dxList: ["-8mm>="],
                dyList: ["8mm"]
            }
        ]
    },
    "ひゅ": {
        patternList: [
            {
                dxList: ["-8mm", "*-1/3>=", "any"],
                dyList: ["8mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["-8mm>=", "*-1/2>=", "any"],
                dyList: ["8mm", "*-1/3>=", "any"]
            }
        ]
    },
    "ひょ": {
        patternList: [
            {
                dxList: ["-8mm", "*-1/2<=", "any"],
                dyList: ["8mm>=", "-", "any"]
            },
            {
                dxList: ["-8mm>=", "+", "any"],
                dyList: ["8mm", "*-1/2<=", "any"]
            }
        ]
    },
    "みゃ": {
        patternList: [
            {
                dxList: ["8mm"],
                dyList: ["-", "+"]
            }
        ]
    },
    "みゅ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["-", "5mm<=", "-"]
            },
            {
                dxList: ["8mm", "*-1/3>=", "any"],
                dyList: ["-", "+", "-5mm<=", "+"]
            }
        ]
    },
    "みょ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/3<=", "any"],
                dyList: ["-", "+", "-"]
            }
        ]
    },
    "りゃ": {
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
    "りゅ": {
        patternList: [
            {
                dxList: ["8mm", "*-2/3<=", "+"],
                dyList: ["8mm>=", "-", "any"]
            },
            {
                dxList: ["8mm>=", "*-2/3<=", "+"],
                dyList: ["8mm", "-", "any"]
            }
        ]
    },
    "りょ": {
        patternList: [
            {
                dxList: ["8mm", "*-1/2<=", "+"],
                dyList: ["10mm>=", "-"]
            },
            {
                dxList: ["8mm>=", "*-1/2<=", "+"],
                dyList: ["10mm", "-"]
            }
        ]
    },
    "ぴゃ": {
        patternList: [
            {
                dxList: ["-8mm"],
                dyList: ["8mm>="]
            },
            {
                dxList: ["-8mm>="],
                dyList: ["8mm"]
            }
        ]
    },
    "ぴゅ": {
        patternList: [
            {
                dxList: ["-16mm", "*-1/3>=", "any"],
                dyList: ["16mm>=", "*-1/2>=", "any"]
            },
            {
                dxList: ["-16mm>=", "*-1/2>=", "any"],
                dyList: ["16mm", "*-1/3>=", "any"]
            }
        ]
    },
    "ぴょ": {
        patternList: [
            {
                dxList: ["-16mm", "*-1/2<=", "any"],
                dyList: ["16mm>=", "-", "any"]
            },
            {
                dxList: ["-16mm>=", "+", "any"],
                dyList: ["16mm", "*-1/2<=", "any"]
            }
        ]
    }
};

for (const hira of "かきくけこ") {
    const patternList = sokkiData[hira].patternList;
    const base = patternList[0];
    patternList.push({
        dxList: [...base.dxList],
        dyList: ["-4mm", ...base.dyList]
    });
    patternList.push({
        dxList: [...base.dxList],
        dyList: ["4mm", ...base.dyList]
    });
}

