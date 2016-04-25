const Crawler = require('crawler')

const connection = new Crawler({
  maxConnections: 10
})

connection.queue({
  uri: 'https://www.google.com/',
  callback: (err, res, $) => {
    console.log('**************')
    console.log('**************')
    console.log('google fetched')
    console.log('**************')
    console.log('**************')
    console.log($('body').html())
  }
})
