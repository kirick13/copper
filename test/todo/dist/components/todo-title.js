import { text as _text_bpyrrnjz6, el as _el_q4wmdopy6, CopperElement as _CopperElement_zwjcr7zok } from "copper";
{
  const el_style = _el_q4wmdopy6("style");
  el_style.innerText = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\t}\n";
  document.head.append(el_style);
}
export default class CopperTodoTitleElement extends _CopperElement_zwjcr7zok {
  init() {
    const count = this._copper.props.count;
    super.init({
      count
    });
  }
  render({
    count
  }) {
    super.render(_text_bpyrrnjz6(" Todo ("), _text_bpyrrnjz6(() => count.value), _text_bpyrrnjz6(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);