
	import { ref } from '/test/html/copper.js';

	const count = window.count = ref(0);
	const greeting = window.greeting = ref('Hello World!');
;
import { el, text, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, listen } from "/test/html/copper.js";
const $root = document.querySelector("#app");
const _x90m61g56 = el("p");
attr(_x90m61g56, "class", "foo")
reactiveAttr(_x90m61g56, "class", () => ['_count_' + count.value])
const _rze19n02x = text("\n\t");
_x90m61g56.append(_rze19n02x);
const _uu2w83k24 = el("input");
attr(_uu2w83k24, "type", "text")
attr(_uu2w83k24, "disabled", "")
reactiveAttr(_uu2w83k24, "value", () => greeting)
_x90m61g56.append(_uu2w83k24);
const _diig8wjwi = text("\n\t");
_x90m61g56.append(_diig8wjwi);
const _bpg7ml6n7 = el("input");
attr(_bpg7ml6n7, "type", "text")
reactiveInputValue(_bpg7ml6n7, () => greeting)
_x90m61g56.append(_bpg7ml6n7);
const _q6aa2m34t = text("\n\t");
_x90m61g56.append(_q6aa2m34t);
$root.append(_x90m61g56);
const _ocli77y4y = el("p");
const _wjbyr9swe = text("\n\t\t");
_ocli77y4y.append(_wjbyr9swe);
const _cgck6g3uj = el("input");
attr(_cgck6g3uj, "type", "button")
reactiveAttr(_cgck6g3uj, "disabled", () => count.value <= 0)
attr(_cgck6g3uj, "value", "-")
listen(_cgck6g3uj, "click", () => count.value--, [])
_ocli77y4y.append(_cgck6g3uj);
const _zf8c3fobe = text("\n\t\tCount: ");
const _y1d77t4qw = text("");
reactiveTextNode(_y1d77t4qw, () => count)
const _74oy2812x = text("\n\t\t");
_ocli77y4y.append(_zf8c3fobe);
_ocli77y4y.append(_y1d77t4qw);
_ocli77y4y.append(_74oy2812x);
const _c2n48u64d = el("input");
attr(_c2n48u64d, "type", "button")
reactiveAttr(_c2n48u64d, "disabled", () => count.value >= 9)
attr(_c2n48u64d, "value", "+")
listen(_c2n48u64d, "click", () => count.value++, [])
_ocli77y4y.append(_c2n48u64d);
const _cynmdcm5u = text("\n\t");
_ocli77y4y.append(_cynmdcm5u);
$root.append(_ocli77y4y);
const _husm31gco = text("\n\t");
$root.append(_husm31gco);
const _0sxoxdn97 = text("\n");
$root.append(_0sxoxdn97);
const _wohcetqcj = el("p");
$root.append(_wohcetqcj);
const _w9mz080nx = text("\n");
$root.append(_w9mz080nx);
