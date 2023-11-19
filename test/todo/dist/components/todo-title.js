import { text as _text_ikoc50ypu, CopperElement as _CopperElement_7cqn31chl } from "@kirick/copper";
export default class CopperTodoTitleElement extends _CopperElement_7cqn31chl {
  static css = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\t}\n";
  constructor() {
    super();
    this._copper.propsValidators = {
      count: value => safeParse(number([maxValue(10)]), value).success
    };
  }
  init() {
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
    super.render(_text_ikoc50ypu(" Todo ("), _text_ikoc50ypu(() => count.value), _text_ikoc50ypu(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);