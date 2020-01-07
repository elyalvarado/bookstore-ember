import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class BookCoverComponent extends Component {
  @tracked isShowingModal = false;

  @action
  open() {
    this.args.book.reload().then(() => {
      this.isShowingModal = true
      this.toggleBlur()
    })
  }

  @action
  close() {
    this.isShowingModal = false
    this.toggleBlur()
  }

  toggleBlur() {
    this.args.blurBackground(this.isShowingModal)
  }
}
