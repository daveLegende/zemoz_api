const fs = require('fs');
const path = require('path');

function relImport(fromFile) {
  const fromDir = path.dirname(fromFile);
  const target = path.join('src', '_shared', 'domain', 'pagination.ts');
  let rel = path.relative(fromDir, target).replace(/\\/g, '/').replace(/\.ts$/, '');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

function addImport(content, fromFile) {
  const imp = `import { PaginatedResult, PaginationQuery } from '${relImport(fromFile)}';\n`;
  if (content.includes('_shared/domain/pagination')) return content;
  const m = content.match(/^(?:(?:import[\s\S]*?;\s*)+)/);
  if (m) {
    return m[0] + imp + content.slice(m[0].length);
  }
  return imp + content;
}

const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.ts') && p.includes(path.join('app', 'module'))) files.push(p);
  }
}
walk('src');

let changed = 0;
for (const file of files) {
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;
  c = c.replace(
    /abstract fetchAll\(tournoiId\?: string\): Promise<([^>]+)\[\]>;/g,
    'abstract fetchAll(query?: PaginationQuery, tournoiId?: string): Promise<PaginatedResult<$1>>;',
  );
  c = c.replace(
    /abstract fetchAll\(\): Promise<([^>]+)\[\]>;/g,
    'abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<$1>>;',
  );
  c = c.replace(
    /abstract all\(\): Promise<([^>]+)\[\]>;/g,
    'abstract all(query?: PaginationQuery): Promise<PaginatedResult<$1>>;',
  );
  if (c !== orig) {
    if (!c.includes('_shared/domain/pagination')) c = addImport(c, file);
    fs.writeFileSync(file, c);
    changed++;
    console.log('updated', file);
  }
}
console.log('total', changed);
