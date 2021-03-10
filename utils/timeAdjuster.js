function timeAdjuster( time, adjustmentMins ) {
    const cleanedTime = time.replace( ':', '' );

    let hours = +cleanedTime.substring( 0, 2 );

    const minutes = +cleanedTime.substring( 2 );

    let adjustedMins = minutes + adjustmentMins;
    console.log( adjustedMins )

    const maxMins = 59;
    if ( adjustedMins > maxMins ) {
        console.log( 'running timeAdjuster max reset' );
        adjustedMins -= 60;
        hours += 1;

    }
    if ( adjustedMins < 10 ) {
        adjustedMins = '0' + adjustedMins;
    }
    if ( hours < 10 ) {
        hours = '0' + hours;
    }
    const adjustedTime = hours + ':' + adjustedMins

    return adjustedTime;
}

module.exports = timeAdjuster