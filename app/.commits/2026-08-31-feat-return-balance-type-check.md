feat(transactions): decouple RETURN from source balance, add type-check task

RETURN now only increments the target account (represents profit from
an investment) without decrementing the source. INVESTMENT keeps
transfer-like behavior (decrement source, increment target). Remove
RETURN from requiresSource in shared schema. Add type-check turbo task
and exclude .next/cache from build outputs.
