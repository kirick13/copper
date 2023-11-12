import { ref as _ref_brwu3zuro, text as _text_1fj9q0zw7, el as _el_5z02t0l9b, reactiveProp as _reactiveProp_pecs6t4vr, attr as _attr_kkbkqq0y5, listen as _listen_wpm3d6faz, append as _append_z8dbnv80b, reactiveInputValue as _reactiveInputValue_jgkh29fuw, reactiveIf as _reactiveIf_beipo1h0n, CopperElement as _CopperElement_jrqkcqprf } from "copper";
import _egy6xejbb from "/test/todo/dist/components/todo-list.js";
import _k2wf4odr0 from "/test/todo/dist/components/todo-title.js";
{
  const el_style = _el_5z02t0l9b("style");
  el_style.innerText = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(el_style);
}
export default class CopperTodoElement extends _CopperElement_jrqkcqprf {
  init() {
    const TodoList = _egy6xejbb;
    const TodoTitle = _k2wf4odr0;
    const counter = _ref_brwu3zuro(0);
    const new_todo_title = _ref_brwu3zuro('');
    const todo = _ref_brwu3zuro([]);
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
    super.render(_text_1fj9q0zw7(), _reactiveProp_pecs6t4vr(_el_5z02t0l9b("todo-title"), "count", () => todo.value.length), _text_1fj9q0zw7(), _append_z8dbnv80b(_el_5z02t0l9b("div"), _text_1fj9q0zw7(" counter: "), _text_1fj9q0zw7(() => counter.value), _text_1fj9q0zw7(), _listen_wpm3d6faz(_attr_kkbkqq0y5(_el_5z02t0l9b("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_1fj9q0zw7()), _text_1fj9q0zw7(), _append_z8dbnv80b(_el_5z02t0l9b("div"), _text_1fj9q0zw7(), _reactiveInputValue_jgkh29fuw(_attr_kkbkqq0y5(_el_5z02t0l9b("input"), "type", "text"), () => new_todo_title.value, value => new_todo_title.value = value), _text_1fj9q0zw7(), _listen_wpm3d6faz(_attr_kkbkqq0y5(_el_5z02t0l9b("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_1fj9q0zw7()), _text_1fj9q0zw7(), _text_1fj9q0zw7(), _reactiveIf_beipo1h0n(() => todo.value.length > 0 ? 0 : 1, [() => [_text_1fj9q0zw7(), _append_z8dbnv80b(_listen_wpm3d6faz(_reactiveProp_pecs6t4vr(_el_5z02t0l9b("todo-list"), "todo", () => todo.value), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_1fj9q0zw7()), _text_1fj9q0zw7()], () => [_text_1fj9q0zw7(), _append_z8dbnv80b(_el_5z02t0l9b("i"), _text_1fj9q0zw7("No tasks to do.")), _text_1fj9q0zw7()]]), _text_1fj9q0zw7());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);