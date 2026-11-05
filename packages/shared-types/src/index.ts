import { z } from 'zod';

/**
 * NPCI UPI Intent Spec & Fraud Analysis Schemas
 */

export const UpiIntentPayloadSchema = z.object({
  /** Payee VPA (Virtual Payment Address) e.g., merchant@bank */
  pa: z.string().regex(/^[\w.-]+@[\w.-]+$/, 'Invalid VPA format'),
  /** Payee Name */
  pn: z.string().min(1, 'Payee name is required'),
  /** Transaction Amount in INR (optional in intent, but mandatory if paying fixed sum) */
  am: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Amount must be valid decimal string (up to 2 decimals)').optional(),
  /** Currency code, standard INR */
  cu: z.literal('INR').default('INR'),
  /** Merchant Code (Category Code e.g. 0000 to 9999) */
  mc: z.string().regex(/^\d{4}$/, 'Merchant Code must be 4 digits').optional(),
  /** Transaction Reference ID */
  tr: z.string().optional(),
  /** Transaction Note / Purpose */
  tn: z.string().optional(),
  /** URL / Signature Payload for signed intent */
  url: z.string().url().optional(),
  /** Signing mode */
  mode: z.string().optional(),
  /** Payment Category or orgid */
  orgid: z.string().optional(),
  /** Sign checksum if present */
  sign: z.string().optional(),
});

export type UpiIntentPayload = z.infer<typeof UpiIntentPayloadSchema>;

/**
 * Deepfake & Synthetic Forensics Analysis Schema
 */

export const MediaModalitySchema = z.enum(['audio', 'video', 'image', 'multimodal']);

export const ForensicArtifactSchema = z.object({
  type: z.enum([
    'spectral_flux_discontinuity',
    'phase_inconsistency',
    'unnatural_pitch_periodicity',
    'mfcc_anomaly',
    'gan_checkerboard_artifact',
    'facial_warping',
    'synthetic_cadence',
    'voice_clone_watermark_missing',
  ]),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string(),
  frameOrTimestampMs: z.number().optional(),
  confidence: z.number().min(0).max(1),
});

export type ForensicArtifact = z.infer<typeof ForensicArtifactSchema>;

export const DeepfakeAnalysisResultSchema = z.object({
  analysisId: z.string().uuid(),
  timestamp: z.number().int().positive(),
  modality: MediaModalitySchema,
  /** Deepfake probability score: 0 (authentic) to 1 (synthetic deepfake) */
  deepfakeScore: z.number().min(0).max(1),
  verdict: z.enum(['AUTHENTIC', 'SUSPICIOUS', 'LIKELY_DEEPFAKE', 'CONFIRMED_SYNTHETIC']),
  spectralMetrics: z.object({
    spectralFlatness: z.number().optional(),
    spectralCentroidMean: z.number().optional(),
    zeroCrossingRate: z.number().optional(),
    pitchJitter: z.number().optional(),
  }).optional(),
  visualMetrics: z.object({
    blurryBoundaryScore: z.number().optional(),
    eyeBlinkRateNormalized: z.number().optional(),
    facialTextureInconsistency: z.number().optional(),
  }).optional(),
  artifacts: z.array(ForensicArtifactSchema),
  modelLimitations: z.array(z.string()).default([
    'Quantized on-device model baseline',
    'Subject to background acoustic distortion',
  ]),
  explainableSummary: z.string(),
});

export type DeepfakeAnalysisResult = z.infer<typeof DeepfakeAnalysisResultSchema>;

/**
 * Coercion & Social-Engineering Heuristics Vector Schema
 */

export const CoercionHeuristicVectorSchema = z.object({
  sessionId: z.string(),
  timestamp: z.number().int().positive(),
  /** Urgency index: 0 (relaxed) to 1 (extreme panic/deadline coercion) */
  urgencyIndex: z.number().min(0).max(1),
  /** Authority impersonation detected: Police, CBI, ED, RBI, Customs, Court */
  authorityImpersonationFlag: z.boolean(),
  detectedAuthorities: z.array(z.string()),
  /** Remote Access Tool indicators (AnyDesk, TeamViewer, RustDesk, QuickSupport) */
  remoteAccessToolIndicator: z.boolean(),
  detectedRemoteTools: z.array(z.string()),
  /** Threat coercion keywords matching Digital Arrest / Extortion patterns */
  digitalArrestPatternDetected: z.boolean(),
  coerciveKeywordMatches: z.array(
    z.object({
      keyword: z.string(),
      category: z.enum(['digital_arrest', 'urgency', 'financial_penalty', 'isolation', 'remote_tool']),
      confidence: z.number().min(0).max(1),
    })
  ),
  /** Active concurrent call state detected on device */
  concurrentCallActive: z.boolean().default(false),
  /** Screen sharing / Screen projection active */
  screenShareActive: z.boolean().default(false),
  /** Aggregate social engineering risk score: 0 to 1 */
  compositeCoercionScore: z.number().min(0).max(1),
});

export type CoercionHeuristicVector = z.infer<typeof CoercionHeuristicVectorSchema>;

/**
 * Pre-Authorization Circuit Breaker State Schema
 */

export const CircuitBreakerStatusSchema = z.enum([
  'IDLE',
  'EVALUATING',
  'CLEARED',
  'WARN_COOLING_PERIOD',
  'HARD_FREEZE_INTERCEPTED',
]);

export type CircuitBreakerStatus = z.infer<typeof CircuitBreakerStatusSchema>;

export const CircuitBreakerStateSchema = z.object({
  id: z.string().uuid(),
  status: CircuitBreakerStatusSchema,
  vpa: z.string(),
  amount: z.number().nonnegative().optional(),
  evaluatedAt: z.number().int().positive(),
  riskScore: z.number().min(0).max(100),
  reasons: z.array(z.string()),
  coercionVector: CoercionHeuristicVectorSchema.optional(),
  deepfakeResult: DeepfakeAnalysisResultSchema.optional(),
  /** Cooling period timer in seconds if status is WARN_COOLING_PERIOD */
  coolingPeriodRemainingSeconds: z.number().int().nonnegative().optional(),
  /** User or system override flag */
  isOverridden: z.boolean().default(false),
  overrideReason: z.string().optional(),
});

export type CircuitBreakerState = z.infer<typeof CircuitBreakerStateSchema>;

