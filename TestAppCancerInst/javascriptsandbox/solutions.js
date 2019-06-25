
//remove the property of an object
export function removeProperty (obj, prop){
    if(obj[prop]){
        delete obj[prop];
        return true;
    }
    return false;
}


//average the 2 number
export function average(a, b){
    if(isNaN(a+b))
        return 0;
    else
     return  (a + b) / 2;
}


//average array of numbers
export function averageArray(arr){
    //are all the values number?
    let sum = arr.reduce((previousv, currentv) => currentv += previousv);
    if(isNaN(sum))
        return 0;
    else
     return  sum / arr.length;

}


//checks if any of the elements in an array pass a test
export function checkAge(val){
    return val >= 20;
} 

export function findStringsOfGreaterSize(val){
    return val.length >= 8;
} 