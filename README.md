# @aminnairi/rollup-plugin-external

![Lint](https://github.com/aminnairi/rollup-plugin-external/workflows/Lint/badge.svg) ![Test](https://github.com/aminnairi/rollup-plugin-external/workflows/Test/badge.svg) ![Package](https://github.com/aminnairi/rollup-plugin-external/workflows/Package/badge.svg)

Rollup plugin for automatically computing your external dependencies.

## Summary

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [ECMAScript](#ecmascript)
  - [TypeScript](#typescript)
- [Options](#options)
  - [exclude](#exclude)
  - [include](#include)
  - [packageJsonPath](#packagejsonpath)
  - [withBuiltinModules](#withbuiltinmodules)
  - [withBundledDependencies](#withbundleddependencies)
  - [withDependencies](#withdependencies)
  - [withOptionalDependencies](#withoptionaldependencies)
  - [withPeerDependencies](#withpeerdependencies)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

## Installation

```console
$ npm install --save-dev @aminnairi/rollup-plugin-external
```

## Usage

### ECMAScript

```typescript
import {external} from "@aminnairi/rollup-plugin-external";

export default {
  plugins: [
    external()
  ]
};
```

### TypeScript

```typescript
import {external, ExternalOptions} from "@aminnairi/rollup-plugin-external";

const externalOptions: ExternalOptions = {
  withBuiltinModules: false
};

export default {
  plugins: [
    external(externalOptions)
  ]
}
```

## Options

### exclude

Modules to exclude from the Rollup's `external` configuration (default to `[]`).

```typescript
external({
  exclude: ["package", "to", "exclude"]
});
```

### include

Modules to include in the Rollup's `external` configuration (default to `[]`).

```typescript
external({
  include: ["package", "to", "include"]
});
```

### packageJsonPath

Path to the module configuration (default to `package.json`).

```typescript
external({
  packageJsonPath: "./settings/package.production.json"
});
```

### withBuiltinModules

Whether to include or not Node.js builtin modules in the Rollup's `external` configuration (default to `true`).

```typescript
external({
  withBuiltinModules: false
});
```

### withBundledDependencies

Whether to include or not `bundledDependencies` in the Rollup's `external` configuration (default to `true`).

```typescript
external({
  withBundledDependencies: false
});
```

### withDependencies

Whether to include or not `dependencies` in the Rollup's `external` configuration (default to `true`).

```typescript
external({
  withDependencies: false
});
```

### withOptionalDependencies

Whether to include or not `optionalDependencies` in the Rollup's `external` configuration (default to `true`).

```typescript
external({
  withOptionalDependencies: false
});
```

### withPeerDependencies

Whether to include or not `peerDependencies` in the Rollup's `external` configuration (default to `true`).

```typescript
external({
  withPeerDependencies: false
});
```

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md)

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## License

See [`LICENSE`](./LICENSE)
