feat(card): add pay statement endpoint and tag closed transactions

New GET /cards/close/:year/:month endpoint returns card statement
excluding previously closed recurrences and one-timers. Backend
tags all closed transactions with CARD-CLOSE source. Frontend
uses dedicated hook for pay statement data.
