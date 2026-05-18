# Sprint 1: Project Setup & Component Basics - 18.05.2026

## What was done

- **Leadership & Team Alignment:** Assembled the development team and was chosen to serve as Team Lead. Collaboratively selected the project theme — an online comic book store integrated with the **commercetools API**. Established a proactive team culture by creating a **Contribution Guidelines** document focused on **Code Review Etiquette**. Implemented review tags (`nit`, `question`, `praise`), feedback tracking emojis, and strict thread closure rules (author-only) to eliminate friction and foster healthy collaboration.
- **Tech Stack Strategy:** Finalized the core stack for the project: **Angular 21**, **TypeScript**, **SCSS**, **Vitest**, **RxJS**, **@ngrx/signals**, and the **commercetools API**.
- **Environment & Quality Gates:** Configured the repository using automated quality tools: ESLint, Stylelint, Prettier, Husky, commitlint, and custom branch name validation. Integrated an advanced Angular-ESLint configuration based on community best practices to enforce high performance standards, such as mandatory `ChangeDetectionStrategy.OnPush`.
- **CI/CD Pipeline:** Created a GitHub Actions workflow for automatic linting checks and continuous deployment (CD) to GitHub Pages.
- **UX/UI Prototyping:** Researched over 20 comic store platforms. Used AI design tools (Visily.AI, Lovable) strictly as a launching pad for initial ideas, while building our primary product blueprint on a **Miro board**. Centralized all competitive references, selected iconography, and the target brand color palette inside Miro to collaboratively map out user journeys and construct pages on the fly.
- **UI Kit Engineering:** Initiated a custom UI Kit inspired by Marvel and Third Eye Comics. Architected and deployed the project's global **SCSS foundation**, establishing dedicated stylesheets for colors, mixins, placeholders, and animations. Adopted industry-standard design tokens by adapting **Tailwind CSS specifications** for typography and spacing scales. Designed, implemented, and reached **100% unit test coverage** using **Vitest** for 7 core standalone components: `Icon`, `IconButton`, `IconRouterLink`, `IconExternalLink`, `Button`, `RouterLink`, and `ExternalLink`.
- **Advanced Angular Implementation:** Utilized Angular 21 primitives, including Signal-based inputs, performance-optimized `@if` control flow, and template-level reactive variables via the `@let` syntax.
- **Testing Infrastructure:** Adopted a centralized test automation approach by storing all QA anchors in a single `app.test-ids.ts` registry. Wrote robust, reliable specs covering edge cases, such as blocking browser events (`click`, `keydown`) and preventing propagation during active `loading` or `disabled` element states.

## Problems

- **Velocity Trade-off:** The "UI Kit" epic reached **35%** completion instead of the projected **60%**. This shortfall was caused by a heavy upfront investment of time into team organization, configuring robust boilerplate setups, and handling thorough code reviews.
- **Team Initiative & Communication Gaps:** Encountered a lack of proactive ownership from team members. Some features and architecture improvements (such as UI Kit playground/demo pages and global color tokens) appeared as unexpected surprises during code reviews rather than being discussed and agreed upon during team planning sessions.
- **Design Uncertainty:** Operating without a strict Figma or UX/UI design layout created a fear that the final product might lack visual cohesion, potentially leading to tedious pixel-pushing, incorrect paddings, and font misalignment across pages later on.
- **Host Binding Event Testing:** Faced initial ambiguity when trying to intercept and test standard DOM events (`click`, `keydown`) bound to the component host object using Vitest.
- **Accessibility Bug in Community Solutions:** Initial implementation ideas found in community videos recommended blocking events with `event.preventDefault()`, which inadvertently broke keyboard accessibility by disabling sequential `Tab` navigation.

## Solutions

- **Buffer Management:** Compensated for the structural delays by accelerating the review pipeline, successfully pushing an extra component to the code review stage right before the sprint deadline (Input, Tooltip).
- **Adaptive Prototyping:** Used AI-driven wireframes (Visily.AI) as a flexible baseline. Accepted that the team will organically align layouts and polish styling parameters directly in code as user journeys become more defined.
- **Documentation-First Testing:** Resolved the test setup issues by shifting from random tutorial videos to official Angular documentation guidelines on host bindings, matching them with `vi.spyOn` structures.
- **Refactoring for Accessibility:** Fixed the keyboard navigation bug by replacing destructive methods with a clean `event.stopPropagation()` call followed by an explicit `return;`, protecting accessibility standards.

## What I learned

- **AAA Testing Pattern:** Mastered the **Arrange-Act-Assert** pattern under a mentor's guidance, which vastly improved the structure, clarity, and readability of my unit tests.
- **Repository Governance & Automation:** Realized the critical value of setting up branch protection, Husky hooks, and commitlint early. These automated quality gates are already actively helping the team maintain high code quality standards and enforce a clean, linear Git commit history.
- **CI/CD Reliability:** Learned how to configure a stable deployment pipeline to GitHub Pages using proven infrastructure templates.
- **Web Accessibility (a11y) Nuances:** Discovered why copying community tutorials blindly can be dangerous. Replacing `preventDefault()` with `stopPropagation()` taught me how crucial it is to safeguard keyboard `Tab` navigation for accessible UI components.
- **Centralized QA Anchors:** Experienced the efficiency of keeping all test IDs in a single file (`app.test-ids.ts`), making test writing faster for developers and simplifying automated testing for QA engineers.
- **Leadership & Code Review Etiquette:** Learned that a clear `Contribution Guidelines` document drastically minimizes team conflicts during code reviews. Also realized that architectural shifts (like UI Kit demo pages) must be brought to planning sessions rather than surprising the team at the PR stage.

## Plans

- **UI Kit Expansion & Demo Page:** Build a custom **UI Kit Showcase/Demo page** directly within the app to display existing UI components in real-time (bypassing heavy third-party alternatives like Storybook).
- **Feature Development:** Continue developing UI Kit primitives and begin assembling the layout and structural components for the **Main Page**.
- **commercetools Integration:** Set up the organization account, acquire API credentials, explore the documentation, and initiate test requests.
- **State Management Architecture:** Design and implement a centralized data store using **RxJS** and **@ngrx/signals** to prepare the application for commercetools API integration and data streaming.

## Time Spent

40+ hours
