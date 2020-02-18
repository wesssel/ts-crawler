import axios, { AxiosResponse } from 'axios'
import { itemProp } from './helper';
import { delay } from './helper';
import { CrawlerOptions, CrawlerCall, CrawlerCallReturns, CrawlerQueryReturn, CrawlerQuery } from './types';

const cheerio = require('cheerio');
const cheerioFind = require('cheerio-eq');

export class Crawler {
  private options: CrawlerOptions = {
    delay: 100,
  }

  constructor(options?: CrawlerOptions) {
    this.options = Object.assign(this.options, options);
  }

  public async callBulk(calls: CrawlerCall[]): Promise<CrawlerCallReturns[]> {
    const crawlerCallReturns: CrawlerCallReturns[] = [];

    try {
      const callsLength: number = calls.length;

      for (let i = 0; i < callsLength; i++) {
        const call: CrawlerCall = calls[i];

        const returns: CrawlerQueryReturn[] = await this.call(call.url, call.queries)
        crawlerCallReturns.push({
          url: call.url,
          returns,
        })

        await delay(this.options.delay);
      }
    } catch (e) {
      console.log(`\n\n Error ${e} \n\n`);
    } finally {
      return crawlerCallReturns;
    }
  }

  public async call(url: string, queries: CrawlerQuery[]): Promise<CrawlerQueryReturn[]> {
    const res: AxiosResponse = await axios.get(url);
    const returns: CrawlerQueryReturn[] = this.queryValues(res.data, queries)

    return returns;
  }

  private queryValues(data: string, queries: CrawlerQuery[]) {
    const $ = cheerio.load(data);
    const returns: CrawlerQueryReturn[] = [];

    queries.forEach((query) => {
      const elements: HTMLElement[] = cheerioFind($, query.selector)

      $(elements).each((_: number, element: HTMLElement) => {
        returns.push({
          selector: query.selector,
          text: $(element).text(),
          returnValues: query.returnValues.map((val: string) => itemProp(element, val)),
        })
      })
    })

    return returns
  }
}

