# Documentation: `/api`

---

## GET: `/api`

Checks if API is healthy.

### Request

- **Headers:** none
- **Query:** none
- **Body:** none

### Response

```typescript
type res = {
  health: boolean; // Is healthy?
  status: boolean; // Status is ok?
};
```
