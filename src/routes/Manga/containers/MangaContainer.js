import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { provideHooks } from 'redial';
import compose from 'utils/compose';
import { loadTitle, loadChapter } from '../modules/manga';
import MangaViewer from '../components/MangaViewer';

const hooks = {
  fetch: ({ params: { manga }, path, store: { dispatch } }) => {
    let action;
    // Determine if we're looking for a chapter or a title
    if (path.indexOf('/manga/chapter/') === 0) {
      action = loadChapter(manga);
    } else {
      action = loadTitle(manga);
    }
    dispatch(action);
  },
};

const mapStateToProps = ({ manga }) => {
  if (!manga || manga.loading) {
    return {};
  }

  return { ...manga };
};

const mapDispatchToProps = { pushRoute: push };

export default compose(
  provideHooks(hooks),
  connect(mapStateToProps, mapDispatchToProps)
)(MangaViewer);
