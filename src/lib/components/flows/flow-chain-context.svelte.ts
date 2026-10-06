import { getContext, setContext } from "svelte";

const FLOW_CHAIN_CONTEXT = Symbol("flow-chain");

// Hover state lives outside node data so hovering keeps the nodes array
// stable. New node objects make Svelte Flow re-measure and repaint every node.
export class FlowChainState {
  hot = $state<string | null>(null);
  toggleProp: (id: string) => void;

  constructor(toggleProp: (id: string) => void) {
    this.toggleProp = toggleProp;
  }
}

export function setFlowChainContext(state: FlowChainState): FlowChainState {
  return setContext(FLOW_CHAIN_CONTEXT, state);
}

export function getFlowChainContext(): FlowChainState | undefined {
  return getContext<FlowChainState | undefined>(FLOW_CHAIN_CONTEXT);
}
