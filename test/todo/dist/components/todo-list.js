import { computed as _computed_x12me43r2, text as _text_ot40edjak, el as _el_6klf2bo63, attr as _attr_6lu5a7rxs, listen as _listen_mq4myhxaj, append as _append_st1bjejp5, reactiveFor as _reactiveFor_0klfb1b5s, CopperElement as _CopperElement_ac921w4h2 } from "@kirick/copper";
import { number as _l5rupvrt5, string as _brfhop8hh, array as _spvyi3o0p, object as _l8vceqvl3, safeParse as _ztwxv6tn3 } from "valibot";
export default class CopperTodoListElement extends _CopperElement_ac921w4h2 {
  static css = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  constructor() {
    super();
    const number = _l5rupvrt5,
      string = _brfhop8hh,
      array = _spvyi3o0p,
      object = _l8vceqvl3,
      safeParse = _ztwxv6tn3;
    this._copper.propsValidators = {
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    };
  }
  init() {
    const number = _l5rupvrt5,
      string = _brfhop8hh,
      array = _spvyi3o0p,
      object = _l8vceqvl3,
      safeParse = _ztwxv6tn3;
    const todo = this._copper.props.todo;
    const todo_count = _computed_x12me43r2(() => todo.value.length);
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
    super.render(_text_ot40edjak(), _reactiveFor_0klfb1b5s(() => todo.value, (task, index) => task.id, (task, index) => [_text_ot40edjak(), _append_st1bjejp5(_el_6klf2bo63("div"), _text_ot40edjak(" Task #"), _text_ot40edjak(() => index.value + 1), _text_ot40edjak(" / "), _text_ot40edjak(() => todo_count.value), _text_ot40edjak(": "), _text_ot40edjak(() => task.value.title), _text_ot40edjak(), _listen_mq4myhxaj(_attr_6lu5a7rxs(_el_6klf2bo63("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_ot40edjak()), _text_ot40edjak()]), _text_ot40edjak());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);