const axios = require('axios')

// getAnnouncements()
async function getHomeScreenWebViewContent() {
  const announcementAndReminder = await axios.get(
    'https://wise-web.org/wp-json/wp/v2/posts/?categories=9'
  )
  const quranDhikrDua = await axios.get(
    'https://wise-web.org/wp-json/wp/v2/pages/'
  )

  const webviewContent = {
    announcement: announcementAndReminder.data[0].content.rendered,
    quran: quranDhikrDua.data.find(el => el.slug === 'quran').content.rendered,
    reminder: announcementAndReminder.data[1].content.rendered,
    dhikr: quranDhikrDua.data.find(el => el.slug === 'dhikr').content.rendered,
  }

  return [
    { title: 'Announcement', text: webviewContent.announcement },
    { title: 'Quran', text: webviewContent.quran },
    { title: 'Reminder', text: webviewContent.reminder },
    { title: 'Dhikr', text: webviewContent.dhikr },
  ]
}

export default getHomeScreenWebViewContent
