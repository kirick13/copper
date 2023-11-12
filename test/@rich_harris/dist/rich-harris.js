import { ref as _ref_e3srgfxp8, computed as _computed_7nbvqtk5z, text as _text_pgh3w4vlp, el as _el_xenizjarp, listen as _listen_hlwoj1yex, append as _append_mkjvlku3e, CopperElement as _CopperElement_j4kf94yke } from "copper";
export default class CopperRichHarrisElement extends _CopperElement_j4kf94yke {
  init() {
    const count = _ref_e3srgfxp8(0);
    const double = _computed_7nbvqtk5z(() => count.value * 2);
    super.init({
      count,
      double
    });
  }
  render({
    count,
    double
  }) {
    super.render(_text_pgh3w4vlp(), _append_mkjvlku3e(_listen_hlwoj1yex(_el_xenizjarp("div"), "click", $event => count.value++, []), _text_pgh3w4vlp(), _text_pgh3w4vlp(() => count.value), _text_pgh3w4vlp(), _text_pgh3w4vlp(() => double.value), _text_pgh3w4vlp()), _text_pgh3w4vlp());
  }
}
window.customElements.define("rich-harris", CopperRichHarrisElement);