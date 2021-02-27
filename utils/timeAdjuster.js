function timeAdjuster(time, adjustmentMins){
    const cleanedTime = time.replace(':', '')
    const adjustedTimeInt = parseInt(cleanedTime) + adjustmentMins
    const adjustedTimeStr = '0' + adjustedTimeInt.toString()

    const adjustedTime = adjustedTimeStr.slice(0, 2) + ':' + adjustedTimeStr.slice(2)
    


    return adjustedTime
}

module.exports = timeAdjuster