ci(deploy): disable Docker cache for frontend builds

Docker BuildKit layer cache doesn't invalidate when build-arg values
change — it only checks instruction text and parent layer. This caused
NEXT_PUBLIC_API_URL to be baked in as empty even after setting the
GitHub Actions variable.

Adding no-cache: true forces a fresh frontend build every time,
guaranteeing the correct API URL is always in the image.

Co-authored-by: opencode <opencode@opencode.ai>
