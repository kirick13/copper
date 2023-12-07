import { ref as _ref_v2nm3g4n8, text as _text_za4i1abey, el as _el_7xk0t88lf, reactiveProp as _reactiveProp_ibkrk4y50, attr as _attr_98yg03unj, listen as _listen_2cawt84e1, append as _append_12abq9xuh, reactiveInputValue as _reactiveInputValue_uwp0booh7, reactiveIf as _reactiveIf_16j24559g, CopperElement as _CopperElement_bomxnow3x } from "@kirick/copper";
import { default as _fap8e2r5j } from "/test/todo/dist/components/todo-list.js";
import { default as _o5vdpih73 } from "/test/todo/dist/components/todo-title.js";
export default class CopperTodoElement extends _CopperElement_bomxnow3x {
  static css = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  init() {
    const TodoList = _fap8e2r5j;
    const TodoTitle = _o5vdpih73;
    const counter = _ref_v2nm3g4n8(0);
    const new_todo_title = _ref_v2nm3g4n8('');
    const todo = _ref_v2nm3g4n8([]);
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
    super.render(_text_za4i1abey(), _reactiveProp_ibkrk4y50(_el_7xk0t88lf("todo-title"), "count", () => todo.value.length), _text_za4i1abey(), _append_12abq9xuh(_el_7xk0t88lf("div"), _text_za4i1abey(" counter: "), _text_za4i1abey(() => counter.value), _text_za4i1abey(), _listen_2cawt84e1(_attr_98yg03unj(_el_7xk0t88lf("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_za4i1abey()), _text_za4i1abey(), _append_12abq9xuh(_el_7xk0t88lf("div"), _text_za4i1abey(), _reactiveInputValue_uwp0booh7(_attr_98yg03unj(_el_7xk0t88lf("input"), "type", "text", "class", () => ({
      'test-value': counter.value > 1
    })), () => new_todo_title.value, value => new_todo_title.value = value), _text_za4i1abey(), _listen_2cawt84e1(_attr_98yg03unj(_el_7xk0t88lf("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_za4i1abey()), _text_za4i1abey(), _text_za4i1abey(), _reactiveIf_16j24559g(() => todo.value.length > 0 ? 0 : 1, [() => [_text_za4i1abey(), _append_12abq9xuh(_listen_2cawt84e1(_reactiveProp_ibkrk4y50(_el_7xk0t88lf("todo-list"), "todo", () => todo.value), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_za4i1abey()), _text_za4i1abey()], () => [_text_za4i1abey(), _append_12abq9xuh(_el_7xk0t88lf("i"), _text_za4i1abey("No tasks to do.")), _text_za4i1abey()]]), _text_za4i1abey());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);