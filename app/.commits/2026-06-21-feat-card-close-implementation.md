feat(card): implement closeCard backend and fix card close wizard

Add closeCard service method that saves recurrence transactions,
calculates one-timer totals, and decrements card balance. Fix
FormContainerCard to use STEP_CONFIGS_CARD_CLOSE routing.
