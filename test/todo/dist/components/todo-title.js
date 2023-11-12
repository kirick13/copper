import { text as _text_nvk4ofbbu, el as _el_kuklime2l, CopperElement as _CopperElement_k6mv736y6 } from "copper";
import * as _sa1vroucs from "valibot";
{
  const _50280f9a0 = _el_kuklime2l("style");
  _50280f9a0.innerText = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\t}\n";
  document.head.append(_50280f9a0);
}
export default class CopperTodoTitleElement extends _CopperElement_k6mv736y6 {
  init() {
    const {
      number,
      minValue
    } = _sa1vroucs;
    this._copper.propsValidators = {
      count: number([minValue(0)])
    };
    const count = this._copper.props.count;
    super.init({
      number,
      minValue,
      count
    });
  }
  render({
    number,
    minValue,
    count
  }) {
    super.render(_text_nvk4ofbbu(" Todo ("), _text_nvk4ofbbu(() => count.value), _text_nvk4ofbbu(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);