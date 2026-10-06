import { describe, expect, test } from "vite-plus/test";

import { toRegistryFlowItem, toRemoteRegistryDependency } from "./flow-data";
import {
  createRegistryFlowGraph,
  getDependencyDepths,
  getDependents,
  getFlowLayers,
  getFlowRole,
  getInstallOrder,
  getInstallPackages,
  getInstallStepId,
  getLocalDependencies,
  getTransitiveNeighbors,
  getVia,
} from "./flow-graph";

const sources = [
  { name: "button", dependencies: ["tailwind-variants"] },
  { name: "input" },
  { name: "input-group", registryDependencies: ["button", "input"] },
  { name: "command", dependencies: ["bits-ui"], registryDependencies: ["input-group", "cn"] },
  { name: "label" },
];
const localNames = new Set(sources.map((source) => source.name));
const graph = createRegistryFlowGraph(
  sources.map((source) =>
    toRegistryFlowItem(
      { type: "registry:ui", title: source.name, href: `/components/${source.name}`, ...source },
      localNames,
    ),
  ),
);

describe("toRegistryFlowItem", () => {
  test("splits registry dependencies into local and remote", () => {
    const command = graph.items.get("command");

    expect(command?.localDependencies).toEqual(["input-group"]);
    expect(command?.remoteDependencies).toEqual([
      { id: "remote:cn", name: "cn", source: "shadcn-svelte" },
    ]);
  });

  test("names remote dependencies by URL and namespace", () => {
    expect(toRemoteRegistryDependency("https://example.com/r/card.json")).toEqual({
      id: "remote:https://example.com/r/card.json",
      name: "card",
      source: "example.com",
    });
    expect(toRemoteRegistryDependency("@acme/card")).toMatchObject({
      name: "card",
      source: "@acme",
    });
  });
});

describe("registry flow graph", () => {
  test("sorts names and indexes dependents", () => {
    expect(graph.names).toEqual(["button", "command", "input", "input-group", "label"]);
    expect(getDependents(graph, "button")).toEqual(["input-group"]);
    expect(getLocalDependencies(graph, "input-group")).toEqual(["button", "input"]);
  });

  test("walks transitive neighbors in both directions", () => {
    expect(getTransitiveNeighbors(graph, "command", "up")).toEqual(
      new Set(["input-group", "button", "input"]),
    );
    expect(getTransitiveNeighbors(graph, "button", "down")).toEqual(
      new Set(["input-group", "command"]),
    );
  });

  test("reports the direct neighbor an indirect one is reached through", () => {
    expect(getVia(graph, "command", "input-group", "up")).toBeNull();
    expect(getVia(graph, "command", "button", "up")).toBe("input-group");
    expect(getVia(graph, "button", "command", "down")).toBe("input-group");
  });

  test("classifies roles", () => {
    expect(getFlowRole(graph, "button")).toBe("shared");
    expect(getFlowRole(graph, "command")).toBe("composite");
    expect(getFlowRole(graph, "label")).toBe("standalone");
  });

  test("measures depths and layers by longest path", () => {
    expect(Object.fromEntries(getDependencyDepths(graph))).toEqual({
      button: 0,
      input: 0,
      label: 0,
      "input-group": 1,
      command: 2,
    });
    expect(Object.fromEntries(getFlowLayers(graph, "command", "up"))).toEqual({
      command: 0,
      "input-group": 1,
      button: 2,
      input: 2,
    });
  });

  test("orders installs dependencies first and collects their packages", () => {
    const steps = getInstallOrder(graph, "command");

    expect(steps.map(getInstallStepId)).toEqual([
      "button",
      "input",
      "input-group",
      "remote:cn",
      "command",
    ]);
    expect(getInstallPackages(graph, steps)).toEqual(["bits-ui", "tailwind-variants"]);
    expect(getInstallOrder(graph, "missing")).toEqual([]);
  });

  test("survives dependency cycles", () => {
    const cyclic = createRegistryFlowGraph(
      ["a", "b"].map((name) =>
        toRegistryFlowItem(
          {
            name,
            type: "registry:ui",
            title: name,
            href: `/components/${name}`,
            registryDependencies: [name === "a" ? "b" : "a"],
          },
          new Set(["a", "b"]),
        ),
      ),
    );

    expect(getTransitiveNeighbors(cyclic, "a", "up")).toEqual(new Set(["b"]));
    expect(getInstallOrder(cyclic, "a").map(getInstallStepId)).toEqual(["b", "a"]);
    expect(getDependencyDepths(cyclic).size).toBe(2);
    expect(getFlowLayers(cyclic, "a", "up").get("b")).toBe(1);
  });
});
