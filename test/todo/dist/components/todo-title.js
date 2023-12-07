import { text as _text_isui4syg4, svg as _svg_tw38guqi1, attr as _attr_orwxwbfv9, append as _append_jp88zo5hr, CopperElement as _CopperElement_4hso2zu6w } from "@kirick/copper";
import { number as _kdx6q19ng, maxValue as _l6yhse115, safeParse as _grpp72hnt } from "valibot";
export default class CopperTodoTitleElement extends _CopperElement_4hso2zu6w {
  static css = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\n\t\t& svg {\n\t\t\tdisplay: inline-block;\n\t\t\twidth: auto;\n\t\t\theight: .8em;\n\t\t}\n\t}\n";
  constructor() {
    super();
    const number = _kdx6q19ng,
      maxValue = _l6yhse115,
      safeParse = _grpp72hnt;
    this._copper.propsValidators = {
      count: value => safeParse(number([maxValue(10)]), value).success
    };
  }
  init() {
    const number = _kdx6q19ng,
      maxValue = _l6yhse115,
      safeParse = _grpp72hnt;
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
    super.render(_text_isui4syg4(), _append_jp88zo5hr(_attr_orwxwbfv9(_svg_tw38guqi1("svg"), "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512"), _text_isui4syg4(), _attr_orwxwbfv9(_svg_tw38guqi1("path"), "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32", "d", "M224 184h128M224 256h128M224 327h128"), _text_isui4syg4(), _attr_orwxwbfv9(_svg_tw38guqi1("path"), "d", "M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z", "fill", "none", "stroke", "currentColor", "stroke-miterlimit", "10", "stroke-width", "32"), _text_isui4syg4(), _attr_orwxwbfv9(_svg_tw38guqi1("circle"), "cx", "168", "cy", "184", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_isui4syg4(), _attr_orwxwbfv9(_svg_tw38guqi1("circle"), "cx", "168", "cy", "257", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_isui4syg4(), _attr_orwxwbfv9(_svg_tw38guqi1("circle"), "cx", "168", "cy", "328", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_isui4syg4()), _text_isui4syg4(" Todo ("), _text_isui4syg4(() => count.value), _text_isui4syg4(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);