import { ref as _ref_m5jx3ql6a, text as _text_ofh2ojygn, el as _el_ox8lteqbn, reactiveProp as _reactiveProp_nxfcjlo5n, attr as _attr_ryiixd9us, listen as _listen_zsbslbqzg, append as _append_wh1m04q89, reactiveInputValue as _reactiveInputValue_vj8w5fdc6, reactiveIf as _reactiveIf_lohp88hfp, CopperElement as _CopperElement_skjzmlge9 } from "@kirick/copper";
import { default as _lg2ttaibo } from "/test/todo/dist/components/todo-list.js";
import { default as _qelbh4uzi } from "/test/todo/dist/components/todo-title.js";
export default class CopperTodoElement extends _CopperElement_skjzmlge9 {
  static css = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  init() {
    const TodoList = _lg2ttaibo;
    const TodoTitle = _qelbh4uzi;
    const addTodo = function addTodo(arg) {
      todo.push({
        id: Date.now(),
        title: new_todo_title
      });
      new_todo_title = '';
    }.bind(this);
    const counter = _ref_m5jx3ql6a(0);
    const new_todo_title = _ref_m5jx3ql6a('');
    const todo = _ref_m5jx3ql6a([]);
    this._copper.watch(() => todo.value.length, value => {
      console.log('todo.length', value);
    }, {
      immediate: true
    });
    this._copper.listen("copper:#mounted", () => {
      console.log('cu-todo mounted!');
    });
    this._copper.listen("copper:#unmounted", () => {
      console.log('cu-todo unmounted :(');
    });
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
    super.render(_text_ofh2ojygn(), _reactiveProp_nxfcjlo5n(_el_ox8lteqbn("todo-title"), "count", () => todo.value.length), _text_ofh2ojygn(), _append_wh1m04q89(_el_ox8lteqbn("div"), _text_ofh2ojygn(" counter: "), _text_ofh2ojygn(() => counter.value), _text_ofh2ojygn(), _listen_zsbslbqzg(_attr_ryiixd9us(_el_ox8lteqbn("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_ofh2ojygn()), _text_ofh2ojygn(), _append_wh1m04q89(_el_ox8lteqbn("div"), _text_ofh2ojygn(), _reactiveInputValue_vj8w5fdc6(_attr_ryiixd9us(_el_ox8lteqbn("input"), "type", "text", "class", () => ({
      'test-value': counter.value > 1
    }), "style", () => ({
      'color': new_todo_title.value.length >= 10 ? 'red' : null
    })), () => new_todo_title.value, value => new_todo_title.value = value), _text_ofh2ojygn(), _listen_zsbslbqzg(_attr_ryiixd9us(_el_ox8lteqbn("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_ofh2ojygn()), _text_ofh2ojygn(), _text_ofh2ojygn(), _reactiveIf_lohp88hfp(() => todo.value.length > 0 ? 0 : 1, [() => [_text_ofh2ojygn(), _append_wh1m04q89(_listen_zsbslbqzg(_reactiveProp_nxfcjlo5n(_el_ox8lteqbn("todo-list"), "todo", () => todo.value, "test_value", () => ({
      is_counter: counter.value > 1
    })), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_ofh2ojygn()), _text_ofh2ojygn()], () => [_text_ofh2ojygn(), _append_wh1m04q89(_el_ox8lteqbn("i"), _text_ofh2ojygn("No tasks to do.")), _text_ofh2ojygn()]]), _text_ofh2ojygn());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);