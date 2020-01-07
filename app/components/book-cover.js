import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class BookCoverComponent extends Component {
  @tracked isShowingModal = false;

  @action
  open() {
    this.isShowingModal = true
  }

  @action
  close() {
    this.isShowingModal = false
  }
}
