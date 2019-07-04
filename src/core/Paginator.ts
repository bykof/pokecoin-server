import IPaginator from "./interfaces/IPaginator"

const DEFAULT_PAGE_QUERY_NAME = 'page'
const DEFAULT_PAGE_SIZE_QUERY_NAME = 'perPage'
const DEFAULT_PAGE_SIZE = 50

export default class Paginator implements IPaginator {
  request
  objects: any[]
  page_size: number
  page_query_name: string

  constructor(request, objects: any, page_query_name: string = DEFAULT_PAGE_QUERY_NAME) {
    this.request = request
    this.objects = objects
    this.page_query_name = page_query_name
    this.page_size = request.query[DEFAULT_PAGE_SIZE_QUERY_NAME] || DEFAULT_PAGE_SIZE
  }

  getCurrentObjects(): any[] {
    return this.getObjectsOnPage(this.getCurrentPage())
  }

  // Page starts at 0
  getCurrentPage(): number {
    if (this.page_query_name in this.request.query) {
      return this.request.query[this.page_query_name]
    }
    return 0
  }

  getObjectsOnPage(page: number): any[] {
    console.log(page * this.page_size, page * this.page_size + this.page_size)
    return this.objects.slice(page * this.page_size, page * this.page_size + this.page_size)
  }
}
