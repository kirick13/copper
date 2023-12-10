import { text as _text_0nigpfjpd, svg as _svg_8sax3vaik, attr as _attr_wajmxi2wy, append as _append_kf7yrhvft, CopperElement as _CopperElement_teta5z55t } from "@kirick/copper";
import { number as _zxz5leymm, maxValue as _rxjgdcqql, safeParse as _0rqwsf98y } from "valibot";
export default class CopperTodoTitleElement extends _CopperElement_teta5z55t {
  static css = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\n\t\t& svg {\n\t\t\tdisplay: inline-block;\n\t\t\twidth: auto;\n\t\t\theight: .8em;\n\t\t}\n\t}\n";
  constructor() {
    super();
    const number = _zxz5leymm,
      maxValue = _rxjgdcqql,
      safeParse = _0rqwsf98y;
    this.defineProps({
      count: value => safeParse(number([maxValue(10)]), value).success
    });
  }
  init() {
    const number = _zxz5leymm,
      maxValue = _rxjgdcqql,
      safeParse = _0rqwsf98y;
    const count = this.props.count;
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
    super.render(_text_0nigpfjpd(), _append_kf7yrhvft(_attr_wajmxi2wy(_svg_8sax3vaik("svg"), "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512"), _text_0nigpfjpd(), _attr_wajmxi2wy(_svg_8sax3vaik("path"), "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32", "d", "M224 184h128M224 256h128M224 327h128"), _text_0nigpfjpd(), _attr_wajmxi2wy(_svg_8sax3vaik("path"), "d", "M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z", "fill", "none", "stroke", "currentColor", "stroke-miterlimit", "10", "stroke-width", "32"), _text_0nigpfjpd(), _attr_wajmxi2wy(_svg_8sax3vaik("circle"), "cx", "168", "cy", "184", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_0nigpfjpd(), _attr_wajmxi2wy(_svg_8sax3vaik("circle"), "cx", "168", "cy", "257", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_0nigpfjpd(), _attr_wajmxi2wy(_svg_8sax3vaik("circle"), "cx", "168", "cy", "328", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_0nigpfjpd()), _text_0nigpfjpd(" Todo ("), _text_0nigpfjpd(() => count.value), _text_0nigpfjpd(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);