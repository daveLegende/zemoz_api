const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve('d:/API/zemoz_gravity');
const srcRoot = path.join(projectRoot, 'src');
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');

let paths = {};
try {
    // Simple JSON parse might fail on comments, so we clean them up roughly
    const tsconfigStr = fs.readFileSync(tsconfigPath, 'utf8').replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const tsconfig = JSON.parse(tsconfigStr);
    paths = tsconfig.compilerOptions.paths || {};
} catch (e) {
    console.log("Could not parse tsconfig paths properly, relying on fallback.", e);
}

function resolveAlias(importPath) {
    // Try to match paths in tsconfig
    for (const key of Object.keys(paths)) {
        if (key.endsWith('/*')) {
            const prefix = key.slice(0, -2); // e.g. "user"
            if (importPath.startsWith(prefix + '/')) {
                const targetPrefix = paths[key][0].replace('/*', ''); // e.g. "./src/user"
                return path.join(projectRoot, targetPrefix, importPath.substring(prefix.length + 1));
            }
        } else if (key === importPath) {
            return path.join(projectRoot, paths[key][0]);
        }
    }

    // If it starts with src/
    if (importPath.startsWith('src/')) {
        return path.join(projectRoot, importPath);
    }

    // Implicit match for top-level directories in src/
    if (!importPath.startsWith('@') && !importPath.includes('node_modules')) {
        const potentialPath = path.join(srcRoot, importPath);
        if (fs.existsSync(potentialPath) || fs.existsSync(potentialPath + '.ts') || fs.existsSync(path.join(potentialPath, 'index.ts'))) {
            return potentialPath;
        }
    }

    return null;
}

function resolveInternalTarget(importPath) {
    const resolved = resolveAlias(importPath);
    if (!resolved) return null;

    if (fs.existsSync(resolved)) {
        const stat = fs.statSync(resolved);
        if (stat.isFile() && resolved.endsWith('.ts')) return resolved;
        if (stat.isDirectory() && fs.existsSync(path.join(resolved, 'index.ts'))) return path.join(resolved, 'index.ts');
    }
    if (fs.existsSync(resolved + '.ts')) return resolved + '.ts';
    if (fs.existsSync(path.join(resolved, 'index.ts'))) return path.join(resolved, 'index.ts');
    if (fs.existsSync(resolved + '.d.ts')) return resolved + '.d.ts';

    return null;
}

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        // Ignore node_modules, dist, etc. just in case
        if (file === 'node_modules' || file === 'dist') continue;

        const absPath = path.join(dir, file);
        const stat = fs.statSync(absPath);
        if (stat.isDirectory()) {
            getFiles(absPath, fileList);
        } else if (file.endsWith('.ts')) {
            fileList.push(absPath);
        }
    }
    return fileList;
}

const allFiles = getFiles(srcRoot);
let modifiedFilesCount = 0;
let totalImportsCorrected = 0;
const modifiedFilesList = [];

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // This regex matches: (import|export) ... from "..." or import("...")
    // Group 1: prefix (from " or import ")
    // Group 2: Quote char
    // Group 3: path
    const regex = /(from\s+|import\s*\(?\s*)(['"])([^'"]+)\2/g;

    let match;
    let fileMatches = [];
    while ((match = regex.exec(content)) !== null) {
        if (!match[3]) continue; // sanity check

        // If the match doesn't look like an import path (e.g. it's inside a string that happened to match), we skip but regex requires it's prefixed by `from` or `import`
        fileMatches.push({
            fullMatch: match[0],
            prefix: match[1],
            quote: match[2],
            importPath: match[3],
            index: match.index
        });
    }

    let fileImportsCorrected = 0;
    for (let i = fileMatches.length - 1; i >= 0; i--) {
        const m = fileMatches[i];
        const importPath = m.importPath;

        // Ignore relative imports
        if (importPath.startsWith('./') || importPath.startsWith('../')) continue;

        const targetAbs = resolveInternalTarget(importPath);
        if (targetAbs) {
            const currentDir = path.dirname(file);
            let relative = path.relative(currentDir, targetAbs);

            relative = relative.replace(/\\/g, '/'); // Windows path to URL path
            if (relative.endsWith('.ts')) relative = relative.slice(0, -3);
            if (relative.endsWith('.d')) relative = relative.slice(0, -2); // remove .d if it was .d.ts
            if (relative.endsWith('/index')) relative = relative.slice(0, -6);
            if (!relative.startsWith('.') && !relative.startsWith('/')) {
                relative = './' + relative;
            }
            if (relative === '') relative = './';

            if (relative !== importPath) {
                const newString = m.prefix + m.quote + relative + m.quote;
                content = content.slice(0, m.index) + newString + content.slice(m.index + m.fullMatch.length);
                fileImportsCorrected++;
            }
        }
    }

    if (fileImportsCorrected > 0) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedFilesCount++;
        totalImportsCorrected += fileImportsCorrected;
        modifiedFilesList.push(file);
    }
}

console.log("=== LISTE DES FICHIERS MODIFIES ===");
modifiedFilesList.forEach(f => console.log("- " + f));
console.log("===================================");
console.log("Nombre total de fichiers modifies : " + modifiedFilesCount);
console.log("Nombre total d'imports corriges : " + totalImportsCorrected);
