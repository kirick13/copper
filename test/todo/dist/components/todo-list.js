import * as _axtq0xvna from "copper";
import {el, text, fragment, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, reactiveIf, reactiveFor, reactiveProp, listen, CopperElement} from "copper";
{
  const el_style = el("style");
  el_style.innerText = "\n\ttodo-list {\n\t\tdisplay: block;\n\t\tpadding: 10px;\n\t\tborder: 1px solid #ccc;\n\t\tborder-radius: 5px;\n\t}\n";
  document.head.append(el_style);
}
export default class CopperTodoListElement extends CopperElement {
  _init() {
    const {emit} = _axtq0xvna;
    const {todo} = this._copper.props;
    const remove = function remove(index) {
      this.emit('remove', index);
    }.bind(this);
    super._init({
      todo,
      remove
    });
  }
  _render($root, {todo, remove}) {
    const {emit} = _axtq0xvna;
    const _jsf3mg6jd = text("\n\t");
    const _xqbp0cr5c = reactiveFor(() => todo.value, (task, index) => task.id, (task, index) => {
      const _bkjh40sdm = text("\n\t\t");
      const _98frzaemx = el("div");
      const _7ljnbcku2 = text("\n\t\t\tTask #");
      const _ew217o57p = text();
      reactiveTextNode(_ew217o57p, () => index.value + 1)
      const _t93riab0l = text(": ");
      const _bbo8ib3r1 = text();
      reactiveTextNode(_bbo8ib3r1, () => task.value.title)
      const _8btiyvw8z = text("\n\t\t\t");
      const _x088qr8yr = el("input");
      attr(_x088qr8yr, "type", "button")
      attr(_x088qr8yr, "value", "Remove")
      listen(_x088qr8yr, "click", $event => remove(index.value), [])
      const _90am42ja4 = text("\n\t\t");
      _98frzaemx.append(_7ljnbcku2, _ew217o57p, _t93riab0l, _bbo8ib3r1, _8btiyvw8z, _x088qr8yr, _90am42ja4);
      const _yoa7mq8ms = text("\n\t");
      return [_bkjh40sdm, _98frzaemx, _yoa7mq8ms];
    });
    const _ve3v6cal4 = text("\n");
    $root.append(_jsf3mg6jd, _xqbp0cr5c, _ve3v6cal4);
  }
}
window.customElements.define("todo-list", CopperTodoListElement);
