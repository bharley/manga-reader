
export default class MangaResponse {
  /**
   * @param {string} title
   * @param {string} chapter
   * @param {string[]} images
   * @param {string=null} previous
   * @param {string=null} next
   */
  constructor(title, chapter, images, previous = null, next = null) {
    this.title = title;
    this.chapter = chapter;
    this.images = images;
    this.previous = previous;
    this.next = next;
  }

  toJSON() {
    return {
      title: this.title,
      chapter: this.chapter,
      images: this.images,
      previous: this.previous,
      next: this.next,
    };
  }
}
