function generateBoxes(num) {
    let rowNum = 0;
    let colNum = 0;
    const randomGlows = randomStart(num);
    console.log(randomGlows);
    return Array.from({length:num}).map((x,i) => {
        if(rowNum === 5)
        {   
            rowNum = 0;
            colNum += 1;
        } 
        if(colNum === 5) {
            rowNum += 1;
            colNum = 0;
        }
        return {id: i, glow: !!randomGlows[i], rowNum: rowNum, colNum: colNum++};
    });
}

function randomStart(num) {
    let glowObj = {};
    //method 1
    Array.from({length:4}).map(cell => {
        const randomId = Math.floor(Math.random() * num); 
        if(glowObj[randomId]) {
            glowObj[Math.floor(Math.random() * num)] = 'o';
        } 
        glowObj[randomId] = 'o';
        return randomId;
    });
    //method 2 -- index not working as per login coz the random numbers cannot be keys in a spread operator
    // const randomArray = Array.from({length:4}).map(cell => {
    //     const randomId = Math.floor(Math.random() * num);
    //     return randomId;
    // });
    // glowObj = {...randomArray};
    return glowObj;
}

export {generateBoxes};