feat(testing): add comprehensive unit test foundation

Add unit tests for the entire appFinance monorepo covering:
- Shared package: Zod schema validation tests (239 tests)
- Backend: Repository, service, and controller tests (142 tests)
- Frontend: Hook tests with MSW mocking (97 tests)

Infrastructure:
- Jest configuration for all 3 packages
- MSW setup for frontend API mocking
- React Testing Library for hook testing
- Coverage thresholds configured

Documentation:
- Design spec for testing strategy
- Implementation plan
- Testing guide with patterns and examples
- Tutorial with commands and flags reference

Total: 478 tests passing across 27 test suites.
