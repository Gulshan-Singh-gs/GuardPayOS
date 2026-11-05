import { describe, it, expect } from 'vitest';
import {
  UpiIntentPayloadSchema,
  DeepfakeAnalysisResultSchema,
  CoercionHeuristicVectorSchema,
  CircuitBreakerStateSchema,
} from '../src/index';

describe('packages/shared-types Zod Contract Registry', () => {
  describe('UpiIntentPayloadSchema', () => {
    it('should validate a valid UPI intent payload', () => {
      const validPayload = {
        pa: 'merchant@oksbi',
        pn: 'Aegis Security Store',
        am: '1499.00',
        cu: 'INR',
        mc: '5411',
        tr: 'TXN1234567890',
        tn: 'Security Appliance Payment',
      };

      const result = UpiIntentPayloadSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.pa).toBe('merchant@oksbi');
        expect(result.data.cu).toBe('INR');
      }
    });

    it('should reject invalid VPA format', () => {
      const invalidPayload = {
        pa: 'invalid-vpa-without-handle',
        pn: 'Suspect Entity',
      };
      const result = UpiIntentPayloadSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Invalid VPA format');
      }
    });

    it('should reject non-INR currency', () => {
      const invalidPayload = {
        pa: 'test@upi',
        pn: 'USD Merchant',
        cu: 'USD',
      };
      const result = UpiIntentPayloadSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });

    it('should reject invalid merchant code (mc must be 4 digits)', () => {
      const invalidPayload = {
        pa: 'test@upi',
        pn: 'Test Merchant',
        mc: '99', // must be 4 digits
      };
      const result = UpiIntentPayloadSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });

  describe('DeepfakeAnalysisResultSchema', () => {
    it('should validate a comprehensive forensic analysis result', () => {
      const payload = {
        analysisId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: Date.now(),
        modality: 'audio',
        deepfakeScore: 0.94,
        verdict: 'CONFIRMED_SYNTHETIC',
        spectralMetrics: {
          spectralFlatness: 0.88,
          spectralCentroidMean: 4200.5,
          zeroCrossingRate: 0.32,
          pitchJitter: 0.001,
        },
        artifacts: [
          {
            type: 'spectral_flux_discontinuity',
            severity: 'critical',
            description: 'Unnatural spectral frequency drop detected at 4.2s typical of voice cloning model',
            frameOrTimestampMs: 4200,
            confidence: 0.96,
          },
          {
            type: 'unnatural_pitch_periodicity',
            severity: 'high',
            description: 'Robotic fundamental frequency contour with no natural human micro-tremor',
            frameOrTimestampMs: 1500,
            confidence: 0.92,
          },
        ],
        modelLimitations: ['Quantized edge Wasm model', 'Acoustic reverb baseline'],
        explainableSummary: 'High probability of synthetic deepfake audio generated via neural voice cloning.',
      };

      const result = DeepfakeAnalysisResultSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it('should reject invalid score out of bounds', () => {
      const invalid = {
        analysisId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: Date.now(),
        modality: 'audio',
        deepfakeScore: 1.5, // > 1
        verdict: 'CONFIRMED_SYNTHETIC',
        artifacts: [],
        explainableSummary: 'Out of bounds test',
      };
      const result = DeepfakeAnalysisResultSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('CoercionHeuristicVectorSchema', () => {
    it('should validate a high-risk Digital Arrest coercion telemetry vector', () => {
      const payload = {
        sessionId: 'session-live-001',
        timestamp: Date.now(),
        urgencyIndex: 0.95,
        authorityImpersonationFlag: true,
        detectedAuthorities: ['CBI', 'Cyber Crime Cell Delhi', 'Supreme Court Warrant'],
        remoteAccessToolIndicator: true,
        detectedRemoteTools: ['AnyDesk'],
        digitalArrestPatternDetected: true,
        coerciveKeywordMatches: [
          {
            keyword: 'digital arrest',
            category: 'digital_arrest',
            confidence: 0.99,
          },
          {
            keyword: 'do not disconnect video call',
            category: 'isolation',
            confidence: 0.95,
          },
          {
            keyword: 'verify funds in sovereign account',
            category: 'financial_penalty',
            confidence: 0.92,
          },
        ],
        concurrentCallActive: true,
        screenShareActive: true,
        compositeCoercionScore: 0.97,
      };

      const result = CoercionHeuristicVectorSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.authorityImpersonationFlag).toBe(true);
        expect(result.data.digitalArrestPatternDetected).toBe(true);
      }
    });

    it('should reject invalid urgency index', () => {
      const payload = {
        sessionId: 'session-002',
        timestamp: Date.now(),
        urgencyIndex: -0.1, // invalid negative
        authorityImpersonationFlag: false,
        detectedAuthorities: [],
        remoteAccessToolIndicator: false,
        detectedRemoteTools: [],
        digitalArrestPatternDetected: false,
        coerciveKeywordMatches: [],
        compositeCoercionScore: 0.1,
      };
      const result = CoercionHeuristicVectorSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });

  describe('CircuitBreakerStateSchema', () => {
    it('should validate HARD_FREEZE_INTERCEPTED state', () => {
      const payload = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        status: 'HARD_FREEZE_INTERCEPTED',
        vpa: 'extortionist@fakebank',
        amount: 250000,
        evaluatedAt: Date.now(),
        riskScore: 98,
        reasons: [
          'High coercion score (0.97): Digital Arrest impersonation active',
          'Concurrent suspicious call and screen share active',
          'Payee VPA flagged with high anomaly threat rating',
        ],
        isOverridden: false,
      };

      const result = CircuitBreakerStateSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('HARD_FREEZE_INTERCEPTED');
        expect(result.data.riskScore).toBe(98);
      }
    });

    it('should reject unknown circuit breaker status', () => {
      const payload = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        status: 'UNKNOWN_STATUS',
        vpa: 'test@upi',
        evaluatedAt: Date.now(),
        riskScore: 10,
        reasons: [],
      };
      const result = CircuitBreakerStateSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });
});

