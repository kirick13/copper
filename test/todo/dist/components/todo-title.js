import { text as _text_jeypl8oid, el as _el_wwchhe2d4, CopperElement as _CopperElement_3fkvl5ho5 } from "copper";
import * as _grljklrjb from "valibot";
{
  const _g1epdw7k1 = _el_wwchhe2d4("style");
  _g1epdw7k1.innerText = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\t}\n";
  document.head.append(_g1epdw7k1);
}
export default class CopperTodoTitleElement extends _CopperElement_3fkvl5ho5 {
  constructor() {
    super();
    const {
      number,
      maxValue,
      safeParse
    } = _grljklrjb;
    this._copper.propsValidators = {
      count: value => safeParse(number([maxValue(10)]), value).success
    };
  }
  init() {
    const {
      number,
      maxValue,
      safeParse
    } = _grljklrjb;
    const count = this._copper.props.count;
    super.init({
      number,
      maxValue,
      safeParse,
      count
    });
  }
  render({
    number,
    maxValue,
    safeParse,
    count
  }) {
    super.render(_text_jeypl8oid(" Todo ("), _text_jeypl8oid(() => count.value), _text_jeypl8oid(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);