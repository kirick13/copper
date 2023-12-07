import { ref as _ref_v1cbfynw9, text as _text_y4kiq7ydw, el as _el_5noksj83y, reactiveProp as _reactiveProp_snvckspg5, attr as _attr_l4e8vfc7j, listen as _listen_ryibc2awi, append as _append_rs4u4w5fh, reactiveInputValue as _reactiveInputValue_0k2xv2n53, reactiveIf as _reactiveIf_ull1uly8s, CopperElement as _CopperElement_9pc6xkwzj } from "@kirick/copper";
import { default as _etislcuv7 } from "/test/todo/dist/components/todo-list.js";
import { default as _eguomhbf3 } from "/test/todo/dist/components/todo-title.js";
export default class CopperTodoElement extends _CopperElement_9pc6xkwzj {
  static css = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  init() {
    const TodoList = _etislcuv7;
    const TodoTitle = _eguomhbf3;
    const counter = _ref_v1cbfynw9(0);
    const new_todo_title = _ref_v1cbfynw9('');
    const todo = _ref_v1cbfynw9([]);
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
    super.render(_text_y4kiq7ydw(), _reactiveProp_snvckspg5(_el_5noksj83y("todo-title"), "count", () => todo.value.length), _text_y4kiq7ydw(), _append_rs4u4w5fh(_el_5noksj83y("div"), _text_y4kiq7ydw(" counter: "), _text_y4kiq7ydw(() => counter.value), _text_y4kiq7ydw(), _listen_ryibc2awi(_attr_l4e8vfc7j(_el_5noksj83y("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_y4kiq7ydw()), _text_y4kiq7ydw(), _append_rs4u4w5fh(_el_5noksj83y("div"), _text_y4kiq7ydw(), _reactiveInputValue_0k2xv2n53(_attr_l4e8vfc7j(_el_5noksj83y("input"), "type", "text", "class", () => ({
      'test-value': counter.value > 1
    }), "style", () => ({
      'color': new_todo_title.value.length >= 10 ? 'red' : null
    })), () => new_todo_title.value, value => new_todo_title.value = value), _text_y4kiq7ydw(), _listen_ryibc2awi(_attr_l4e8vfc7j(_el_5noksj83y("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_y4kiq7ydw()), _text_y4kiq7ydw(), _text_y4kiq7ydw(), _reactiveIf_ull1uly8s(() => todo.value.length > 0 ? 0 : 1, [() => [_text_y4kiq7ydw(), _append_rs4u4w5fh(_listen_ryibc2awi(_reactiveProp_snvckspg5(_el_5noksj83y("todo-list"), "todo", () => todo.value, "test_value", () => ({
      is_counter: counter.value > 1
    })), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_y4kiq7ydw()), _text_y4kiq7ydw()], () => [_text_y4kiq7ydw(), _append_rs4u4w5fh(_el_5noksj83y("i"), _text_y4kiq7ydw("No tasks to do.")), _text_y4kiq7ydw()]]), _text_y4kiq7ydw());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);