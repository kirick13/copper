import * as _lh6t0gpsl from "copper";
import _177z6ejlg from "/test/todo/dist/components/todo-title.js";
import _o550n8v2k from "/test/todo/dist/components/todo-list.js";
import {el, text, fragment, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, reactiveIf, reactiveFor, reactiveProp, listen, CopperElement} from "copper";
{
  const el_style = el("style");
  el_style.innerText = "\n\tcu-todo {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(el_style);
}
export default class CopperTodoElement extends CopperElement {
  _init() {
    const {ref, reactive} = _lh6t0gpsl;
    const TodoTitle = _177z6ejlg;
    const TodoList = _o550n8v2k;
    const new_todo_title = ref('');
    const todo = reactive([]);
    const addTodo = function addTodo() {
      todo.push({
        id: Date.now(),
        title: new_todo_title.value
      });
      new_todo_title.value = '';
    }.bind(this);
    super._init({
      new_todo_title,
      todo,
      addTodo
    });
  }
  _render($root, {new_todo_title, todo, addTodo}) {
    const {ref, reactive} = _lh6t0gpsl;
    const TodoTitle = _177z6ejlg;
    const TodoList = _o550n8v2k;
    const _nzm34oaog = text("\n\t");
    const _27292v6kh = el("todo-title");
    reactiveProp(_27292v6kh, "count", () => todo.length)
    const _7fxbzwu6y = text("\n\t");
    const _w4jviwpo6 = el("div");
    const _orn6v9cyi = text("\n\t\t");
    const _4ab02u198 = el("input");
    attr(_4ab02u198, "type", "text")
    reactiveInputValue(_4ab02u198, () => new_todo_title)
    const _8xg8qpio2 = text("\n\t\t");
    const _rbfjfms7g = el("input");
    attr(_rbfjfms7g, "type", "button")
    attr(_rbfjfms7g, "value", "Add")
    listen(_rbfjfms7g, "click", $event => addTodo(), [])
    const _17yhok283 = text("\n\t");
    _w4jviwpo6.append(_orn6v9cyi, _4ab02u198, _8xg8qpio2, _rbfjfms7g, _17yhok283);
    const _njd9m3pbb = text("\n\t");
    const _dq2r75p03 = text("\n\t");
    const _r6pc91x52 = reactiveIf(() => todo.length > 0 ? 0 : 1, [() => {
      const _v0frz8xx9 = text("\n\t\t");
      const _wana3aksr = el("todo-list");
      reactiveProp(_wana3aksr, "todo", () => todo)
      listen(_wana3aksr, "copper:remove", $event => todo.splice($event, 1), [".component"])
      const _scnplnhgm = text("\n\t\t");
      _wana3aksr.append(_scnplnhgm);
      const _wuseqp4bi = text("\n\t");
      return [_v0frz8xx9, _wana3aksr, _wuseqp4bi];
    }, () => {
      const _cd8lzwue4 = text("\n\t\t");
      const _4470oep4h = el("i");
      const _k019v4ufw = text("No tasks to do.");
      _4470oep4h.append(_k019v4ufw);
      const _z6od8yx6f = text("\n\t");
      return [_cd8lzwue4, _4470oep4h, _z6od8yx6f];
    }]);
    const _cnz5t2xdv = text("\n");
    $root.append(_nzm34oaog, _27292v6kh, _7fxbzwu6y, _w4jviwpo6, _njd9m3pbb, _dq2r75p03, _r6pc91x52, _cnz5t2xdv);
  }
}
window.customElements.define("cu-todo", CopperTodoElement);
