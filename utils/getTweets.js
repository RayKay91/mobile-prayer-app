
const axios = require('axios');

export default async function getTweets(){

  const twitterAPIRequestConfig = {
  method: 'get',
  url: 'https://api.twitter.com/2/users/912296486838382593/tweets?max_results=5&exclude=replies,retweets',
  headers: { 
    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAAKbLAEAAAAATd53x36Yilh3vZ5G1vEJImxkkH8%3DL5lAd3uzPrZGheCYyFvZPDRScyd9R2VqDeyC00FRtrPJtQNmVP', 
    'Cookie': 'personalization_id="v1_mp3bQ7G4+WSa/SJiGf2V4Q=="; guest_id=v1%3A160944695843566143'
  }
};

const response = await axios(twitterAPIRequestConfig)

return response.data

}

console.log(getTweets())


