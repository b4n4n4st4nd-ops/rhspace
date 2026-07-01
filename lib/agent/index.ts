export interface AgentLog {
  step: string;
  detail: string;
  timestamp: string;
}

export interface AgentResponse {
  reply: string;
  logs: AgentLog[];
}

function timestamp(): string {
  return new Date().toISOString().slice(11, 19);
}

export function runMockAgent(message: string): AgentResponse {
  const lower = message.toLowerCase();
  const logs: AgentLog[] = [
    {
      step: "parse_intent",
      detail: `Classified user message (${message.length} chars) as inventory query.`,
      timestamp: timestamp(),
    },
  ];

  if (lower.includes("sku") || lower.includes("stock")) {
    logs.push({
      step: "tool:inventory_lookup",
      detail:
        "Queried mock inventory table — DC-West: 1,240 units, DC-East: 380 units.",
      timestamp: timestamp(),
    });
    logs.push({
      step: "tool:routing_simulation",
      detail:
        "Simulated transfer DC-West → DC-East: 3-day lead, $0.42/unit freight.",
      timestamp: timestamp(),
    });
    logs.push({
      step: "compose_response",
      detail: "Synthesized recommendation with confidence 0.87.",
      timestamp: timestamp(),
    });
    return {
      reply:
        "SKU demand is uneven across regions. I recommend transferring ~400 units from DC-West to DC-East to cover projected shortfall without triggering emergency freight. Estimated savings vs. expedited replenishment: ~18%.",
      logs,
    };
  }

  if (lower.includes("route") || lower.includes("fulfill")) {
    logs.push({
      step: "tool:routing_simulation",
      detail: "Evaluated 3 fulfillment paths against SLA and cost constraints.",
      timestamp: timestamp(),
    });
    logs.push({
      step: "compose_response",
      detail: "Selected lowest-cost path within 48h SLA window.",
      timestamp: timestamp(),
    });
    return {
      reply:
        "Optimal fulfillment path: ship from DC-West with standard ground service. Meets 48-hour SLA at lowest cost tier. Alternative: DC-East expedited if customer priority flag is set.",
      logs,
    };
  }

  logs.push({
    step: "compose_response",
    detail: "No tool match — returned capability overview.",
    timestamp: timestamp(),
  });

  return {
    reply:
      "I can help with inventory levels by SKU, rebalancing between distribution centers, and routing recommendations. Try asking about a specific SKU or fulfillment scenario.",
    logs,
  };
}

export async function runOpenAIAgent(message: string): Promise<AgentResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return runMockAgent(message);
  }

  const logs: AgentLog[] = [
    {
      step: "openai_request",
      detail: "Sending completion request to gpt-4o-mini.",
      timestamp: timestamp(),
    },
  ];

  const systemPrompt = `You are a clean-room retail inventory routing assistant for demo purposes only. 
Never reference real companies or proprietary systems. 
Keep responses concise and practical. 
This is a portfolio demo on ryanhambleton.space.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    logs.push({
      step: "error",
      detail: `OpenAI API error: ${res.status}`,
      timestamp: timestamp(),
    });
    return {
      reply: "The agent encountered an error. Mock mode is available via AGENT_DEMO_MODE=mock.",
      logs,
    };
  }

  const data = await res.json();
  const reply =
    data.choices?.[0]?.message?.content ??
    "No response generated.";

  logs.push({
    step: "openai_response",
    detail: `Received completion (${reply.length} chars).`,
    timestamp: timestamp(),
  });

  return { reply, logs };
}
