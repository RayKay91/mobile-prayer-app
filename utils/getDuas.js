const axios = require('axios')

export default async function getDuas(){

    const response = await axios.get('https://wise-web.org/wp-json/wp/v2/posts/?categories=15')
    const dua = response.data[0].content.rendered
    return dua
}