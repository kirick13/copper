import { text as _text_dt3phy5tz, svg as _svg_qf7oz0cjd, attr as _attr_le0pdcuge, append as _append_2su6fg24y, CopperElement as _CopperElement_1itayqmyi } from "@kirick/copper";
import { number as _jdmcqz2k5, maxValue as _hwigevz3o, safeParse as _iey89k5ne } from "valibot";
export default class CopperTodoTitleElement extends _CopperElement_1itayqmyi {
  static css = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\n\t\t& svg {\n\t\t\tdisplay: inline-block;\n\t\t\twidth: auto;\n\t\t\theight: .8em;\n\t\t}\n\t}\n";
  constructor() {
    super();
    const number = _jdmcqz2k5,
      maxValue = _hwigevz3o,
      safeParse = _iey89k5ne;
    this._copper.propsValidators = {
      count: value => safeParse(number([maxValue(10)]), value).success
    };
  }
  init() {
    const number = _jdmcqz2k5,
      maxValue = _hwigevz3o,
      safeParse = _iey89k5ne;
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
    super.render(_text_dt3phy5tz(), _append_2su6fg24y(_attr_le0pdcuge(_svg_qf7oz0cjd("svg"), "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512"), _text_dt3phy5tz(), _attr_le0pdcuge(_svg_qf7oz0cjd("path"), "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32", "d", "M224 184h128M224 256h128M224 327h128"), _text_dt3phy5tz(), _attr_le0pdcuge(_svg_qf7oz0cjd("path"), "d", "M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z", "fill", "none", "stroke", "currentColor", "stroke-miterlimit", "10", "stroke-width", "32"), _text_dt3phy5tz(), _attr_le0pdcuge(_svg_qf7oz0cjd("circle"), "cx", "168", "cy", "184", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_dt3phy5tz(), _attr_le0pdcuge(_svg_qf7oz0cjd("circle"), "cx", "168", "cy", "257", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_dt3phy5tz(), _attr_le0pdcuge(_svg_qf7oz0cjd("circle"), "cx", "168", "cy", "328", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_dt3phy5tz()), _text_dt3phy5tz(" Todo ("), _text_dt3phy5tz(() => count.value), _text_dt3phy5tz(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);