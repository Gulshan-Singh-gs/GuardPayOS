CREATE TABLE "phishing_signatures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pattern" text NOT NULL,
	"pattern_type" text NOT NULL,
	"severity" text DEFAULT 'HIGH' NOT NULL,
	"scheme_description" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "phishing_signatures_pattern_unique" UNIQUE("pattern")
);
--> statement-breakpoint
CREATE TABLE "threat_telemetry_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"vector_type" text NOT NULL,
	"target_entity" text,
	"confidence_score" double precision NOT NULL,
	"action_taken" text NOT NULL,
	"evidence_data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"client_session_hash" text,
	"client_platform" text DEFAULT 'PWA_WEB' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vpa_reputation_registry" (
	"vpa_hash" text PRIMARY KEY NOT NULL,
	"vpa_display" text NOT NULL,
	"risk_score" integer DEFAULT 0 NOT NULL,
	"report_count" integer DEFAULT 0 NOT NULL,
	"anomaly_tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_verified_merchant" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'NEUTRAL' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
