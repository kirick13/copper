import { computed as _computed_b27hc5olo, text as _text_6546w19qu, el as _el_eqz3mcbdw, attr as _attr_gpqot6kbp, listen as _listen_vrgpxs2cn, append as _append_t526e9bi4, reactiveFor as _reactiveFor_ztaqf9a4u, CopperElement as _CopperElement_eygjgs206 } from "@kirick/copper";
export default class CopperTodoListElement extends _CopperElement_eygjgs206 {
  static css = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  constructor() {
    super();
    this._copper.propsValidators = {
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    };
  }
  init() {
    const todo = this._copper.props.todo;
    const todo_count = _computed_b27hc5olo(() => todo.value.length);
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
    super.render(_text_6546w19qu(), _reactiveFor_ztaqf9a4u(() => todo.value, (task, index) => task.id, (task, index) => [_text_6546w19qu(), _append_t526e9bi4(_el_eqz3mcbdw("div"), _text_6546w19qu(" Task #"), _text_6546w19qu(() => index + 1), _text_6546w19qu(" / "), _text_6546w19qu(() => todo_count.value), _text_6546w19qu(": "), _text_6546w19qu(() => task.title), _text_6546w19qu(), _listen_vrgpxs2cn(_attr_gpqot6kbp(_el_eqz3mcbdw("input"), "type", "button", "value", "Remove"), "click", $event => remove(index), []), _text_6546w19qu()), _text_6546w19qu()]), _text_6546w19qu());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);