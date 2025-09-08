# Application Development Framework

This framework defines a consistent way to structure, build, document, test, release, and operate applications across languages and stacks. Use it as a baseline and tailor per project.

## Foundations
- Purpose: predictable structure, faster onboarding, fewer decisions per app.
- Scope: applies to frontend, backend, and CLI apps; adapt specifics by language.
- Principles: clarity over cleverness, explicit configuration, minimal dependencies, automation via CI, reproducible builds.

## Repository Layout
- `src/`: source code (language‑specific subfolders, e.g., `app/`, `components/`, `modules/`, `domain/`, `infra/`).
- `tests/`: unit/integration tests mirroring `src/` structure.
- `public/` or `static/`: static assets (if applicable).
- `docs/`: product and API docs (rendered HTML or Markdown index + online link).
- `scripts/`: developer tooling (non-production helpers).
- `config/`: environment‑agnostic configuration templates (YAML/JSON/TOML).
- `build/` (or `dist/`): compiled artifacts (never committed).
- Root files: `README.md`, `FRAMEWORK.md` (this file), `CHANGELOG.md`, `LICENSE`.

## Naming & Versioning
- Package name: lowercase, hyphen‑separated.
- SemVer: `MAJOR.MINOR.PATCH`.
- Tags: `vX.Y.Z`.
- Releases: generated from tags with release notes.

## Branching & Commits
- Model: trunk‑based
  - `main` protected; short‑lived feature branches.
  - Require PR for changes to `main`.
- Conventional Commits
  - `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`, `perf:`
  - Scope optional, e.g., `feat(auth): add JWT refresh`.

## Environments & Config
- Envs: `local`, `dev`, `staging`, `prod`.
- Configuration layers (lowest → highest): defaults → environment file → secrets → runtime overrides.
- Use `.env.example` with required keys; never commit real secrets.
- Feature flags via config keys, not code branches.

## Documentation
- Project docs: `README.md` concise (what/why/how quick start).
- Developer docs: `docs/` rendered site; `docs/README.md` for GitHub browsing; link to online docs site.
- API docs: language‑specific (e.g., JSDoc/TypeDoc, Sphinx, Javadoc, Doxygen). Commit the generator config, not the generated site unless hosting requires it.
- ADRs (Architecture Decision Records): `docs/adr/` for significant decisions.

## Code Quality
- Style: language formatter (Prettier/Black/gofmt/rustfmt) + linter.
- Lint levels: zero errors; warnings allowed only if justified or silenced intentionally.
- Tests:
  - Unit: fast, isolated
  - Integration: modules/services together
  - E2E: minimal, high‑value flows
  - Coverage gate: start at 70% unit, adjust per project
- Security checks: dependency audit + static analysis (language tools).
- License compliance: scan third‑party dependencies.

## CI Pipeline (per push/PR)
- Install: deterministic (`lockfile`), cache dependencies.
- Lint: enforce style and basic correctness.
- Test: unit + integration; upload coverage.
- Build: produce artifacts (e.g., `dist/`, container image).
- Package/Artifacts: attach build outputs to CI for download.
- Release: on tag `v*`, create GitHub Release with changelog and artifacts.

## Deployment
- Static frontends: `dist/` contents deployed to CDN/hosting; server sets caching headers.
- Backends: container image with health checks; environment variables mounted at runtime.
- Infrastructure as Code preferred (e.g., Terraform/CDK/Pulumi) when applicable.
- Rollbacks: keep previous artifact; support one‑click rollback.

## Observability & Ops
- Logging: structured logs with correlation IDs; redact sensitive data.
- Metrics: basic KPIs (latency, error rate, throughput) and business metrics.
- Tracing: adopt standard tracing if services communicate.
- Alerts: on SLO breaches (not single errors).

## Security & Privacy
- Secrets: vault or managed secrets store; never in repo.
- Input validation and output encoding; treat external input as untrusted.
- Least privilege for services and databases.
- Data protection: encryption in transit and at rest as needed.
- Threat modeling for externally exposed surfaces.

## Error Handling
- Consistent error model (domain errors vs. system errors).
- User‑facing messages friendly; internal logs diagnostic.
- Retry/backoff for transient failures; circuit breaker patterns where relevant.

## Performance
- Budgets: define target response times / bundle sizes.
- Measure: profiling and synthetic checks; optimize informed by data.

## Frontend Specifics
- State management: co‑located component state; escalate to context/store when shared.
- Assets: hashed filenames; lazy load heavy routes; accessibility (a11y) as non‑negotiable.
- Internationalization: string catalogs; avoid hardcoded text.

## Backend Specifics
- Layering: transport (HTTP/RPC) → application → domain → infrastructure.
- Contracts: OpenAPI/Protobuf schemas; breaking changes require new versions.
- Idempotency for mutations; pagination for lists.

## Repository Hygiene
- `.gitignore` tuned to exclude build artifacts, local tools, secrets.
- CODEOWNERS for critical paths.
- Issue/PR templates to standardize work.

## Project Bootstrap Checklist
- [ ] Define name, license, and owners
- [ ] Create repo with baseline structure and `.gitignore`
- [ ] Add README with Quick Start and link to docs site
- [ ] Configure CI (install, lint, test, build)
- [ ] Add linter/formatter configs
- [ ] Add `.env.example` and configuration strategy
- [ ] Set branch protection on `main`
- [ ] Create release workflow (optional initially)
- [ ] Set up hosting/deploy path (static or service)
- [ ] Add security checks (deps + static analysis)

## Adaptation by Language
- JavaScript/TypeScript: ESLint + Prettier, JSDoc/TypeDoc, Vitest/Jest.
- Python: Ruff/Flake8 + Black, Sphinx, Pytest.
- Java: Checkstyle/SpotBugs, Javadoc, JUnit.
- Go: `go fmt`/`golangci-lint`, `godoc`, `go test`.
- Rust: `rustfmt`/Clippy, rustdoc, `cargo test`.

Use this as the default baseline; document any divergence explicitly in the repo’s README under a “Deviations from Framework” section.

