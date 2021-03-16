const dayjs = require( 'dayjs' )


function getDate( showTmrwDate ) {
    let date = dayjs();
    const gregorianDate = dayjs().format( 'dddd D MMM YYYY' );

    if ( showTmrwDate ) {
        date = dayjs().add( 1, 'd' );
        return date.format( 'dddd D MMM YYYY' );
    }
    return gregorianDate;
}

function calculateHijriDate( { StartDate, Month, Year } ) {

    let currentDate = dayjs().format( 'YYYY-MM-DD' )
    currentDate = dayjs( currentDate )
    let elapsedHijriDays = currentDate.diff( StartDate, 'day' )
    //adding 1 to the difference calculated to account for impossibility of 0/mm/yyyy
    elapsedHijriDays += 1


    return `${ elapsedHijriDays } ${ Month } ${ Year } AH`;
}

function tmrwHijriDate( currHijriDate ) {

    let [ date, month, ...year ] = currHijriDate.split( ' ' );


    date = +date + 1;

    if ( date > 30 ) return ''

    const dateElements = [ date, month, ...year ];

    return dateElements.join( ' ' );
}






module.exports = { getDate, calculateHijriDate, tmrwHijriDate }