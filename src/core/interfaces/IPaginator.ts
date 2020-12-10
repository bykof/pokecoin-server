export default interface IPaginator {
  request;
  objects: any[];
  page_size: number;
  page_query_name: string;

  getCurrentPage(): number;
  getObjectsOnPage(page: number): any[];
  getCurrentObjects(): any[];
}
