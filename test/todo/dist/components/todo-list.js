import { computed as _computed_oazmm8533, text as _text_cnok279x3, el as _el_ue9061zc2, attr as _attr_cmrfjmtze, listen as _listen_tvqf54wt1, append as _append_n218f2w0i, reactiveFor as _reactiveFor_iald5rh2r, CopperElement as _CopperElement_8lj1iwu60 } from "@kirick/copper";
import { number as _fvf2136y1, string as _b2bvnzikc, array as _vtpzpsxwq, object as _gbakoezzh, safeParse as _9lkd7pqkk } from "valibot";
export default class CopperTodoListElement extends _CopperElement_8lj1iwu60 {
  static css = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  constructor() {
    super();
    const number = _fvf2136y1,
      string = _b2bvnzikc,
      array = _vtpzpsxwq,
      object = _gbakoezzh,
      safeParse = _9lkd7pqkk;
    this._copper.propsValidators = {
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    };
  }
  init() {
    const number = _fvf2136y1,
      string = _b2bvnzikc,
      array = _vtpzpsxwq,
      object = _gbakoezzh,
      safeParse = _9lkd7pqkk;
    const todo = this._copper.props.todo;
    const todo_count = _computed_oazmm8533(() => todo.value.length);
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
    super.render(_text_cnok279x3(), _reactiveFor_iald5rh2r(() => todo.value, (task, index) => task.id, (task, index) => [_text_cnok279x3(), _append_n218f2w0i(_el_ue9061zc2("div"), _text_cnok279x3(" Task #"), _text_cnok279x3(() => index.value + 1), _text_cnok279x3(" / "), _text_cnok279x3(() => todo_count.value), _text_cnok279x3(": "), _text_cnok279x3(() => task.value.title), _text_cnok279x3(), _listen_tvqf54wt1(_attr_cmrfjmtze(_el_ue9061zc2("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_cnok279x3()), _text_cnok279x3()]), _text_cnok279x3());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);