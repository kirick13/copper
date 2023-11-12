import { ref as _ref_xq50dv8kb, text as _text_tnq5efkg9, el as _el_d1t8n34wb, reactiveProp as _reactiveProp_5v7r75qhg, attr as _attr_ytsjot4ph, listen as _listen_klzifx7wt, append as _append_okyowud00, reactiveInputValue as _reactiveInputValue_1xp8a6tva, reactiveIf as _reactiveIf_0i9mdqelu, CopperElement as _CopperElement_ji7tlhh8g } from "copper";
import _5xxqi0pyc from "/test/todo/dist/components/todo-list.js";
import _xt1eyr88q from "/test/todo/dist/components/todo-title.js";
{
  const _yomwxzqk0 = _el_d1t8n34wb("style");
  _yomwxzqk0.innerText = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(_yomwxzqk0);
}
export default class CopperTodoElement extends _CopperElement_ji7tlhh8g {
  init() {
    const TodoList = _5xxqi0pyc;
    const TodoTitle = _xt1eyr88q;
    const counter = _ref_xq50dv8kb(0);
    const new_todo_title = _ref_xq50dv8kb('');
    const todo = _ref_xq50dv8kb([]);
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
    super.render(_text_tnq5efkg9(), _reactiveProp_5v7r75qhg(_el_d1t8n34wb("todo-title"), "count", () => todo.value.length), _text_tnq5efkg9(), _append_okyowud00(_el_d1t8n34wb("div"), _text_tnq5efkg9(" counter: "), _text_tnq5efkg9(() => counter.value), _text_tnq5efkg9(), _listen_klzifx7wt(_attr_ytsjot4ph(_el_d1t8n34wb("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_tnq5efkg9()), _text_tnq5efkg9(), _append_okyowud00(_el_d1t8n34wb("div"), _text_tnq5efkg9(), _reactiveInputValue_1xp8a6tva(_attr_ytsjot4ph(_el_d1t8n34wb("input"), "type", "text"), () => new_todo_title.value, value => new_todo_title.value = value), _text_tnq5efkg9(), _listen_klzifx7wt(_attr_ytsjot4ph(_el_d1t8n34wb("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_tnq5efkg9()), _text_tnq5efkg9(), _text_tnq5efkg9(), _reactiveIf_0i9mdqelu(() => todo.value.length > 0 ? 0 : 1, [() => [_text_tnq5efkg9(), _append_okyowud00(_listen_klzifx7wt(_reactiveProp_5v7r75qhg(_el_d1t8n34wb("todo-list"), "todo", () => todo.value), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_tnq5efkg9()), _text_tnq5efkg9()], () => [_text_tnq5efkg9(), _append_okyowud00(_el_d1t8n34wb("i"), _text_tnq5efkg9("No tasks to do.")), _text_tnq5efkg9()]]), _text_tnq5efkg9());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);