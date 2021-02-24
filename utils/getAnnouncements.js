
const axios = require('axios');

// getAnnouncements()
async function getAnnouncements(){

  const response = await axios.get('https://wise-web.org/wp-json/wp/v2/posts/?categories=9')
  
  return response.data
}


export default getAnnouncements


