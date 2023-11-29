import { computed as _computed_d2iwqwlu7, text as _text_4s6pt8oah, el as _el_d321q52we, attr as _attr_41fq75kk8, listen as _listen_v69pavd1d, append as _append_ltrc0seyk, reactiveFor as _reactiveFor_y0bqhrz34, CopperElement as _CopperElement_zu98rkjox } from "@kirick/copper";
import { number as _jyr9ajsox, string as _fc9wzrfum, array as _o5vjbwh3l, object as _t3w258ir1, safeParse as _859dm5z2m } from "valibot";
export default class CopperTodoListElement extends _CopperElement_zu98rkjox {
  static css = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  constructor() {
    super();
    const number = _jyr9ajsox,
      string = _fc9wzrfum,
      array = _o5vjbwh3l,
      object = _t3w258ir1,
      safeParse = _859dm5z2m;
    this._copper.propsValidators = {
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    };
  }
  init() {
    const number = _jyr9ajsox,
      string = _fc9wzrfum,
      array = _o5vjbwh3l,
      object = _t3w258ir1,
      safeParse = _859dm5z2m;
    const todo = this._copper.props.todo;
    const todo_count = _computed_d2iwqwlu7(() => todo.value.length);
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
    super.render(_text_4s6pt8oah(), _reactiveFor_y0bqhrz34(() => todo.value, (task, index) => task.id, (task, index) => [_text_4s6pt8oah(), _append_ltrc0seyk(_el_d321q52we("div"), _text_4s6pt8oah(" Task #"), _text_4s6pt8oah(() => index.value + 1), _text_4s6pt8oah(" / "), _text_4s6pt8oah(() => todo_count.value), _text_4s6pt8oah(": "), _text_4s6pt8oah(() => task.value.title), _text_4s6pt8oah(), _listen_v69pavd1d(_attr_41fq75kk8(_el_d321q52we("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_4s6pt8oah()), _text_4s6pt8oah()]), _text_4s6pt8oah());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);