# Sprint 3: Catalog Foundation, commercetools & Data Research - 22.06.2026

## What was done

- **Header & UI Kit Follow-up (post–Sprint 2):** Merged and finalized work that was still in review at the end of Sprint 2: shared `Header` with `SearchWidget`, `Popover`, tooltip positioning improvements, icon placement fixes, and draft templates for auth/products services. This closed the Home-page interaction layer and prepared the app shell for catalog work.
- **commercetools API Integration Setup:** Researched the commercetools platform in depth and set up the initial integration layer: environment configuration (`.env.example`, `env.d.ts`), CI/CD secrets wiring, `CommercetoolsService`, and project documentation. This was a heavy time investment — the API, product model, and project structure turned out to be significantly more complex than expected for a first connection.
- **Catalog Page Layout & Routing:** Built the first version of the **Catalog** page: routing, responsive grid layout (sidebar + product area), placeholder blocks for filters, toolbar, and pagination, and the `CatalogGrid` shell. Established the page structure that the filters/sorting feature will plug into.
- **Product Card & List Grid:** Implemented and integrated the shared `ProductCard` for catalog listing, built the `CatalogGrid` component, introduced `CatalogService`, and moved product mocks into a centralized `products.json`. Connected the grid to real mock data instead of page-local JSON.
- **Catalog Data Preparation (100 comics):** Spent a large amount of time preparing a realistic catalog dataset. Initially planned ~1000 products, but after evaluating several approaches settled on **100 manually curated comics**: **40 Marvel**, **30 DC**, **20 Dark Horse**, and **10 Image**, with data taken from a real comic store website. The goal was to make the storefront feel authentic rather than randomly generated.
- **Comic Product Domain Research:** Invested time in understanding comics as commercial products — issues vs volumes, collected editions, series/year variants, cover types, and collector terminology. Read collector-focused articles to avoid building the catalog around the wrong abstractions. For this educational project, decided to focus on regular **issues** as the product unit.
- **Catalog Filters & Sorting UI (in progress, planned as separate commits):** Continued work on the catalog navigation sidebar beyond the merged layout PR. Implemented filter controls (checkboxes for publisher, genre, writer, penciller, and cover artist), sorting/per-page select dropdowns, and responsive drawer mechanics for mobile. Extracted reusable shared components — `Drawer`, `CheckboxGroup`, and `Select` — which will land as separate commits/tasks. Added `UiService` to coordinate a single active drawer (search vs catalog filters), body scroll-lock, shared filter state between desktop sidebar and mobile drawer, and refactored the search widget onto the shared `Drawer`. Filtering/sorting logic itself is intentionally deferred until commercetools API integration.
- **Code Review:** Conducted a structured code review of the catalog feature branch — checked UI behavior, controlled-component patterns, drawer accessibility, responsive mechanics, and integration boundaries before merge.

## Problems

- **commercetools Complexity & Time Sink:** A disproportionate share of the sprint went into understanding commercetools rather than shipping visible UI. Documentation, product modeling, and API ergonomics were harder to navigate than expected, and this slowed down the transition from mock-driven development to real platform integration.
- **Catalog Data — No Good Automated Source:** Finding realistic catalog data took far longer than building components. Evaluated multiple paths, each with serious trade-offs:
  1. **Python script** — fast to generate volume, but comics were random/fake and had no images.
  2. **Open datasets (Kaggle)** — Marvel, DC, and general comic datasets existed, but the latest dates stopped around **2021**, there were no image URLs, and the description format did not fit the project.
  3. **Comic Vine API** — better format and images, but awkward multi-endpoint flows, unreliable filtering, and too much manga/noise for our store concept.
  4. **HTML scraping (Instant Data Scraper)** — tried several comic sites; output was incomplete and images were low quality.
  5. **Manual entry** — slowest option, but the only one that produced trustworthy, on-brand data. Chose quality over scale (**100** items instead of **1000**).
- **Comics Are a Hard Product Domain:** Even after choosing issues as the product type, comics remain structurally complex (series, volumes, variants, editions). Easy to over-engineer the model for a learning project.
- **Team Disengagement & Burnout:** Lost motivation because the team is effectively absent. Over two-week cycles, teammates sometimes deliver **300–500 lines**, then disappear for another two weeks and do not participate in reviews or coordination. Ended up carrying most of the project alone, which led to burnout and loss of interest in the course overall.
- **School / Process Friction:** There is little visible activity from course organizers. The biweekly **interview format** feels misaligned with project delivery — time goes into interview prep instead of building. The previous model (solo gradual sprint work + mentor review) felt healthier and more productive.
- **Uneven Review & Delivery Culture (ongoing):** Same structural issues as Sprint 2 — slow reviews, uneven teammate velocity, and high coordination overhead for the Team Lead role.

## Solutions

- **Pragmatic Data Strategy:** Stopped chasing automated bulk generation when every shortcut produced unusable data. Reduced scope from 1000 to **100 curated comics** with real metadata and acceptable images, prioritizing storefront credibility over catalog size.
- **Domain Scoping:** Deliberately narrowed the product model to **regular issues** instead of trying to represent the full collector market (variants, omnibuses, volume hierarchies, etc.).
- **Incremental Catalog Architecture:** Split catalog delivery into layout/grid first (merged PRs), then filters/sorting UI, then shared primitives as separate commits — keeps review scope manageable even when the overall feature is large.
- **Deferred API Logic:** Kept filter/sort behavior mock-local for now and focused on UI/state boundaries (`CatalogService`, shared drawer state, controlled checkbox groups) so commercetools integration can be added without rewriting the page shell.
- **Shared Drawer Coordination:** Introduced `UiService` so search and catalog drawers do not fight each other (single active drawer, scroll lock, consistent close behavior).
- **Self-Review Before Merge:** Ran a dedicated code review pass on the catalog branch to catch controlled-component bugs (checkbox/select state, drawer regressions, duplicate filter instances) before splitting shared components into separate PRs.

## What I learned

- **commercetools Is a Project on Its Own:** API setup is not a one-evening task. Product types, attributes, categories, and query patterns need upfront domain thinking — especially for non-trivial catalogs like comics.
- **Data Quality Beats Data Volume:** For a storefront demo, **100 believable products** are more valuable than **1000 synthetic rows** without images or coherent descriptions.
- **Product Research Pays Off (to a Point):** Reading collector material helped avoid wrong catalog abstractions, but it also showed how easy it is to over-scope a student e-commerce project.
- **Controlled Components Need End-to-End State:** UI primitives like `Checkbox`, `CheckboxGroup`, and `Select` only work in real flows when parent components own and sync state — a good lesson from the catalog filters review.
- **Solo Carry Has a Cost:** Process and leadership work does not substitute for team delivery. When participation drops, motivation and code quality both suffer — burnout is a real delivery risk, not just a personal mood issue.
- **Interview-Driven Sprints Compete with Building:** Forcing interview readiness every two weeks shifts focus away from the product itself; mentor-led incremental review matched this project better.

## Plans

- **Finish Catalog Page:** Complete filters/sorting UI commits (`Select`, `Drawer`, `CheckboxGroup`, toolbar state, remaining polish such as z-index and select persistence), then wire catalog behavior to commercetools queries.
- **Product Details Page:** Implement the next major storefront flow after catalog listing.
- **commercetools Integration:** Move from mocks and setup work to real product fetching, filtering, and sorting through the API.
- **Design Polish:** Apply stylistic corrections across the site once core catalog/product flows exist.
- **Next Two Sprints (realistic scope despite burnout):** Try to close catalog + product details + commercetools integration + visual polish, even if team participation remains low.

## Time Spent

40+ hours
