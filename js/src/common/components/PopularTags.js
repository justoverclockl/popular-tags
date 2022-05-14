import Widget from 'flarum/extensions/afrux-forum-widgets-core/common/components/Widget';
import app from 'flarum/forum/app'
import getTags from "../helpers/getTags";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";

export default class MyWidget extends Widget {

  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    const url = app.forum.attribute('baseUrl') + '/api/tags'
    getTags(url).then(res => {
      this.popularTags = res
      this.loading = false
    })
  }

  className() {
    return 'popular-tags';
  }

  icon() {
    return 'fas fa-tags';
  }

  title() {
    return app.translator.trans('justoverclock-popular-tags.forum.widgetTitle');
  }

  content() {
    if (this.loading) {
      return <LoadingIndicator/>;
    }
    return (
      <div className="popular-tags">
        <ul className="poptag-ul">
          {this.popularTags && this.popularTags.map((tag) => {
            const discussionCount = app.translator.trans('justoverclock-popular-tags.forum.count') + tag.attributes.discussionCount
            return (
              <li className="poptag-li" title={discussionCount}>
                {tag.attributes.name}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}
