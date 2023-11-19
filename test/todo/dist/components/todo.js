import { ref as _ref_5j0lb4idb, text as _text_9pj9o6uas, el as _el_f5c2aacv9, reactiveProp as _reactiveProp_xygr612su, attr as _attr_a9ufimelv, listen as _listen_2i6ip7f8n, append as _append_uuz93uwpt, reactiveInputValue as _reactiveInputValue_ulyv5hho8, reactiveIf as _reactiveIf_evlkr3b4l, CopperElement as _CopperElement_qypeeo4h4 } from "@kirick/copper";
import { default as _daejqotmo, string as _p646dnv2u } from "valibot";
export default class CopperTodoElement extends _CopperElement_qypeeo4h4 {
  static css = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  init() {
    const validot_def = _daejqotmo,
      string = _p646dnv2u,
      string2 = _p646dnv2u;
    const counter = _ref_5j0lb4idb(0);
    const new_todo_title = _ref_5j0lb4idb('');
    const todo = _ref_5j0lb4idb([]);
    const addTodo = function addTodo(arg) {
      todo.value.push({
        id: Date.now(),
        title: new_todo_title.value
      });
      new_todo_title.value = '';
    }.bind(this);
    super.init({
      validot_def,
      string,
      string2,
      addTodo,
      counter,
      new_todo_title,
      todo
    });
  }
  render({
    validot_def,
    string,
    string2,
    addTodo,
    counter,
    new_todo_title,
    todo
  }) {
    super.render(_text_9pj9o6uas(), _reactiveProp_xygr612su(_el_f5c2aacv9("todo-title"), "count", () => todo.value.length), _text_9pj9o6uas(), _append_uuz93uwpt(_el_f5c2aacv9("div"), _text_9pj9o6uas(" counter: "), _text_9pj9o6uas(() => counter.value), _text_9pj9o6uas(), _listen_2i6ip7f8n(_attr_a9ufimelv(_el_f5c2aacv9("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_9pj9o6uas()), _text_9pj9o6uas(), _append_uuz93uwpt(_el_f5c2aacv9("div"), _text_9pj9o6uas(), _reactiveInputValue_ulyv5hho8(_attr_a9ufimelv(_el_f5c2aacv9("input"), "type", "text"), () => new_todo_title.value, value => new_todo_title.value = value), _text_9pj9o6uas(), _listen_2i6ip7f8n(_attr_a9ufimelv(_el_f5c2aacv9("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_9pj9o6uas()), _text_9pj9o6uas(), _text_9pj9o6uas(), _reactiveIf_evlkr3b4l(() => todo.value.length > 0 ? 0 : 1, [() => [_text_9pj9o6uas(), _append_uuz93uwpt(_listen_2i6ip7f8n(_reactiveProp_xygr612su(_el_f5c2aacv9("todo-list"), "todo", () => todo.value), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_9pj9o6uas()), _text_9pj9o6uas()], () => [_text_9pj9o6uas(), _append_uuz93uwpt(_el_f5c2aacv9("i"), _text_9pj9o6uas("No tasks to do.")), _text_9pj9o6uas()]]), _text_9pj9o6uas());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);