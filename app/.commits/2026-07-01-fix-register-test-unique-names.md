fix(backend): use unique timestamped names in register integration test

The register test used hardcoded names (NewUser1, DupUser1) which
collided on repeated runs against the same database. Now generates
unique names with Date.now() timestamps, matching the pattern already
used by the registerAndLogin helper.
