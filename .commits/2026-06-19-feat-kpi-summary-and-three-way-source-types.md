feat(cards): add KPI summary dashboard and refactor source type to three-way discrimination

- Add 4 KPI summary cards (Cuotas Proyectadas, Consumos, Pagos, Deuda Total)
- Refactor CardRowSource from binary ("transaction"|"pending") to ternary ("recurrence"|"oneTimer"|"payment")
- Add SOURCE_LABELS and SOURCE_COLORS constant maps for consistent visual treatment
- Add "Tipo" column to DataTable with source badges
- Update CardViewForm to leverage new three-way discrimination for labels, colors, and icons
- Update components-list.md with new CardSummaryKPIs component
