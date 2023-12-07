import { text as _text_8vo8f4e1w, svg as _svg_wdsdvsaj5, attr as _attr_dh8ols3fb, append as _append_mzsravy5w, CopperElement as _CopperElement_jwttgyniv } from "@kirick/copper";
import { number as _wvq0kbq4f, maxValue as _qji7s37wf, safeParse as _eec92smjw } from "valibot";
export default class CopperTodoTitleElement extends _CopperElement_jwttgyniv {
  static css = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\n\t\t& svg {\n\t\t\tdisplay: inline-block;\n\t\t\twidth: auto;\n\t\t\theight: .8em;\n\t\t}\n\t}\n";
  constructor() {
    super();
    const number = _wvq0kbq4f,
      maxValue = _qji7s37wf,
      safeParse = _eec92smjw;
    this._copper.propsValidators = {
      count: value => safeParse(number([maxValue(10)]), value).success
    };
  }
  init() {
    const number = _wvq0kbq4f,
      maxValue = _qji7s37wf,
      safeParse = _eec92smjw;
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
    super.render(_text_8vo8f4e1w(), _append_mzsravy5w(_attr_dh8ols3fb(_svg_wdsdvsaj5("svg"), "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512"), _text_8vo8f4e1w(), _attr_dh8ols3fb(_svg_wdsdvsaj5("path"), "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32", "d", "M224 184h128M224 256h128M224 327h128"), _text_8vo8f4e1w(), _attr_dh8ols3fb(_svg_wdsdvsaj5("path"), "d", "M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z", "fill", "none", "stroke", "currentColor", "stroke-miterlimit", "10", "stroke-width", "32"), _text_8vo8f4e1w(), _attr_dh8ols3fb(_svg_wdsdvsaj5("circle"), "cx", "168", "cy", "184", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_8vo8f4e1w(), _attr_dh8ols3fb(_svg_wdsdvsaj5("circle"), "cx", "168", "cy", "257", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_8vo8f4e1w(), _attr_dh8ols3fb(_svg_wdsdvsaj5("circle"), "cx", "168", "cy", "328", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_8vo8f4e1w()), _text_8vo8f4e1w(" Todo ("), _text_8vo8f4e1w(() => count.value), _text_8vo8f4e1w(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);