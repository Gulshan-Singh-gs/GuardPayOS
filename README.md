<div align="center">

# 🛡️ GuardPayOS

### Privacy-first fraud protection for digital payments

**An early-stage TypeScript monorepo exploring safer UPI payments, phishing checks, social-engineering awareness, and explainable security decisions.**

[![TypeScript](https://img.shields.io/badge/TypeScript-94.6%25-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm workspaces](https://img.shields.io/badge/monorepo-pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/workspaces)
[![GitHub repository](https://img.shields.io/badge/GitHub-GuardPayOS-181717?logo=github&logoColor=white)](https://github.com/Gulshan-Singh-gs/GuardPayOS)

[Explore the code](https://github.com/Gulshan-Singh-gs/GuardPayOS) · [Report a bug](https://github.com/Gulshan-Singh-gs/GuardPayOS/issues)

</div>

---

## About

GuardPayOS is an early-stage project for building a user-controlled, privacy-conscious security layer around digital payment experiences. The intended direction is to help people inspect suspicious payment links and messages, understand potential warning signs, and make informed decisions.

The repository is currently a **starter monorepo**: it contains a small React/Vite landing screen and initial workspace packages for a web app, an edge API, shared types, a core engine, and database tooling. Most product capabilities described in the project plan are **not implemented yet**. This README distinguishes the current code from the project direction so that no protection or detection capability is overstated.

> **Current status:** The web app displays an introductory screen. It does not currently inspect or block payments, classify threats, analyze media, or provide a production security service.

## Project principles

The project aims to develop toward:

- **User control:** inspect information and decide whether to continue; no claim of controlling another payment app's authorization flow.
- **Privacy by design:** prefer local processing and collect only what a feature genuinely needs.
- **Explainability:** provide evidence and limitations alongside future security assessments.
- **Honest capabilities:** distinguish implemented functionality from planned work; unknown or inconclusive results should not be presented as certainty.
- **Accessible security:** build for a responsive web experience, with platform-specific functionality introduced only where supported.

## Repository structure

```text
.
├── apps/
│   ├── web/          # React + Vite web application
│   └── edge-api/     # Hono API scaffold for Cloudflare Workers
├── packages/
│   ├── core-engine/  # Shared security-engine package scaffold
│   ├── db/           # Database and Drizzle tooling
│   └── shared-types/ # Shared TypeScript types
├── 1.md              # Product and engineering direction
├── package.json      # Root scripts and workspace tooling
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Tech stack

| Area | Technologies in the repository |
| --- | --- |
| Language | TypeScript, JavaScript |
| Web | React 19, Vite, Tailwind CSS |
| API | Hono, Cloudflare Workers / Wrangler |
| Data and shared storage tooling | Supabase client, Drizzle, PostgreSQL tooling |
| Workspace | pnpm workspaces |
| Testing/type tooling | Vitest, TypeScript |

Dependencies indicate intended integration points; they do not imply that corresponding product features or services are already configured or operational.

## Getting started

### Prerequisites

- Node.js compatible with the repository's pnpm version
- [pnpm 12.8.1](https://pnpm.io/installation)

### Install and run the web app

```bash
git clone https://github.com/Gulshan-Singh-gs/GuardPayOS.git
cd GuardPayOS
pnpm install
pnpm --filter @aegis-upi/web dev
```

Vite will print the local URL when the development server starts.

### Run the available root scripts

```bash
pnpm build       # Build workspace packages that define a build script
pnpm typecheck   # Type-check workspace packages that define a typecheck script
pnpm test        # Run workspace packages that define a test script
```

For the web app only:

```bash
pnpm --filter @aegis-upi/web build
pnpm --filter @aegis-upi/web typecheck
```

The API package also defines local development and deployment scripts:

```bash
pnpm --filter @aegis-upi/edge-api dev
pnpm --filter @aegis-upi/edge-api deploy
```

Deployment requires a configured Cloudflare account and Wrangler credentials. No secrets should be committed to Git.

## Roadmap direction

The product plan describes potential future work such as:

- Parsing and validating user-provided UPI payment links.
- A deterministic, explainable risk-assessment engine.
- Local threat-intelligence lookups and freshness reporting.
- Phishing and social-engineering checks.
- A user-controlled payment handoff flow.
- A privacy-conscious API and community-report review process.

These are **planned directions, not claims about current repository functionality**. See [`1.md`](./1.md) for the detailed engineering directive. Implementation status should be verified in the code and tests as features are added.

## Safety and privacy

GuardPayOS is not a bank, payment processor, antivirus product, or substitute for official financial guidance. Never share a UPI PIN, OTP, password, or banking credential with this project. Do not rely on this early-stage software to authorize or secure a real transaction.

Any future risk assessment can be incomplete or incorrect. A warning should support—not replace—careful verification through trusted channels. The project must not claim universal UPI interception, access to another app's PIN screen, arbitrary call-audio capture, or guaranteed deepfake detection.

## Contributing

Contributions and thoughtful feedback are welcome. Before opening a pull request:

1. Check existing [issues](https://github.com/Gulshan-Singh-gs/GuardPayOS/issues) to avoid duplicates.
2. Keep changes scoped and document relevant limitations or security implications.
3. Run the applicable build, type-check, and test commands.
4. Never commit secrets, real payment credentials, or personal media.

For security-sensitive reports, avoid posting exploitable details publicly; use GitHub's private vulnerability reporting if enabled for this repository.

## License

No license has been added to the repository yet. Until a license is published, the project should not be assumed to grant permissions for reuse, modification, or distribution.

---

<div align="center">

Built in the open with 💙 and a security-first mindset.

</div>
