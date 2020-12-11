# Documentation: `/api/v1`

---

## Basic structure for API v1 Responses:

All API responses inside this path follows this structure:

```typescript
type res = {
  status: number; // The HTTP status
  data: any; // The data of the response
  error?: {
    name: string; // The name of the error
    message: any; // The message returned by the server
    originService: string; // The service threw the error
    originModule: string; // The module threw the error
  };
  ok: boolean; // Is ok? (that is, is not an error?)
};
```

### Request

- **Headers Required:**
  - `claimer-id`: the claimer to be used in JWTs
  - `claimer-key`: the key of the claimer

---

## GET: `/api/v1`

Checks if API is healthy.

### Request

- **Query:** none
- **Body:** none

### Response

```typescript
type data = {
  health: boolean; // Is healthy?
  version: number; // 1
};
```
