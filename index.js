"use strict"
const Crawler = require('crawler')

let counter = 0
const connection = new Crawler({
  //Set bigger number here if your network works well
  maxConnections: 2,
  callback: (err, res, $) => {
    const content = $('.tab-item').html()
    if (content && content.indexOf('Chart') !== -1) {
      console.log('Chart supported')
    } else {
      console.log(`Chart not supported, Count ${++counter}`)
    }
  }
})

const urlArray = []
connection.queue({
  url: 'http://data.wb.dev.wiredcraft.com/indicator',
  callback: (err, res, $) => {
    $('section.nav-item ul a').each(function(i, elem) {
      //url pattern: /indicator/SL.EMP.VULN.ZS?view=chart
      const pattern = /^\/indicator/
      const href = $(this).attr('href')
      if (href && pattern.test(href)) {
        console.log(`http://data.wb.dev.wiredcraft.com${href}`)
        urlArray.push({ url: `http://data.wb.dev.wiredcraft.com${href}` })
      }
    })
    console.log('urls fetched')
    connection.queue(urlArray)
  }
})
