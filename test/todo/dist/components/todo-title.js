import { text as _text_0ii41vz3q, svg as _svg_pfw2mffxs, attr as _attr_nsycndjx4, append as _append_pe1effrtt, CopperElement as _CopperElement_ut114zbqp } from "@kirick/copper";
import { number as _23j9fvpbr, maxValue as _l55jkm2hf, safeParse as _odxbjo5g8 } from "valibot";
export default class CopperTodoTitleElement extends _CopperElement_ut114zbqp {
  static css = "\n\ttodo-title {\n\t\tdisplay: block;\n\t\tfont-size: 1.5em;\n\t\tfont-weight: bold;\n\t\tmargin-bottom: .5em;\n\n\t\t& svg {\n\t\t\tdisplay: inline-block;\n\t\t\twidth: auto;\n\t\t\theight: .8em;\n\t\t}\n\t}\n";
  constructor() {
    super();
    const number = _23j9fvpbr,
      maxValue = _l55jkm2hf,
      safeParse = _odxbjo5g8;
    this._copper.propsValidators = {
      count: value => safeParse(number([maxValue(10)]), value).success
    };
  }
  init() {
    const number = _23j9fvpbr,
      maxValue = _l55jkm2hf,
      safeParse = _odxbjo5g8;
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
    super.render(_text_0ii41vz3q(), _append_pe1effrtt(_attr_nsycndjx4(_svg_pfw2mffxs("svg"), "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512"), _text_0ii41vz3q(), _attr_nsycndjx4(_svg_pfw2mffxs("path"), "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32", "d", "M224 184h128M224 256h128M224 327h128"), _text_0ii41vz3q(), _attr_nsycndjx4(_svg_pfw2mffxs("path"), "d", "M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z", "fill", "none", "stroke", "currentColor", "stroke-miterlimit", "10", "stroke-width", "32"), _text_0ii41vz3q(), _attr_nsycndjx4(_svg_pfw2mffxs("circle"), "cx", "168", "cy", "184", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_0ii41vz3q(), _attr_nsycndjx4(_svg_pfw2mffxs("circle"), "cx", "168", "cy", "257", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_0ii41vz3q(), _attr_nsycndjx4(_svg_pfw2mffxs("circle"), "cx", "168", "cy", "328", "r", "8", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "32"), _text_0ii41vz3q()), _text_0ii41vz3q(" Todo ("), _text_0ii41vz3q(() => count.value), _text_0ii41vz3q(") "));
  }
}
window.customElements.define("todo-title", CopperTodoTitleElement);