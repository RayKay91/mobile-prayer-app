

const getTabIcon = ( routeName, focused ) => {
    let path
    if ( routeName === 'Home' ) {

        focused ?
            path = require( '../assets/tabIcons/homeIcon/homeIconColored.png' )
            : path = require( '../assets/tabIcons/homeIcon/homeIcon.png' )
    }
    if ( routeName === 'Socials' ) {

        focused ?
            path = require( '../assets/tabIcons/socialsIcon/socialsIconColored.png' )
            : path = require( '../assets/tabIcons/socialsIcon/socialsIcon.png' )
    }
    if ( routeName === 'Activities' ) {

        focused ?
            path = require( '../assets/tabIcons/activitiesIcon/activitiesIconColored.png' )
            : path = require( '../assets/tabIcons/activitiesIcon/activitiesIcon.png' )
    }
    if ( routeName === "Qur'an" ) {

        focused ?
            path = require( '../assets/tabIcons/quranIcon/quranIconColored.png' )
            : path = require( '../assets/tabIcons/quranIcon/quranIcon.png' )
    }
    if ( routeName === "Du'a" ) {

        focused ?
            path = require( '../assets/tabIcons/duaIcon/duaIconColored.png' )
            : path = require( '../assets/tabIcons/duaIcon/duaIcon.png' )
    }

    return path

}

module.exports = getTabIcon