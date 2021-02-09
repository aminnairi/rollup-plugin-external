import {InputOptions, Plugin} from "rollup";
import {promises as fs} from "fs";
import {builtinModules} from "module";

const {readFile} = fs;

export interface ExternalOptions {
  exclude?: string[];
  include?: string[];
  packageJsonPath?: string;
  withBuiltinModules?: boolean;
  withBundledDependencies?: boolean;
  withDependencies?: boolean;
  withDevDependencies?: boolean;
  withOptionalDependencies?: boolean;
  withPeerDependencies?: boolean;
}

function prefixedError(message: string): string {
  return `@aminnairi/rollup-plugin-external: ${message}.`;
}

export function external(options?: ExternalOptions): Plugin {
  if (options !== undefined && typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError(prefixedError("options must be an object in external(options)"));
  }

  const exclude = options?.exclude ?? [];
  const include = options?.include ?? [];
  const packageJsonPath = options?.packageJsonPath ?? "package.json";
  const withBuiltinModules = options?.withBuiltinModules ?? true;
  const withBundledDependencies = options?.withBundledDependencies ?? true;
  const withDependencies = options?.withDependencies ?? true;
  const withDevDependencies = options?.withDevDependencies ?? false;
  const withOptionalDependencies = options?.withOptionalDependencies ?? true;
  const withPeerDependencies = options?.withPeerDependencies ?? true;

  if (!Array.isArray(exclude)) {
    throw new TypeError(prefixedError("exclude must be an array in external({exclude})"));
  }

  if (!Array.isArray(include)) {
    throw new TypeError(prefixedError("include must be an array in external({include})"));
  }

  if (typeof packageJsonPath !== "string") {
    throw new TypeError(prefixedError("packageJsonPath must be a string in external({packageJsonPath})"));
  }

  if (typeof withBuiltinModules !== "boolean") {
    throw new TypeError(prefixedError("withBuiltinModules must be a boolean in external({withBuiltinModules})"));
  }

  if (typeof withBundledDependencies !== "boolean") {
    throw new TypeError(prefixedError("withBundledDependencies must be a boolean in external({withBundledDependencies})"));
  }

  if (typeof withDependencies !== "boolean") {
    throw new TypeError(prefixedError("withDependencies must be a boolean in external({withDependencies})"));
  }

  if (typeof withDevDependencies !== "boolean") {
    throw new TypeError(prefixedError("withDevDependencies must be a boolean in external({withDevDependencies})"));
  }

  if (typeof withOptionalDependencies !== "boolean") {
    throw new TypeError(prefixedError("withOptionalDependencies must be a boolean in external({withOptionalDependencies})"));
  }

  if (typeof withPeerDependencies !== "boolean") {
    throw new TypeError(prefixedError("withPeerDependencies must be a boolean in external({withPeerDependencies})"));
  }

  return {
    name: "external",
    options: async (inputOptions: InputOptions) => {
      try {
        const packageJsonBuffer = await readFile(packageJsonPath);
        const packageJsonContent = packageJsonBuffer.toString();
        const packageJson = JSON.parse(packageJsonContent);
        const dependencies = Object.keys(withDependencies && packageJson.dependencies || {});
        const peerDependencies = Object.keys(withPeerDependencies && packageJson.peerDependencies || {});
        const bundledDependencies = Object.keys(withBundledDependencies && packageJson.bundledDependencies || {});
        const devDependencies = Object.keys(withDevDependencies && packageJson.devDependencies || {});
        const builtins = withBuiltinModules ? builtinModules : [];
        const external = [...builtins, ...dependencies, ...devDependencies, ...peerDependencies, ...bundledDependencies, ...include].filter(library => !exclude.includes(library));

        return {...inputOptions, external};
      } catch {
        throw new Error(prefixedError("the package.json file is unreadable, no updates on external made"));
        return null;
      }
    }
  };
}
