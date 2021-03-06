import cheerio from 'cheerio';
import fetch from '../fetch';
import MangaResponse from '../response';

export const titles = {
  noblesse: {
    title: 'Noblesse',
    slug: '1992_noblesse',
  },
  magician: {
    title: 'Magician',
    slug: '783_magician',
  },
  gamer: {
    title: 'The Gamer',
    slug: '3796_the-gamer',
  },
};

const getSlug = (title) => {
  if (titles[title]) {
    return titles[title].slug;
  }

  return title;
};

const fetchPage = (path) => fetch('www.mangainn.net', `/manga/${path}`);

const pullChapter = (url) => {
  const match = url.match(/\/manga\/chapter\/([0-9a-z_-]+)/i);

  if (match) {
    return match[1];
  }

  return null;
};

const leftPad = (str) => (`000${str}`).substring(`${str}`.length);

export default new class MangaInnConsumer {
  /**
   * @param {string} title
   * @returns {string}
   */
  async getChapterForTitle(title) {
    const slug = getSlug(title);
    const page = await fetchPage(slug);
    const $ = cheerio.load(page);
    const path = [
      '.content',
      'div:last-child',
      'table',
      'tbody',
      'tr:last-child',
      'td:first-child',
      'span',
      'a',
    ];
    const chapterUrl = $(path.join(' > ')).attr('href');

    return pullChapter(chapterUrl);
  }

  /**
   * @param {string} chapter
   * @returns {MangaResponse}
   */
  async getChapter(chapter) {
    const page = await fetchPage(`chapter/${chapter}`);
    const $ = cheerio.load(page);

    const title = $('#gotoMangaInfo').text().trim();
    const chapterTitle = $('#gotomangainfo2').text().replace(/^[ -]+/, '').trim();
    const firstImage = $('#imgPage').attr('src');
    const previous = $('#chapters option[selected]').prev().val();
    const next = $('#chapters option[selected]').next().val();

    const images = $('#cmbpages option').get().map(element => {
      if (!element.attribs.value) {
        return null;
      }
      const imageNumber = leftPad(element.attribs.value);
      return firstImage.replace(/\/\d{3}_(\d{2}_\d{2}_)/, `/${imageNumber}_$1`);
    }).filter(img => img);

    return new MangaResponse(
      title,
      chapterTitle,
      images,
      previous,
      next
    );
  }
}();
