import { computed as _computed_whwdjtjys, text as _text_qioydjzhf, el as _el_gm1mi93b1, attr as _attr_b9s4txlhw, listen as _listen_suweylthn, append as _append_1nzuw32xh, reactiveFor as _reactiveFor_bgarct2yz, CopperElement as _CopperElement_1g3u7njym } from "@kirick/copper";
import { number as _arzacdb0b, string as _y7hvze34g, array as _f5101ojbj, object as _2aneb8jws, safeParse as _xzesinp53 } from "valibot";
export default class CopperTodoListElement extends _CopperElement_1g3u7njym {
  static css = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  constructor() {
    super();
    const number = _arzacdb0b,
      string = _y7hvze34g,
      array = _f5101ojbj,
      object = _2aneb8jws,
      safeParse = _xzesinp53;
    this._copper.propsValidators = {
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    };
  }
  init() {
    const number = _arzacdb0b,
      string = _y7hvze34g,
      array = _f5101ojbj,
      object = _2aneb8jws,
      safeParse = _xzesinp53;
    const todo = this._copper.props.todo;
    const todo_count = _computed_whwdjtjys(() => todo.value.length);
    const remove = function remove(index) {
      this.emit('remove', index);
    }.bind(this);
    super.init({
      number,
      string,
      array,
      object,
      safeParse,
      remove,
      todo,
      todo_count
    });
  }
  render({
    number,
    string,
    array,
    object,
    safeParse,
    remove,
    todo,
    todo_count
  }) {
    super.render(_text_qioydjzhf(), _reactiveFor_bgarct2yz(() => todo.value, (task, index) => task.id, (task, index) => [_text_qioydjzhf(), _append_1nzuw32xh(_el_gm1mi93b1("div"), _text_qioydjzhf(" Task #"), _text_qioydjzhf(() => index.value + 1), _text_qioydjzhf(" / "), _text_qioydjzhf(() => todo_count.value), _text_qioydjzhf(": "), _text_qioydjzhf(() => task.value.title), _text_qioydjzhf(), _listen_suweylthn(_attr_b9s4txlhw(_el_gm1mi93b1("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_qioydjzhf()), _text_qioydjzhf()]), _text_qioydjzhf());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);