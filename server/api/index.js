import Router from 'koa-router';
import manga from './manga';

const router = new Router();

router.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    context.status = err.statusCode || 500;
    context.body = err.message;
  }
});

router.use('/api/manga', manga.routes(), manga.allowedMethods());

export default router;
