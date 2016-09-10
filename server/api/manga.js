import Router from 'koa-router';
import cachable from '../utils/cachable';
import HttpError from '../utils/HttpError';
import mangaInn from '../utils/consumers/mangaInn';

const MINUTES = 60000; // 1 minute in milliseconds

const router = new Router();

router.get('/', async (context) => {
  context.body = {};
});

router.get('/:manga', async (context) => {
  try {
    // Pull the URL for the most recent chapter for this title
    const chapterSlug = await mangaInn.getChapterForTitle(context.params.manga);
    if (!chapterSlug) {
      throw new HttpError('Could not find chapter for manga', 404);
    }

    const chapter = await mangaInn.getChapter(chapterSlug);
    context.body = chapter;
  } catch (err) {
    throw new HttpError('Could not find manga', 404);
  }
});

router.get('/chapter/:chapter', async (context) => {
  try {
    const slug = context.params.chapter;

    const cacheKey = `chapter-${slug}`;
    const chapter = await cachable(cacheKey, 120 * MINUTES, () => mangaInn.getChapter(slug));

    context.body = chapter;
  } catch (err) {
    throw new HttpError('Could not find chapter', 404);
  }
});

export default router;
