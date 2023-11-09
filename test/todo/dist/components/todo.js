import * as _yg7fp88d6 from "copper";
import {el, text, fragment, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, reactiveIf, reactiveFor, listen, CopperElement} from "copper";
{
  const el_style = el("style");
  el_style.innerText = "\n\tcu-todo {\n\t\tcontent: '`123`';\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(el_style);
}
class CopperTodoElement extends CopperElement {
  #state = {};
  constructor() {
    super();
    {
      const {ref, reactive} = _yg7fp88d6;
      const new_todo_title = ref('');
      this.#state.new_todo_title = new_todo_title;
      const todo = reactive([]);
      this.#state.todo = todo;
      function addTodo() {
        todo.push({
          id: Date.now(),
          title: new_todo_title.value
        });
        new_todo_title.value = '';
      }
      this.#state.addTodo = addTodo;
    }
  }
  render($root = this.root) {
    const {ref, reactive} = _yg7fp88d6;
    const {new_todo_title, todo, addTodo} = this.#state;
    const _pnzibnjla = text("\n\t");
    const _y86xn5o68 = el("h2");
    const _ow9759fp6 = text("Todo:");
    _y86xn5o68.append(_ow9759fp6);
    const _aro3svzwb = text("\n\t");
    const _f467dsvro = el("div");
    const _xc269eojt = text("\n\t\t");
    const _h4v5mcasa = el("input");
    attr(_h4v5mcasa, "type", "text")
    reactiveInputValue(_h4v5mcasa, () => new_todo_title)
    const _6qtiisn9s = text("\n\t\t");
    const _4gkx61ku2 = el("input");
    attr(_4gkx61ku2, "type", "button")
    attr(_4gkx61ku2, "value", "Add")
    listen(_4gkx61ku2, "click", $event => addTodo(), [])
    const _zytlplm1j = text("\n\t");
    _f467dsvro.append(_xc269eojt, _h4v5mcasa, _6qtiisn9s, _4gkx61ku2, _zytlplm1j);
    const _nurrcg6ps = text("\n\t");
    const _2252e2ra5 = text("\n\t");
    const _17dwlk7my = reactiveIf(() => todo.length > 0 ? 0 : 1, [() => {
      const _e2iwlu83d = text("\n\t\t");
      const _855ea0bew = reactiveFor(() => todo, (task, index) => task.id, (task, index) => {
        const _1jh1hf5y7 = text("\n\t\t\t");
        const _o9pr4wr50 = el("div");
        const _nh7ztvcuu = text("\n\t\t\t\tTask #");
        const _fzy9oghpz = text();
        reactiveTextNode(_fzy9oghpz, () => index.value + 1)
        const _0dkqwwyon = text(": ");
        const _j9sdd2kgn = text();
        reactiveTextNode(_j9sdd2kgn, () => task.value.title)
        const _vchak6k8y = text("\n\t\t\t\t");
        const _wsya7t7g7 = el("input");
        attr(_wsya7t7g7, "type", "button")
        attr(_wsya7t7g7, "value", "Remove")
        listen(_wsya7t7g7, "click", $event => todo.splice(index.value, 1), [])
        const _ka5awr5ti = text("\n\t\t\t");
        _o9pr4wr50.append(_nh7ztvcuu, _fzy9oghpz, _0dkqwwyon, _j9sdd2kgn, _vchak6k8y, _wsya7t7g7, _ka5awr5ti);
        const _lc3ov2wsd = text("\n\t\t");
        return [_1jh1hf5y7, _o9pr4wr50, _lc3ov2wsd];
      });
      const _6fdvdnuof = text("\n\t");
      return [_e2iwlu83d, _855ea0bew, _6fdvdnuof];
    }, () => {
      const _74xztauv2 = text("\n\t\t");
      const _sm8eebuys = el("i");
      const _8lg8r0o2z = text("No tasks to do.");
      _sm8eebuys.append(_8lg8r0o2z);
      const _bgv2lnqy9 = text("\n\t");
      return [_74xztauv2, _sm8eebuys, _bgv2lnqy9];
    }]);
    const _lbxx6ck9x = text("\n");
    $root.append(_pnzibnjla, _y86xn5o68, _aro3svzwb, _f467dsvro, _nurrcg6ps, _2252e2ra5, _17dwlk7my, _lbxx6ck9x);
  }
}
window.customElements.define("cu-todo", CopperTodoElement);
