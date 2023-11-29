import { ref as _ref_y6jko18o4, text as _text_8l22kbvm1, el as _el_1winatx87, reactiveProp as _reactiveProp_uggypi9i9, attr as _attr_k8kdvi2q8, listen as _listen_shth7t2xj, append as _append_vjnsey8sa, reactiveInputValue as _reactiveInputValue_ch8myf059, reactiveIf as _reactiveIf_eokp86isv, CopperElement as _CopperElement_ibndx5vy2 } from "@kirick/copper";
import { default as _qk838vp7z } from "/test/todo/dist/components/todo-list.js";
import { default as _czrx4lyz4 } from "/test/todo/dist/components/todo-title.js";
export default class CopperTodoElement extends _CopperElement_ibndx5vy2 {
  static css = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  init() {
    const TodoList = _qk838vp7z;
    const TodoTitle = _czrx4lyz4;
    const counter = _ref_y6jko18o4(0);
    const new_todo_title = _ref_y6jko18o4('');
    const todo = _ref_y6jko18o4([]);
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
    super.render(_text_8l22kbvm1(), _reactiveProp_uggypi9i9(_el_1winatx87("todo-title"), "count", () => todo.value.length), _text_8l22kbvm1(), _append_vjnsey8sa(_el_1winatx87("div"), _text_8l22kbvm1(" counter: "), _text_8l22kbvm1(() => counter.value), _text_8l22kbvm1(), _listen_shth7t2xj(_attr_k8kdvi2q8(_el_1winatx87("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_8l22kbvm1()), _text_8l22kbvm1(), _append_vjnsey8sa(_el_1winatx87("div"), _text_8l22kbvm1(), _reactiveInputValue_ch8myf059(_attr_k8kdvi2q8(_el_1winatx87("input"), "type", "text"), () => new_todo_title.value, value => new_todo_title.value = value), _text_8l22kbvm1(), _listen_shth7t2xj(_attr_k8kdvi2q8(_el_1winatx87("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_8l22kbvm1()), _text_8l22kbvm1(), _text_8l22kbvm1(), _reactiveIf_eokp86isv(() => todo.value.length > 0 ? 0 : 1, [() => [_text_8l22kbvm1(), _append_vjnsey8sa(_listen_shth7t2xj(_reactiveProp_uggypi9i9(_el_1winatx87("todo-list"), "todo", () => todo.value), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_8l22kbvm1()), _text_8l22kbvm1()], () => [_text_8l22kbvm1(), _append_vjnsey8sa(_el_1winatx87("i"), _text_8l22kbvm1("No tasks to do.")), _text_8l22kbvm1()]]), _text_8l22kbvm1());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);