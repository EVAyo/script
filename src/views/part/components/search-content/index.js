/*
 * @Author: maggot-code
 * @Date: 2021-07-24 18:53:42
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 18:54:21
 * @Description: file content
 */
import SearchContent from './search-content.vue';

/* istanbul ignore next */
SearchContent.install = function (Vue) {
    Vue.component(SearchContent.name, SearchContent);
};

export default SearchContent;