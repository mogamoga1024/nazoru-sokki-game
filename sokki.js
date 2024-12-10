
function sokkiTest(actualList, expectedList) {
    let isOK = false;
    if (actualList.length === expectedList.length) {
        for (let i = 0; i < actualList.length; i++) {
            const aDif = actualList[i];
            let eDif = expectedList[i];

            if (eDif === "-1/2") {
                eDif = actualList[i - 1] * -1 / 2;
            }

            if (eDif === "+") {
                isOK = Math.sign(aDif) > 0;
            }
            else if (eDif === "-") {
                isOK = Math.sign(aDif) < 0;
            }
            else if (
                Math.sign(aDif) === Math.sign(eDif) &&
                Math.abs(aDif) >= Math.abs(eDif) * 0.7 &&
                Math.abs(aDif) <= Math.abs(eDif) * 1.3
            ) {
                isOK = true;
            }
            else {
                isOK = false;
            }

            if (!isOK) {
                break;
            }
        }
    }
    return isOK;
}

