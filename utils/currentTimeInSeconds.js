const dayjs = require( 'dayjs' )

function currentTimeInSeconds() {

    const hoursInSeconds = dayjs().get( 'hour' ) * 3600
    const minutesInSeconds = dayjs().get( 'minute' ) * 60
    const seconds = dayjs().get( 'second' )

    const currentTimeInSeconds = hoursInSeconds + minutesInSeconds + seconds

    return currentTimeInSeconds
}

module.exports = currentTimeInSeconds