import { text as _text_2aug9jzpy, svg as _svg_puvmuya8l, attr as _attr_89l5dzqel, append as _append_2b7b0mk4g, CopperElement as _CopperElement_oavo9mtlz } from "@kirick/copper";
import { number as _urjfbzu21, maxValue as _hzs4sbnim, safeParse as _pd1snddmi } from "valibot";
export default class CopperTodoTitleElement extends _CopperElement_oavo9mtlz {
  static css = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\n\t\t& svg {\n\t\t\tdisplay: inline-block;\n\t\t\twidth: auto;\n\t\t\theight: .8em;\n\t\t}\n\t}\n";
  constructor() {
    super();
    const number = _urjfbzu21,
      maxValue = _hzs4sbnim,
      safeParse = _pd1snddmi;
    this._copper.propsValidators = {
      count: value => safeParse(number([maxValue(10)]), value).success
    };
  }
  init() {
    const number = _urjfbzu21,
      maxValue = _hzs4sbnim,
      safeParse = _pd1snddmi;
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
    super.render(_text_2aug9jzpy(), _append_2b7b0mk4g(_attr_89l5dzqel(_svg_puvmuya8l("svg"), "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512"), _text_2aug9jzpy(), _attr_89l5dzqel(_svg_puvmuya8l("path"), "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32", "d", "M224 184h128M224 256h128M224 327h128"), _text_2aug9jzpy(), _attr_89l5dzqel(_svg_puvmuya8l("path"), "d", "M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z", "fill", "none", "stroke", "currentColor", "stroke-miterlimit", "10", "stroke-width", "32"), _text_2aug9jzpy(), _attr_89l5dzqel(_svg_puvmuya8l("circle"), "cx", "168", "cy", "184", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_2aug9jzpy(), _attr_89l5dzqel(_svg_puvmuya8l("circle"), "cx", "168", "cy", "257", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_2aug9jzpy(), _attr_89l5dzqel(_svg_puvmuya8l("circle"), "cx", "168", "cy", "328", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_2aug9jzpy()), _text_2aug9jzpy(" Todo ("), _text_2aug9jzpy(() => count.value), _text_2aug9jzpy(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);