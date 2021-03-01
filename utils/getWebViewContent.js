
const axios = require('axios');

// getAnnouncements()
async function getHomeScreenWebViewContent(){

  const announcementsResponse = await axios.get('https://wise-web.org/wp-json/wp/v2/posts/?categories=9')
  const otherContent = await axios.get('https://wise-web.org/wp-json/wp/v2/pages/')
  
  return [announcementsResponse.data, otherContent.data]
}


export default getHomeScreenWebViewContent


