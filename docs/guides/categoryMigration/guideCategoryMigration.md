I need help consolidating 1235+ financial transaction categories into 20 master categories.

CONTEXT:

- This is for a personal finance app tracking income/expenses
- Many categories are duplicates with typos, abbreviations, or slight variations
- Some categories are very specific (e.g., vendor names) that should be grouped
- The user is from Argentina, so context: "birras" = beers, "lomo" = sandwich, "nafta" = gas/fuel, etc.

MASTER CATEGORIES (20):

1. Groceries & Food Shopping - supermarket, food items to cook at home
2. Restaurants & Takeout - eating out, delivery, prepared food
3. Alcohol & Beverages - beer, wine, spirits bought separately
4. Tobacco & Smoking - cigarettes, vaping
5. Transportation - Fuel - gasoline for vehicles
6. Transportation - Public/Rideshare - subway, taxi, Uber, Cabify
7. Vehicle Maintenance - car/motorcycle repairs, insurance, registration
8. Rent & Housing - rent, HOA fees
9. Utilities & Services - electricity, gas, internet, phone, water
10. Personal Care & Grooming - haircuts, barber, personal hygiene
11. Clothing & Footwear - clothes, shoes, accessories
12. Health & Medical - insurance, doctor, dentist, pharmacy, medications
13. Gym & Sports - gym membership, sports fees, supplements
14. Entertainment & Social - going out, concerts, gifts, celebrations
15. Subscriptions & Memberships - Netflix, Spotify, digital services
16. Household & Cleaning - cleaning products, laundry, household services
17. Hardware & Electronics - computers, phones, electronics, accessories
18. Home Improvement & Tools - hardware store, tools, home repairs
19. Gifts & Special Occasions - presents, tips, special events
20. Miscellaneous/Other - anything that doesn't fit above

TASK:
Analyze the attached categories list and create a JSON mapping file with this structure:

{
"mappings": [
{
"oldCategoryId": 123,
"oldCategoryName": "birraPan",
"newCategoryName": "Groceries & Food Shopping",
"confidence": "high",
"reasoning": "Buying beer and bread together at a store for home consumption"
},
{
"oldCategoryId": 456,
"oldCategoryName": "lomoBirra",
"newCategoryName": "Restaurants & Takeout",
"confidence": "high",
"reasoning": "Sandwich with beer, likely eating out"
}
],
"summary": {
"totalCategories": 1235,
"categoriesPerMaster": {
"Groceries & Food Shopping": 450,
"Restaurants & Takeout": 320,
...
}
}
}

RULES:

1. Every old category MUST map to exactly ONE master category
2. Use "confidence" levels: "high", "medium", "low" (low = ambiguous, needs review)
3. Consider Spanish context and Argentine slang
4. Combo purchases (e.g., "birraPanTabaco") should map based on PRIMARY purpose
5. If a category is just "varios" or "?" → map to "Miscellaneous/Other"
6. Prefer the most recent/common usage pattern when ambiguous

SPECIAL CASES TO WATCH:

- "futbol" context: if with food = Groceries, if it's a fee = Gym & Sports
- "birras" alone = Alcohol, but "birras" with location/event = Entertainment & Social
- Items with account names (like "meha", "psa") → ignore the account prefix, focus on the item
- Abbreviations: "pelu" = haircut, "sube" = subway card, "mila" = milanesa

Please analyze the 'docs/guides/categoryMigration/all_category_names.md' file and generate the complete mapping JSON in groups of 100 on this folder, named `category_mappings{1..100}.json`.
