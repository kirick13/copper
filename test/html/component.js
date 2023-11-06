
	import { ref, reactive } from '/test/html/copper.js';

	const state = window.state = reactive({ count: 0 });
	const count = window.count = ref(0);
	const greeting = window.greeting = ref('Hello World!');

	const new_todo_title = ref('');
	const todo = window.todo = reactive([]);
	function addTodo() {
		todo.push({
			id: Date.now(),
			title: new_todo_title.value,
		});
		new_todo_title.value = '';
	}
;
import { el, text, fragment, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, reactiveIf, reactiveFor, listen } from "/test/html/copper.js";
const $root = document.querySelector("#app");
const _xrwu0tcl9 = el("h4");
const _48n6ig6sh = text("Todo:");
_xrwu0tcl9.append(_48n6ig6sh);
const _er8yg36s1 = text("\n");
const _8msx63ckx = el("div");
const _r2x2s6oxa = text("\n\t");
const _pr70kcxme = el("input");
attr(_pr70kcxme, "type", "text")
reactiveInputValue(_pr70kcxme, () => new_todo_title)
const _9i2wo47el = text("\n\t");
const _b303kur73 = el("input");
attr(_b303kur73, "type", "button")
attr(_b303kur73, "value", "Add")
listen(_b303kur73, "click", $event => addTodo(), [])
const _c2oj1zpnb = text("\n");
_8msx63ckx.append(_r2x2s6oxa, _pr70kcxme, _9i2wo47el, _b303kur73, _c2oj1zpnb);
const _94x4nwgef = text("\n");
const _ep2s8b562 = text("\n");
const _spsb4xtqp = reactiveIf(() => todo.length > 0 ? 0 : 1, [() => {
  const _v1vv7a6hv = text("\n\t");
  const _mv123eedm = reactiveFor(() => todo, (task, index) => task.id, (task, index) => {
    const _52vjzie6b = text("\n\t\t");
    const _xrgiyoyji = el("div");
    const _5n82geaje = text("\n\t\t\tTask #");
    const _6dnmvxv87 = text();
    reactiveTextNode(_6dnmvxv87, () => index.value + 1)
    const _patuq70ln = text(": ");
    const _hsx586cs6 = text();
    reactiveTextNode(_hsx586cs6, () => task.value.title)
    const _dbsunkl8b = text("\n\t\t\t");
    const _sigplfbkp = el("input");
    attr(_sigplfbkp, "type", "button")
    attr(_sigplfbkp, "value", "Remove")
    listen(_sigplfbkp, "click", $event => todo.splice(index.value, 1), [])
    const _jbqq7jh2a = text("\n\t\t");
    _xrgiyoyji.append(_5n82geaje, _6dnmvxv87, _patuq70ln, _hsx586cs6, _dbsunkl8b, _sigplfbkp, _jbqq7jh2a);
    const _07qlypohi = text("\n\t");
    return [_52vjzie6b, _xrgiyoyji, _07qlypohi];
  });
  const _7wi5em66n = text("\n");
  return [_v1vv7a6hv, _mv123eedm, _7wi5em66n];
}, () => {
  const _y4b7l183w = text("\n\t");
  const _6pac1d87p = el("i");
  const _6te2vpbw7 = text("No tasks to do.");
  _6pac1d87p.append(_6te2vpbw7);
  const _vmdx0ekty = text("\n");
  return [_y4b7l183w, _6pac1d87p, _vmdx0ekty];
}]);
const _43sfo16z6 = text("\n");
$root.append(_xrwu0tcl9, _er8yg36s1, _8msx63ckx, _94x4nwgef, _ep2s8b562, _spsb4xtqp, _43sfo16z6);
