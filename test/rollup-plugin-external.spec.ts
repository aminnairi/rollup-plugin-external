import {describe, it} from "mocha";
import {expect} from "chai";
import {external} from "../source/rollup-plugin-external";
import {resolve} from "path";
import {builtinModules} from "module";

describe("rollup-plugin-external", () => {
  it("should return the name of the plugin", () => {
    const result = external().name;
    const expectation = "external";

    expect(result).to.deep.equal(expectation);
  });

  it("should throw if the plugin is not called with an object", () => {
    //@ts-ignore
    const result = () => external([]);
    const expectation = "@aminnairi/rollup-plugin-external: options must be an object in external(options).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the exclude option is not an array", () => {
    //@ts-ignore
    const result = () => external({exclude: {}});
    const expectation = "@aminnairi/rollup-plugin-external: exclude must be an array in external({exclude}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the include option is not an array", () => {
    //@ts-ignore
    const result = () => external({include: {}});
    const expectation = "@aminnairi/rollup-plugin-external: include must be an array in external({include}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the packageJsonPath option is not a string", () => {
    //@ts-ignore
    const result = () => external({packageJsonPath: {}});
    const expectation = "@aminnairi/rollup-plugin-external: packageJsonPath must be a string in external({packageJsonPath}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the withBuiltinModules option is not a boolean", () => {
    //@ts-ignore
    const result = () => external({withBuiltinModules: {}});
    const expectation = "@aminnairi/rollup-plugin-external: withBuiltinModules must be a boolean in external({withBuiltinModules}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the withBundledDependencies option is not a boolean", () => {
    //@ts-ignore
    const result = () => external({withBundledDependencies: {}});
    const expectation = "@aminnairi/rollup-plugin-external: withBundledDependencies must be a boolean in external({withBundledDependencies}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the withDependencies option is not a boolean", () => {
    //@ts-ignore
    const result = () => external({withDependencies: {}});
    const expectation = "@aminnairi/rollup-plugin-external: withDependencies must be a boolean in external({withDependencies}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the withDevDependencies option is not a boolean", () => {
    //@ts-ignore
    const result = () => external({withDevDependencies: {}});
    const expectation = "@aminnairi/rollup-plugin-external: withDevDependencies must be a boolean in external({withDevDependencies}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the withOptionalDependencies option is not a boolean", () => {
    //@ts-ignore
    const result = () => external({withOptionalDependencies: {}});
    const expectation = "@aminnairi/rollup-plugin-external: withOptionalDependencies must be a boolean in external({withOptionalDependencies}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the withPeerDependencies option is not a boolean", () => {
    //@ts-ignore
    const result = () => external({withPeerDependencies: {}});
    const expectation = "@aminnairi/rollup-plugin-external: withPeerDependencies must be a boolean in external({withPeerDependencies}).";

    expect(result).to.throw(expectation);
  });

  it("should throw if the package json file is unreadable", async () => {
    try {
      const runtime = external({packageJsonPath: resolve(__dirname, "package.txt")});
      //@ts-ignore
      await runtime.options({});
    } catch ({message}) {
      const expectation = "@aminnairi/rollup-plugin-external: the package.json file is unreadable, no updates on external made.";
      expect(message).to.equal(expectation);
    }
  });

  it("should return the external configuration if the package json file is readable", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json")});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: [...builtinModules, "a", "b", "c"]});
  });

  it("should return the external configuration without the dependencies", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json"), withDependencies: false});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: [...builtinModules, "b", "c"]});
  });

  it("should return the external configuration without the peer dependencies", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json"), withPeerDependencies: false});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: [...builtinModules, "a", "c"]});
  });

  it("should return the external configuration without the bundled dependencies", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json"), withBundledDependencies: false});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: [...builtinModules, "a", "b"]});
  });

  it("should return the external configuration with the development dependencies", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json"), withDevDependencies: true});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: [...builtinModules, "a", "d", "b", "c"]});
  });

  it("should return the external configuration without the builtin modules", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json"), withBuiltinModules: false});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: ["a", "b", "c"]});
  });

  it("should return the external configuration without the excluded modules", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json"), exclude: ["a", "fs"]});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: [...builtinModules.filter(builtinModule => builtinModule !== "fs"), "b", "c"]});
  });

  it("should return the external configuration with the included modules", async () => {
    const runtime = external({packageJsonPath: resolve(__dirname, "rollup-plugin-external.json"), include: ["abcd", "efgh"]});
    //@ts-ignore
    const newRollupOptions = await runtime.options({});

    expect(newRollupOptions).to.deep.equal({external: [...builtinModules, "a", "b", "c", "abcd", "efgh"]});
  });
});
