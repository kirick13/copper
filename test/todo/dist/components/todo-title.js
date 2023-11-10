import * as _hkkz2a79b from "copper";
import {el, text, fragment, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, reactiveIf, reactiveFor, reactiveProp, listen, CopperElement} from "copper";
{
  const el_style = el("style");
  el_style.innerText = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\t}\n";
  document.head.append(el_style);
}
export default class CopperTodoTitleElement extends CopperElement {
  _init() {
    const {ref} = _hkkz2a79b;
    const {count} = this._copper.props;
    super._init({
      count
    });
  }
  _render($root, {count}) {
    const {ref} = _hkkz2a79b;
    const _g3h9dwli6 = text("\n\tTodo (");
    const _pbhu1xnz7 = text();
    reactiveTextNode(_pbhu1xnz7, () => count)
    const _85oi36zyo = text(")\n");
    $root.append(_g3h9dwli6, _pbhu1xnz7, _85oi36zyo);
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);
