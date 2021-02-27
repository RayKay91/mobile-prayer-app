function timeAdjuster(time, adjustment){
    const cleanedTime = time.replace(':', '')
    const adjustedTimeInt = parseInt(cleanedTime) + adjustment
    const adjustedTimeStr = '0' + adjustedTimeInt.toString()

    const adjustedTime = adjustedTimeStr.slice(0, 2) + ':' + adjustedTimeStr.slice(2)
    


    return adjustedTime
}

module.exports = timeAdjuster