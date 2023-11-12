import { text as _text_8kxg9udrg, el as _el_lateg9qk4, attr as _attr_ukuvzdktf, listen as _listen_vqa4fzhem, append as _append_qfm4kndxs, reactiveFor as _reactiveFor_nffhcdz0p, CopperElement as _CopperElement_j0shv7kzp } from "copper";
{
  const el_style = _el_lateg9qk4("style");
  el_style.innerText = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(el_style);
}
export default class CopperTodoListElement extends _CopperElement_j0shv7kzp {
  init() {
    const todo = this._copper.props.todo;
    const remove = function remove(index) {
      this.emit('remove', index);
    }.bind(this);
    super.init({
      remove,
      todo
    });
  }
  render({
    remove,
    todo
  }) {
    super.render(_text_8kxg9udrg(), _reactiveFor_nffhcdz0p(() => todo.value, (task, index) => task.id, (task, index) => [_text_8kxg9udrg(), _append_qfm4kndxs(_el_lateg9qk4("div"), _text_8kxg9udrg(" Task #"), _text_8kxg9udrg(() => index.value + 1), _text_8kxg9udrg(": "), _text_8kxg9udrg(() => task.value.title), _text_8kxg9udrg(), _listen_vqa4fzhem(_attr_ukuvzdktf(_el_lateg9qk4("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_8kxg9udrg()), _text_8kxg9udrg()]), _text_8kxg9udrg());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);