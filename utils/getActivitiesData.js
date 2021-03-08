const axios = require( 'axios' )

export default async function getActivitiesData() {
    try {
  
 const response = await axios.get('https://wise-web.org/wp-json/v2/activities')
        return response.data
    } catch (error) {
        console.log(error);
    }
}

