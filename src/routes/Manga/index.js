import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'manga/(chapter/):manga',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Manga = require('./containers/MangaContainer').default;
      const reducer = require('./modules/manga').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'manga', reducer });

      /*  Return getComponent   */
      cb(null, Manga);

      /* Webpack named bundle   */
    }, 'manga');
  },
});
