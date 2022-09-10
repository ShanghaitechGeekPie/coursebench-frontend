const enoughDataThreshold = 3

function roundScore(score, commentNum) {
    if (score == 0) {
        if (commentNum < enoughDataThreshold) {
            return 0; // 0 = no enough data
        } else {
            return 7; // 7 = extremely bad
        }
    } else {
        return Math.floor(score) + 1
    }
}

export {
    enoughDataThreshold, 
    roundScore
}