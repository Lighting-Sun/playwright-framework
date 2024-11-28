class UtilsMethods {

    //Left these methods untyped because I'm not sure on how to use those in typescript, will type upon use
    public static sortLowToHighValues(arrValues) {
        return arrValues.sort((a, b) => a - b)
    }

    public static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static getSetFromRange(intMinRange: number, intMaxRange: number, intSetSize: number) {
        const setFromRange = new Set();
        do {
            let value = this.getRandomNumber(intMinRange, intMaxRange);
            if (!setFromRange.has(value)) {
                setFromRange.add(value);
            }
        } while (setFromRange.size != intSetSize);

        return setFromRange;
    }

    public static async sumArrAndFixPresicion(arrNum: number[], numPresicion: number): Promise<number> {
        const reduceArr = arrNum.reduce((acum, actual) => acum + actual);
        return Number(reduceArr.toFixed(numPresicion));
    }

    public static async fixNumberPresicion(numberToFix: number, numPresicion: number): Promise<number> {
        return Number(numberToFix.toFixed(numPresicion));
    }
}

export default UtilsMethods;
