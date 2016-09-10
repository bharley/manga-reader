import webpackDevMiddleware from 'webpack-dev-middleware';
import _debug from 'debug';
import applyExpressMiddleware from '../lib/apply-express-middleware';
import config from '../../config';

const paths = config.utils_paths;
const debug = _debug('app:server:webpack-dev');

export default function (compiler, publicPath) {
  debug('Enable webpack dev middleware.');

  const middleware = webpackDevMiddleware(compiler, {
    publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats,
  });

  return async function koaWebpackDevMiddleware(ctx, next) {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content) => (ctx.body = content),
      setHeader() {
        ctx.set.apply(ctx, arguments); // eslint-disable-line prefer-spread, prefer-rest-params
      },
    });

    if (hasNext) {
      await next();
    }
  };
}
