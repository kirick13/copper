import { text as _text_8o2nt23lx, el as _el_jqinaxmk1, attr as _attr_14ivemsdx, listen as _listen_vwvsksyhy, append as _append_rztza5w2v, reactiveFor as _reactiveFor_jbkwrk9w7, CopperElement as _CopperElement_bbwvx7633 } from "copper";
import * as _g3op709kk from "valibot";
{
  const _gi7hubog2 = _el_jqinaxmk1("style");
  _gi7hubog2.innerText = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(_gi7hubog2);
}
export default class CopperTodoListElement extends _CopperElement_bbwvx7633 {
  init() {
    const {
      array
    } = _g3op709kk;
    this._copper.propsValidators = {
      todo: array()
    };
    const todo = this._copper.props.todo;
    const remove = function remove(index) {
      this.emit('remove', index);
    }.bind(this);
    super.init({
      array,
      remove,
      todo
    });
  }
  render({
    array,
    remove,
    todo
  }) {
    super.render(_text_8o2nt23lx(), _reactiveFor_jbkwrk9w7(() => todo.value, (task, index) => task.id, (task, index) => [_text_8o2nt23lx(), _append_rztza5w2v(_el_jqinaxmk1("div"), _text_8o2nt23lx(" Task #"), _text_8o2nt23lx(() => index.value + 1), _text_8o2nt23lx(": "), _text_8o2nt23lx(() => task.value.title), _text_8o2nt23lx(), _listen_vwvsksyhy(_attr_14ivemsdx(_el_jqinaxmk1("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_8o2nt23lx()), _text_8o2nt23lx()]), _text_8o2nt23lx());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);