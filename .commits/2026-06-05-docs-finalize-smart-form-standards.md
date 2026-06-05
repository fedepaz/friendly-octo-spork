docs: finalize smart-form wizard and error-mapping standards

Formalizes the "Smart Form" wizard and backend error-mapping patterns in
the agent profiles and refactors the tutorials into generic templates.

- Updated Frontend Agent: Mandated the Smart Form Wizard pattern and use of mapServerErrorsToForm.
- Updated UX Agent: Added standards for Wizard UI, including mandatory review steps and submission guards.
- Updated Backend Agent: Defined the standardized validation error response structure.
- Refactored Tutorials: Converted SMART_FORM_TUTORIAL.md and SMART_FORM_TUTORIAL_INFO.md into generic, project-agnostic implementation recipes.