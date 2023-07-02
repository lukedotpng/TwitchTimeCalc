// Calculate any time from given score under 5 minutes

function calculatePossibleTimes(score) {  
    // checks if score is 0 which is invalid -> returns blank message
    if(parseInt(score) === 0) return ''
    // puts all possible times from score into an array
    let possibleTimes = getPossibleTimes(score)
    let formattedTimes = []

    //adds each formatted time to an array
    possibleTimes.forEach(time => {
        formattedTimes.push(formatTime(time))
    })
    // creates string from formatted times
    let timesMessage = convertToMessage(formattedTimes)

    return timesMessage
}

//Uses calculations from solderq35's time calculator (https://solderq35.github.io/time-calc-under-5/) to get all possible times under 5 min
function getPossibleTimes(score) {
    let possibleTimes = []

    //Iterates through every possible score bonus from 5000 - 100,000 in increments of 5000
    for (let i = 1; i <= 20; i++) {
        //Equation found from solderq35's time calculator (https://solderq35.github.io/time-calc-under-5/)
        let tempTime = (210000 - (parseInt(score) * (100000 / (5000 * i)))) * (3 / 400)
        //checks if time is over 5 min
        if(tempTime < 0 || (tempTime / 60) > 5) continue
        //if time is positive and under 5 min it is added to array 
        possibleTimes.push(tempTime)
    }
    
    return possibleTimes
}

function formatTime(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time - (minutes * 60)

    //formats time in a (minutes):(seconds).(millisecond) format
    let formattedTime = minutes + ':' + formatSeconds(seconds)

    return formattedTime
}
//formats seconds to always show 3 digits 
function formatSeconds(seconds) {
    seconds = seconds.toFixed(3)

    if (seconds == 0) return '00'
    if(seconds < 10) return `0${seconds}`

    return seconds
}
//Converts array of possible times into string
function convertToMessage(times) {
    let message = ''
    let i = 1

    times.forEach(time => {
        message += time
        //checks if it is not last element as to not print divider on the end of string
        if(i < times.length) message += ' | '
        i++                                     
    })

    return message
}

module.exports = { calculatePossibleTimes }