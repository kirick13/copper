import { ref as _ref_u0yzchlr9, text as _text_ex0e33ior, el as _el_uroyhesqi, reactiveProp as _reactiveProp_0o43mixla, attr as _attr_7ojoxiq33, listen as _listen_g76orzwgy, append as _append_epm6beoab, reactiveInputValue as _reactiveInputValue_d92nvtz6b, reactiveIf as _reactiveIf_bmu3k4wd6, CopperElement as _CopperElement_ea7xtg32c } from "copper";
import _ko7wkv0is from "/test/todo/dist/components/todo-list.js";
import _ltprxuzse from "/test/todo/dist/components/todo-title.js";
{
  const _1pqwi5ir5 = _el_uroyhesqi("style");
  _1pqwi5ir5.innerText = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(_1pqwi5ir5);
}
export default class CopperTodoElement extends _CopperElement_ea7xtg32c {
  init() {
    const TodoList = _ko7wkv0is;
    const TodoTitle = _ltprxuzse;
    const counter = _ref_u0yzchlr9(0);
    const new_todo_title = _ref_u0yzchlr9('');
    const todo = _ref_u0yzchlr9([]);
    const addTodo = function addTodo(arg) {
      todo.value.push({
        id: Date.now(),
        title: new_todo_title.value
      });
      new_todo_title.value = '';
    }.bind(this);
    super.init({
      TodoList,
      TodoTitle,
      addTodo,
      counter,
      new_todo_title,
      todo
    });
  }
  render({
    TodoList,
    TodoTitle,
    addTodo,
    counter,
    new_todo_title,
    todo
  }) {
    super.render(_text_ex0e33ior(), _reactiveProp_0o43mixla(_el_uroyhesqi("todo-title"), "count", () => todo.value.length), _text_ex0e33ior(), _append_epm6beoab(_el_uroyhesqi("div"), _text_ex0e33ior(" counter: "), _text_ex0e33ior(() => counter.value), _text_ex0e33ior(), _listen_g76orzwgy(_attr_7ojoxiq33(_el_uroyhesqi("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_ex0e33ior()), _text_ex0e33ior(), _append_epm6beoab(_el_uroyhesqi("div"), _text_ex0e33ior(), _reactiveInputValue_d92nvtz6b(_attr_7ojoxiq33(_el_uroyhesqi("input"), "type", "text"), () => new_todo_title.value, value => new_todo_title.value = value), _text_ex0e33ior(), _listen_g76orzwgy(_attr_7ojoxiq33(_el_uroyhesqi("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_ex0e33ior()), _text_ex0e33ior(), _text_ex0e33ior(), _reactiveIf_bmu3k4wd6(() => todo.value.length > 0 ? 0 : 1, [() => [_text_ex0e33ior(), _append_epm6beoab(_listen_g76orzwgy(_reactiveProp_0o43mixla(_el_uroyhesqi("todo-list"), "todo", () => todo.value), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_ex0e33ior()), _text_ex0e33ior()], () => [_text_ex0e33ior(), _append_epm6beoab(_el_uroyhesqi("i"), _text_ex0e33ior("No tasks to do.")), _text_ex0e33ior()]]), _text_ex0e33ior());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);