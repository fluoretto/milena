# Documentation: `/api/v1/public/auth`

---

## POST: `/api/v1/public/auth/makeExchange`

Exchange an auth code for a JWT Refresh Token.

### Request

- **Query:** none
- **Body:**

```typescript
type body = {
  code: string; // The code to exchange
  uid: string; // The ID of the user that owns the code
};
```

### Response

```typescript
type data = string; // The refresh token
```

---

## POST: `/api/v1/public/auth/makeLogin`

Exchange an login code for a login JWT Refresh Token.

### Request

- **Query:** none
- **Body:**

```typescript
type body = {
  email: string; // The e-mail to login
  words: string[]; // The 4 words code
};
```

### Response

```typescript
type data = string; // The refresh token
```

---

## POST: `/api/v1/public/auth/sendLoginCode`

Send login code to e-mail.

### Request

- **Query:** none
- **Body:**

```typescript
type body = {
  email: string; // The e-mail to login
};
```

### Response

```typescript
type data = {};
```

---

## GET: `/api/v1/public/auth/wordlist`

Get available words that can be sent as login code to e-mail.

### Request

- **Query:** none
- **Body:** none

### Response

```typescript
type data = string[]; // the words
```
