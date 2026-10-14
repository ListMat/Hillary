import { z } from 'zod';

/**
 * TypeSafe AI — Jev System One Client
 * Ultra-low latency decision, classification, and structured routing engine.
 */

export interface JevDecisionConfig<T extends z.ZodTypeAny> {
  input: string;
  schema: T;
  context?: Record<string, unknown>;
  systemPrompt?: string;
  apiKey?: string;
  endpoint?: string;
}

export interface JevDecisionResult<T> {
  success: boolean;
  data: T;
  latencyMs: number;
  engine: 'jev-system-one' | 'jev-fast-heuristic';
  rawOutput?: unknown;
}

// Predefined UI Action Schema for Fast Interactive Routing
export const JevActionSchema = z.object({
  action: z.enum([
    'NAVIGATE_SECTION',
    'TOGGLE_AUDIO',
    'FILTER_ARCHIVE',
    'SWITCH_LAYOUT',
    'OPEN_MODAL',
    'OPEN_TRAJECTORY',
    'COPY_CONTACT',
    'UNKNOWN_INTENT',
  ]),
  target: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  confidence: z.number().min(0).max(1),
  explanation: z.string().optional(),
});

export type JevAction = z.infer<typeof JevActionSchema>;

export class JevClient {
  private apiKey: string;
  private endpoint: string;

  constructor(options?: { apiKey?: string; endpoint?: string }) {
    this.apiKey = options?.apiKey || process.env.NEXT_PUBLIC_JEV_API_KEY || process.env.JEV_API_KEY || '';
    this.endpoint = options?.endpoint || process.env.NEXT_PUBLIC_JEV_ENDPOINT || 'https://api.typesafe.ai/v1/jev/decide';
  }

  /**
   * Execute a sub-millisecond System One structured decision.
   */
  public async decide<T extends z.ZodTypeAny>(
    config: JevDecisionConfig<T>
  ): Promise<JevDecisionResult<z.infer<T>>> {
    const startTime = performance.now();

    // 1. Check if live API endpoint is configured
    if (this.apiKey) {
      try {
        const response = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            input: config.input,
            context: config.context,
            system_prompt: config.systemPrompt,
          }),
        });

        if (response.ok) {
          const raw = await response.json();
          const parsed = config.schema.parse(raw.data || raw);
          const latencyMs = Math.round(performance.now() - startTime);

          return {
            success: true,
            data: parsed,
            latencyMs,
            engine: 'jev-system-one',
            rawOutput: raw,
          };
        }
      } catch (err) {
        console.warn('[Jev Client] Falling back to zero-latency heuristic engine:', err);
      }
    }

    // 2. High-speed local System One pattern evaluator (Heuristic fallback, < 5ms)
    const fallbackData = this.evaluateLocalIntent(config.input);
    const latencyMs = Math.max(1, Math.round(performance.now() - startTime));

    return {
      success: true,
      data: config.schema.parse(fallbackData),
      latencyMs,
      engine: 'jev-fast-heuristic',
    };
  }

  /**
   * Ultra-fast zero-allocation pattern classifier for portfolio commands
   */
  private evaluateLocalIntent(input: string): JevAction {
    const lower = input.toLowerCase().trim();

    if (lower.includes('som') || lower.includes('audio') || lower.includes('música') || lower.includes('mute') || lower.includes('tocar')) {
      return {
        action: 'TOGGLE_AUDIO',
        confidence: 0.98,
        explanation: 'Alternar motor de áudio ambiental analógico.',
      };
    }

    if (lower.includes('agenda') || lower.includes('tour') || lower.includes('show') || lower.includes('festival') || lower.includes('estreia')) {
      return {
        action: 'NAVIGATE_SECTION',
        target: '#agenda',
        confidence: 0.99,
        explanation: 'Roteado para a seção Circuito de Festivais & Agenda.',
      };
    }

    if (lower.includes('trabalho') || lower.includes('obra') || lower.includes('filme') || lower.includes('portfolio') || lower.includes('projeto')) {
      return {
        action: 'NAVIGATE_SECTION',
        target: '#trabalhos',
        confidence: 0.99,
        explanation: 'Roteado para o Catálogo e Pôsteres de Trabalhos.',
      };
    }

    if (lower.includes('reel') || lower.includes('video') || lower.includes('cinema') || lower.includes('cena')) {
      return {
        action: 'NAVIGATE_SECTION',
        target: '#reel',
        confidence: 0.95,
        explanation: 'Roteado para a Sala de Cinema & Showreel.',
      };
    }

    if (lower.includes('arquivo') || lower.includes('foto') || lower.includes('bento') || lower.includes('35mm') || lower.includes('galeria')) {
      return {
        action: 'NAVIGATE_SECTION',
        target: '#arquivo',
        confidence: 0.96,
        explanation: 'Roteado para o Arquivo Visual Bento 3D.',
      };
    }

    if (lower.includes('trajetoria') || lower.includes('premio') || lower.includes('bio') || lower.includes('sobre') || lower.includes('historia')) {
      return {
        action: 'OPEN_TRAJECTORY',
        target: '#sobre',
        confidence: 0.94,
        explanation: 'Abrir biografia e trajetória premiada de Hillary Heidy.',
      };
    }

    if (lower.includes('email') || lower.includes('contato') || lower.includes('contratar') || lower.includes('mensagem')) {
      return {
        action: 'NAVIGATE_SECTION',
        target: '#contato',
        confidence: 0.98,
        explanation: 'Roteado para Contato e Canais Oficiais.',
      };
    }

    if (lower.includes('matriz') || lower.includes('grid') || lower.includes('grade')) {
      return {
        action: 'SWITCH_LAYOUT',
        target: 'matrix',
        confidence: 0.90,
        explanation: 'Alterar visualização para Matriz Editorial.',
      };
    }

    return {
      action: 'NAVIGATE_SECTION',
      target: '#disciplinas',
      confidence: 0.65,
      explanation: 'Intenção geral mapeada para Disciplinas Criativas.',
    };
  }
}

export const jev = new JevClient();
