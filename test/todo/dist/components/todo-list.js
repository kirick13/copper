import { text as _text_4pty1u2mj, el as _el_6k35yt4im, attr as _attr_6jvt9whqg, listen as _listen_n39u0aj8m, append as _append_4qadjd0up, reactiveFor as _reactiveFor_680kwy19b, CopperElement as _CopperElement_kq3y5fkma } from "copper";
import * as _4tuslc0gs from "valibot";
{
  const _yx81ho6d1 = _el_6k35yt4im("style");
  _yx81ho6d1.innerText = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(_yx81ho6d1);
}
export default class CopperTodoListElement extends _CopperElement_kq3y5fkma {
  constructor() {
    super();
    const {
      number,
      string,
      array,
      object,
      safeParse
    } = _4tuslc0gs;
    this._copper.propsValidators = {
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    };
  }
  init() {
    const {
      number,
      string,
      array,
      object,
      safeParse
    } = _4tuslc0gs;
    const todo = this._copper.props.todo;
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
      todo
    });
  }
  render({
    number,
    string,
    array,
    object,
    safeParse,
    remove,
    todo
  }) {
    super.render(_text_4pty1u2mj(), _reactiveFor_680kwy19b(() => todo.value, (task, index) => task.id, (task, index) => [_text_4pty1u2mj(), _append_4qadjd0up(_el_6k35yt4im("div"), _text_4pty1u2mj(" Task #"), _text_4pty1u2mj(() => index.value + 1), _text_4pty1u2mj(": "), _text_4pty1u2mj(() => task.value.title), _text_4pty1u2mj(), _listen_n39u0aj8m(_attr_6jvt9whqg(_el_6k35yt4im("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_4pty1u2mj()), _text_4pty1u2mj()]), _text_4pty1u2mj());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);