const dayjs = require( 'dayjs' )
function getDate() {
    const gregorianDate = dayjs().format( 'dddd D MMM YYYY' )

    return gregorianDate

}

function calculateHijriDate( { StartDate, Month, Year } ) {

    let currentDate = dayjs().format( 'YYYY-MM-DD' )
    currentDate = dayjs( currentDate )
    let elapsedHijriDays = currentDate.diff( StartDate, 'day' )
    //adding 1 to the difference calculated to account for impossibility of 0/mm/yyyy
    elapsedHijriDays += 1


    return `${ elapsedHijriDays } ${ Month } ${ Year } AH`;
}







module.exports = { getDate, calculateHijriDate }