const fs = require("fs");
const path = "src/permissions/abac/engine.ts";
let content = fs.readFileSync(path, "utf8");

// Fix the "within" error
content = content.replace(
	/'Operator "within" requires object with start and end properties: { start: value, end: value }'/,
	'"Operator \\"within\\" requires object with start and end properties: { start: value, end: value }"'
);

// Fix the "between" error
content = content.replace(
	/'Operator "between" requires array \[min, max\] or object { start, end }'/,
	'"Operator \\"between\\" requires array [min, max] or object { start, end }"'
);

fs.writeFileSync(path, content);
console.log("Fixed quotes");
