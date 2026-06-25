fix: resolve Recharts ResponsiveContainer width(-1)/height(-1) warnings

Add initialDimension prop to ResponsiveContainer in both chart components.
Recharts defaults to { width: -1, height: -1 } before ResizeObserver fires,
causing repeated console warnings on every render. Setting valid initial
dimensions eliminates the noise while preserving responsive behavior.
