fix: remove checkout from composite action

GitHub Actions resolves local action paths (./.github/actions/setup)
at workflow trigger time, before any job runs. Including checkout
inside the composite action meant the repo wasn't available when
GitHub tried to resolve the path.

Each job now does checkout separately, then calls the composite action.
