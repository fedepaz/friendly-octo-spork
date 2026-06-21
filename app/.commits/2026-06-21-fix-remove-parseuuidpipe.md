fix(api): remove ParseUUIDPipe that rejects CUIDs

ParseUUIDPipe validates standard UUID format (with dashes), but this
project uses CUIDs. All GET /:id endpoints were returning 400 for
valid CUIDs.
