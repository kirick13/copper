import { computed as _computed_7u94mu7n0, text as _text_zfzwrdulj, el as _el_hlvcofmkr, attr as _attr_57sq789ah, listen as _listen_03f5oqmxw, append as _append_b8wik524i, reactiveFor as _reactiveFor_v3txte4l6, CopperElement as _CopperElement_r14mt3149 } from "@kirick/copper";
import { number as _2u4bq33wh, string as _vcf0h1r54, array as _jkq1b66v8, object as _6qzgzljsk, safeParse as _pkt4rudz2 } from "valibot";
export default class CopperTodoListElement extends _CopperElement_r14mt3149 {
  static css = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  constructor() {
    super();
    const number = _2u4bq33wh,
      string = _vcf0h1r54,
      array = _jkq1b66v8,
      object = _6qzgzljsk,
      safeParse = _pkt4rudz2;
    this._copper.propsValidators = {
      todo: value => safeParse(array(object({
        id: number(),
        title: string()
      })), value).success
    };
  }
  init() {
    const number = _2u4bq33wh,
      string = _vcf0h1r54,
      array = _jkq1b66v8,
      object = _6qzgzljsk,
      safeParse = _pkt4rudz2;
    const remove = function remove(index) {
      this.emit('remove', index);
    }.bind(this);
    const todo = this._copper.props.todo;
    const todo_count = _computed_7u94mu7n0(() => todo.value.length);
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
    super.render(_text_zfzwrdulj(), _reactiveFor_v3txte4l6(() => todo.value, (task, index) => task.id, (task, index) => [_text_zfzwrdulj(), _append_b8wik524i(_el_hlvcofmkr("div"), _text_zfzwrdulj(" Task #"), _text_zfzwrdulj(() => index.value + 1), _text_zfzwrdulj(" / "), _text_zfzwrdulj(() => todo_count.value), _text_zfzwrdulj(": "), _text_zfzwrdulj(() => task.value.title), _text_zfzwrdulj(), _listen_03f5oqmxw(_attr_57sq789ah(_el_hlvcofmkr("input"), "type", "button", "value", "Remove"), "click", $event => remove(index.value), []), _text_zfzwrdulj()), _text_zfzwrdulj()]), _text_zfzwrdulj());
  }
}
window.customElements.define("todo-list", CopperTodoListElement);