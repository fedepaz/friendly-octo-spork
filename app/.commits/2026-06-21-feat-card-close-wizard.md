feat(card): add card balance close/settle wizard

Add "Cierre Tarjeta" button to KPIs dashboard that opens a card
balance wizard. Adds SmartFormProviderCard to the wizard system
with openCard support in WizardFormProvider.

Also adds explicit return type to getAccountById endpoint.
