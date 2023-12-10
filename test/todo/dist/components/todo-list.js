import { computed as _computed_zbo5u4ek5, text as _text_4bum7tpz9, el as _el_cflu5tet0, attr as _attr_7731zgg09, listen as _listen_oihly75y7, append as _append_boa4r5oq8, reactiveFor as _reactiveFor_ue4zargrx, CopperElement as _CopperElement_q2rm7oyvu } from "@kirick/copper";
import { number as _ufrfh6c0r, string as _0vm1ilwoe, array as _eqc03v1cv, object as _c41sqwvrh, safeParse as _0ia7gnlg3 } from "valibot";
export default class CopperTodoListElement extends _CopperElement_q2rm7oyvu {
  static css = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  constructor() {
    super();
    const number = _ufrfh6c0r,
      string = _0vm1ilwoe,
      array = _eqc03v1cv,
      object = _c41sqwvrh,
      safeParse = _0ia7gnlg3;
    this.defineProps({
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    });
  }
  init() {
    const number = _ufrfh6c0r,
      string = _0vm1ilwoe,
      array = _eqc03v1cv,
      object = _c41sqwvrh,
      safeParse = _0ia7gnlg3;
    const remove = function remove(index) {
      this.emit('remove', index);
    }.bind(this);
    const todo = this.props.todo;
    const todo_count = _computed_zbo5u4ek5(() => todo.value.length);
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
    super.render(_text_4bum7tpz9(), _reactiveFor_ue4zargrx(() => todo.value, (task, index) => task.id, (task, index) => [_text_4bum7tpz9(), _append_boa4r5oq8(_el_cflu5tet0("div"), _text_4bum7tpz9(" Task #"), _text_4bum7tpz9(() => index.value + 1), _text_4bum7tpz9(" / "), _text_4bum7tpz9(() => todo_count.value), _text_4bum7tpz9(": "), _text_4bum7tpz9(() => task.value.title), _text_4bum7tpz9(), _listen_oihly75y7(_attr_7731zgg09(_el_cflu5tet0("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_4bum7tpz9()), _text_4bum7tpz9()]), _text_4bum7tpz9());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);