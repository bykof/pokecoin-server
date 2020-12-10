"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_PAGE_QUERY_NAME = "page";
const DEFAULT_PAGE_SIZE_QUERY_NAME = "perPage";
const DEFAULT_PAGE_SIZE = 50;
class Paginator {
    constructor(request, objects, page_query_name = DEFAULT_PAGE_QUERY_NAME) {
        this.request = request;
        this.objects = objects;
        this.page_query_name = page_query_name;
        this.page_size =
            request.query[DEFAULT_PAGE_SIZE_QUERY_NAME] || DEFAULT_PAGE_SIZE;
    }
    getCurrentObjects() {
        return this.getObjectsOnPage(this.getCurrentPage());
    }
    // Page starts at 0
    getCurrentPage() {
        if (this.page_query_name in this.request.query) {
            return this.request.query[this.page_query_name];
        }
        return 0;
    }
    getObjectsOnPage(page) {
        return this.objects.slice(page * this.page_size, page * this.page_size + this.page_size);
    }
}
exports.default = Paginator;
//# sourceMappingURL=Paginator.js.map