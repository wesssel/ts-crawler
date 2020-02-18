export interface CrawlerCall {
  url: string
  queries: CrawlerQuery[]
}

export interface CrawlerCallReturns {
  url: string
  returns: CrawlerQueryReturn[]
}

export interface CrawlerOptions {
  delay: number
}

export interface CrawlerQuery {
  selector: string
  returnValues: string[]
}

export interface CrawlerQueryReturn {
  selector: string
  text: string,
  returnValues: string[]
}
