fix(card): return CardCloseResponseDTO from close endpoint

Prevents SyntaxError: Unexpected end of JSON input when frontend
parses the empty response body. Backend now returns success status
and updated account balance after card close.
