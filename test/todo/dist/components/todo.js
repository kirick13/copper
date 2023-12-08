import { ref as _ref_1o463h820, text as _text_a37go18ap, el as _el_gfjpdwvpj, reactiveProp as _reactiveProp_yyqxh6m4l, attr as _attr_1jw7d9p3x, listen as _listen_p9joz4qdh, append as _append_2e792nw72, reactiveInputValue as _reactiveInputValue_14c4t3i24, reactiveIf as _reactiveIf_8w25491wm, CopperElement as _CopperElement_lubcymth5 } from "@kirick/copper";
import { default as _xt40mvae1 } from "/test/todo/dist/components/todo-list.js";
import { default as _auwkyx9xr } from "/test/todo/dist/components/todo-title.js";
export default class CopperTodoElement extends _CopperElement_lubcymth5 {
  static css = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  init() {
    const TodoList = _xt40mvae1;
    const TodoTitle = _auwkyx9xr;
    const counter = _ref_1o463h820(0);
    const new_todo_title = _ref_1o463h820('');
    const todo = _ref_1o463h820([]);
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
    super.render(_text_a37go18ap(), _reactiveProp_yyqxh6m4l(_el_gfjpdwvpj("todo-title"), "count", () => todo.value.length), _text_a37go18ap(), _append_2e792nw72(_el_gfjpdwvpj("div"), _text_a37go18ap(" counter: "), _text_a37go18ap(() => counter.value), _text_a37go18ap(), _listen_p9joz4qdh(_attr_1jw7d9p3x(_el_gfjpdwvpj("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_a37go18ap()), _text_a37go18ap(), _append_2e792nw72(_el_gfjpdwvpj("div"), _text_a37go18ap(), _reactiveInputValue_14c4t3i24(_attr_1jw7d9p3x(_el_gfjpdwvpj("input"), "type", "text", "class", () => ({
      'test-value': counter.value > 1
    }), "style", () => ({
      'color': new_todo_title.value.length >= 10 ? 'red' : null
    })), () => new_todo_title.value, value => new_todo_title.value = value), _text_a37go18ap(), _listen_p9joz4qdh(_attr_1jw7d9p3x(_el_gfjpdwvpj("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_a37go18ap()), _text_a37go18ap(), _text_a37go18ap(), _reactiveIf_8w25491wm(() => todo.value.length > 0 ? 0 : 1, [() => [_text_a37go18ap(), _append_2e792nw72(_listen_p9joz4qdh(_reactiveProp_yyqxh6m4l(_el_gfjpdwvpj("todo-list"), "todo", () => todo.value, "test_value", () => ({
      is_counter: counter.value > 1
    })), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_a37go18ap()), _text_a37go18ap()], () => [_text_a37go18ap(), _append_2e792nw72(_el_gfjpdwvpj("i"), _text_a37go18ap("No tasks to do.")), _text_a37go18ap()]]), _text_a37go18ap());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);