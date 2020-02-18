import { Crawler } from './lib/index';
import { CrawlerCallReturns } from './lib/types';

const crawler = new Crawler();

async function init() {
  const results: CrawlerCallReturns[] = await crawler.callBulk([
    {
      url: 'https://www.sothebys.com/en/results',
      queries: [
        {
          selector: 'ul.SearchModule-results li .Card-info-container',
          returnValues: ['attribs.href'],
        },
        {
          selector: 'ul.SearchModule-results li .Card-title',
          returnValues: [],
        },
      ],
    },
  ])

  results.forEach((result) => {
    console.log(result)
  })
}

init()
