import { pgTable, text, integer, timestamp, uuid, jsonb, boolean, doublePrecision } from 'drizzle-orm/pg-core';

/**
 * Table 1: vpa_reputation_registry
 * High-speed VPA threat registry caching reputational risk scores,
 * report counts, and anomaly classifications.
 */
export const vpaReputationRegistry = pgTable('vpa_reputation_registry', {
  /** Deterministic SHA-256 hash of normalized lowercased VPA (primary key) */
  vpaHash: text('vpa_hash').primaryKey(),
  /** Masked or raw VPA handle for audit (e.g. s***@fakebank) */
  vpaDisplay: text('vpa_display').notNull(),
  /** Risk score calculated from 0 (verified safe) to 100 (confirmed fraud/scam) */
  riskScore: integer('risk_score').notNull().default(0),
  /** Cumulative count of unique user/system reports */
  reportCount: integer('report_count').notNull().default(0),
  /** JSON array of anomaly tags: e.g. ['DIGITAL_ARREST', 'FASTAG_SCAM', 'MULE_ACCOUNT'] */
  anomalyTags: jsonb('anomaly_tags').$type<string[]>().notNull().default([]),
  /** Verified KYC / Merchant status */
  isVerifiedMerchant: boolean('is_verified_merchant').notNull().default(false),
  /** Threat category status */
  status: text('status', { enum: ['ACTIVE_FRAUD', 'SUSPICIOUS', 'CLEARED', 'NEUTRAL'] }).notNull().default('NEUTRAL'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Table 2: threat_telemetry_logs
 * Immutable audit logs storing client-side heuristic events,
 * deepfake audio/video forensic metadata, and circuit breaker intercepts.
 */
export const threatTelemetryLogs = pgTable('threat_telemetry_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
  /** Threat vector type */
  vectorType: text('vector_type', {
    enum: ['UPI_INTENT_INTERCEPT', 'COERCION_DIGITAL_ARREST', 'DEEPFAKE_AUDIO', 'DEEPFAKE_VIDEO', 'PHISHING_LINK'],
  }).notNull(),
  /** Intercepted VPA or target entity (if applicable) */
  targetEntity: text('target_entity'),
  /** Machine-calculated confidence score (0.0 to 1.0) */
  confidenceScore: doublePrecision('confidence_score').notNull(),
  /** Action executed by the local/edge firewall */
  actionTaken: text('action_taken', {
    enum: ['BLOCKED_HARD_FREEZE', 'COOLED_OFF_USER_ALERT', 'FLAGGED_MONITOR', 'CLEARED'],
  }).notNull(),
  /** Detailed explainable evidence graph (matched keywords, spectral metrics, etc.) */
  evidenceData: jsonb('evidence_data').$type<Record<string, unknown>>().notNull().default({}),
  /** Anonymized client session hash */
  clientSessionHash: text('client_session_hash'),
  /** Client environment: PWA or Native APK */
  clientPlatform: text('client_platform', { enum: ['PWA_WEB', 'NATIVE_ANDROID', 'EDGE_API'] }).notNull().default('PWA_WEB'),
});

/**
 * Table 3: phishing_signatures
 * Regular expressions, domain patterns, and deep-link heuristics
 * synchronized to connected PWA/APK clients in real-time.
 */
export const phishingSignatures = pgTable('phishing_signatures', {
  id: uuid('id').primaryKey().defaultRandom(),
  /** Domain or URL pattern (e.g. sbi-kyc-update\\.top) */
  pattern: text('pattern').notNull().unique(),
  /** Type of signature */
  patternType: text('pattern_type', {
    enum: ['DOMAIN_REGEX', 'VPA_HOMOGRAPH', 'SMS_PHISHING_TEMPLATE', 'APK_PACKAGE_NAME'],
  }).notNull(),
  /** Severity level */
  severity: text('severity', { enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] }).notNull().default('HIGH'),
  /** Associated scam scheme description */
  schemeDescription: text('scheme_description').notNull(),
  /** Active status for client-side sync */
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

