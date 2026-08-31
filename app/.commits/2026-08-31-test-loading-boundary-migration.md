test(investments): verify LoadingBoundary migration in test

Mock LoadingBoundary and assert it is called with correct props
(name="investments", skeleton provided) instead of only checking
that the data-table renders, which passes regardless of boundary.
