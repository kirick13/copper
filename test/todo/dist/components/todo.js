import { ref as _ref_jr4jbquo5, text as _text_tvc8baoks, el as _el_481akvji9, reactiveProp as _reactiveProp_3k0q1j6rx, attr as _attr_9er6m8us7, listen as _listen_78opks73x, append as _append_ovqseip5t, reactiveInputValue as _reactiveInputValue_43vnxmvkp, reactiveIf as _reactiveIf_tzllaaoeq, CopperElement as _CopperElement_8ln9qrp2q } from "@kirick/copper";
import { default as _lg5tn7wf2 } from "/test/todo/dist/components/todo-list.js";
import { default as _2qgfpy6v2 } from "/test/todo/dist/components/todo-title.js";
export default class CopperTodoElement extends _CopperElement_8ln9qrp2q {
  static css = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  init() {
    const TodoList = _lg5tn7wf2;
    const TodoTitle = _2qgfpy6v2;
    const addTodo = function addTodo(arg) {
      todo.value.push({
        id: Date.now(),
        title: new_todo_title.value
      });
      new_todo_title.value = '';
    }.bind(this);
    const counter = _ref_jr4jbquo5(0);
    const new_todo_title = _ref_jr4jbquo5('');
    const todo = _ref_jr4jbquo5([]);
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
    super.render(_text_tvc8baoks(), _reactiveProp_3k0q1j6rx(_el_481akvji9("todo-title"), "count", () => todo.value.length), _text_tvc8baoks(), _append_ovqseip5t(_el_481akvji9("div"), _text_tvc8baoks(" counter: "), _text_tvc8baoks(() => counter.value), _text_tvc8baoks(), _listen_78opks73x(_attr_9er6m8us7(_el_481akvji9("input"), "type", "button", "value", "Increment"), "click", $event => counter.value++, []), _text_tvc8baoks()), _text_tvc8baoks(), _append_ovqseip5t(_el_481akvji9("div"), _text_tvc8baoks(), _reactiveInputValue_43vnxmvkp(_attr_9er6m8us7(_el_481akvji9("input"), "type", "text", "class", () => ({
      'test-value': counter.value > 1
    }), "style", () => ({
      'color': new_todo_title.value.length >= 10 ? 'red' : null
    })), () => new_todo_title.value, value => new_todo_title.value = value), _text_tvc8baoks(), _listen_78opks73x(_attr_9er6m8us7(_el_481akvji9("input"), "type", "button", "value", "Add"), "click", $event => addTodo(), []), _text_tvc8baoks()), _text_tvc8baoks(), _text_tvc8baoks(), _reactiveIf_tzllaaoeq(() => todo.value.length > 0 ? 0 : 1, [() => [_text_tvc8baoks(), _append_ovqseip5t(_listen_78opks73x(_reactiveProp_3k0q1j6rx(_el_481akvji9("todo-list"), "todo", () => todo.value, "test_value", () => ({
      is_counter: counter.value > 1
    })), "copper:remove", $event => todo.value.splice($event, 1), [".component"]), _text_tvc8baoks()), _text_tvc8baoks()], () => [_text_tvc8baoks(), _append_ovqseip5t(_el_481akvji9("i"), _text_tvc8baoks("No tasks to do.")), _text_tvc8baoks()]]), _text_tvc8baoks());
  }
}
window.customElements.define("cu-todo", CopperTodoElement);