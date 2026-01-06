


### Frontend Security

| Issue | File | Description |
|-------|------|-------------|
| No 401 handling | `api.ts:40-42` | Token expiration not handled gracefully |
| Type safety (`any`) | `api.ts:32,59` | Critical auth paths use `any` type |
| No error boundary | `App.tsx` | Unhandled errors crash entire application |
| Debug logs in prod | `AddBookModal.tsx` | Multiple `console.log` statements |
