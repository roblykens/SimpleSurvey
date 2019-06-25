
import { average, averageArray, removeProperty, checkAge, findStringsOfGreaterSize } from "./solutions.js";

const runAverage = false;
const runAverageArray = false;
const RemoveAPropery = false;
const runSome = true;

//#region Average
//----------------------------------------------------------------------
// average of two numbers
//----------------------------------------------------------------------
if (runAverage) {
    const a = 20, b = 200;
    console.log(average(a, b));
}
//----------------------------------------------------------------------
//#endregion

//#region Average Array
//----------------------------------------------------------------------
// average array of numbers
//----------------------------------------------------------------------
if (runAverageArray) {
    const arr = [20, 200];
    console.log(averageArray(arr));
}
//----------------------------------------------------------------------
//#endregion

//#region Remove a propery
//----------------------------------------------------------------------
// Remove a propery solution
//----------------------------------------------------------------------
//object
if (RemoveAPropery) {
    var obj = {
        "babe": "hot",
        "whatIwant": "suck my dick",
        "when": new Date()
    }

    //remove the object's property
    console.log(JSON.stringify(obj));
    const v = removeProperty(obj, "babe");
    console.log(JSON.stringify(obj));
}
//----------------------------------------------------------------------
//#endregion


//#region javascript some()
//----------------------------------------------------------------------
// javascript some()
//----------------------------------------------------------------------
if (runSome) {
    let ageMax = 103;
    let wordMax = 20;

    //check for ages greater than 20
    let arr = [10, 12, 14, 16, 18, 20, 22, 23, 26, 30, 102];
    console.log( arr.some((age) => age >= ageMax) );
    console.log( arr.some(checkAge) );

    //check for string lengths greater than 8
    arr = ['I','Love','Emily','Sex','Eating','A lot of Money','Expressions','Orgasems','Pornography'];
    console.log( arr.some((word) => word.length >= wordMax) );
    console.log( arr.some(findStringsOfGreaterSize) ); 
}
//----------------------------------------------------------------------
//#endregion