# ZBooking License Token System - Setup Guide

## Overview
Complete implementation of the ZBooking license token system for Next.js portfolio (zhovon.com) with Supabase backend.

## Files Created

### 1. Utility Library
- **File**: `lib/zbooking.ts`
- **Purpose**: Helper functions for token generation, validation, and database operations
- **Functions**:
  - `generateToken()` - Creates secure `zbk_*` format tokens
  - `validateEmail()` - Email format validation
  - `createLicenseKey()` - Insert license to database
  - `getLicenseByToken()` - Retrieve license record
  - `getDomainBinding()` - Check if domain is bound to license
  - `createDomainBinding()` - Bind domain to license
  - `updateDomainBinding()` - Update domain's last_seen_at
  - `countDomainBindings()` - Count active domains for a license
  - `logVerification()` - Log verification attempts

### 2. API Routes

#### Generate Token API
- **File**: `app/api/internal/zbooking/license/generate/route.ts`
- **Endpoint**: POST `/api/internal/zbooking/license/generate`
- **Request**:
  ```json
  {
    "email": "customer@example.com",
    "plan": "pro"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "zbk_...",
    "plan": "pro",
    "max_domains": 3,
    "message": "Token generated successfully"
  }
  ```
- **Features**:
  - Email validation
  - Plan-based domain limits (basic=1, pro=3, enterprise=10)
  - 1-year token expiry
  - No rate limiting (consider adding)

#### Verify Token API
- **File**: `app/api/internal/zbooking/license/verify/route.ts`
- **Endpoint**: POST `/api/internal/zbooking/license/verify`
- **Request**:
  ```json
  {
    "token": "zbk_...",
    "secret_key": "aspirine",
    "domain": "booking.example.com",
    "plugin": "zbooking",
    "plugin_ver": "1.0.0"
  }
  ```
- **Response** (Valid):
  ```json
  {
    "valid": true,
    "plan": "pro",
    "expires_at": null,
    "plugin": "zbooking"
  }
  ```
- **Response** (Invalid):
  ```json
  {
    "valid": false,
    "reason": "invalid_token|expired|revoked|domain_limit|bad_secret"
  }
  ```
- **Features**:
  - Shared secret validation
  - Domain binding enforcement
  - Domain limit checking
  - Status checking (active/revoked)
  - Expiry validation
  - Comprehensive logging

### 3. Token Request Page
- **File**: `app/zb-token/page.tsx`
- **Route**: `/zb-token`
- **Type**: Public page (no authentication)
- **Features**:
  - Email input field
  - Plan selector (basic/pro/enterprise)
  - Loading state indicator
  - Error handling and display
  - Success view with token display
  - Copy-to-clipboard functionality
  - Links to contact page for support

## Environment Variables Setup

Add these to `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ZBooking
ZBOOKING_SHARED_SECRET=aspirine
```

## Supabase Tables Required

Ensure these tables exist in your Supabase database:

### `zbooking_license_keys`
```sql
CREATE TABLE zbooking_license_keys (
  id BIGSERIAL PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  plan VARCHAR(50) DEFAULT 'pro',
  status VARCHAR(50) DEFAULT 'active',
  max_domains INTEGER DEFAULT 1,
  expires_at TIMESTAMP,
  plugin VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_zbooking_license_keys_token ON zbooking_license_keys(token);
CREATE INDEX idx_zbooking_license_keys_email ON zbooking_license_keys(customer_email);
```

### `zbooking_license_domain_bindings`
```sql
CREATE TABLE zbooking_license_domain_bindings (
  id BIGSERIAL PRIMARY KEY,
  license_id BIGINT NOT NULL REFERENCES zbooking_license_keys(id) ON DELETE CASCADE,
  domain VARCHAR(255) NOT NULL,
  first_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(license_id, domain)
);

CREATE INDEX idx_zbooking_license_domain_bindings_license_id ON zbooking_license_domain_bindings(license_id);
CREATE INDEX idx_zbooking_license_domain_bindings_domain ON zbooking_license_domain_bindings(domain);
```

### `zbooking_license_verification_logs`
```sql
CREATE TABLE zbooking_license_verification_logs (
  id BIGSERIAL PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  domain VARCHAR(255),
  ok BOOLEAN DEFAULT FALSE,
  reason VARCHAR(100),
  ip VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_zbooking_license_verification_logs_token ON zbooking_license_verification_logs(token);
CREATE INDEX idx_zbooking_license_verification_logs_domain ON zbooking_license_verification_logs(domain);
CREATE INDEX idx_zbooking_license_verification_logs_created_at ON zbooking_license_verification_logs(created_at);
```

## Token Format

- **Prefix**: `zbk_`
- **Format**: `zbk_<64-character hex string>`
- **Example**: `zbk_a7f9e2d1c4b8f3e9a2d7e1f9c3b6a8d2f5e1a9c0d3b6e9f2a5c8d0e3f1a4b`
- **Generation**: `crypto.randomBytes(32).toString('hex')`

## Plan Configuration

| Plan       | Max Domains | Expiry    |
|-----------|------------|-----------|
| Basic     | 1          | 1 year    |
| Pro       | 3          | 1 year    |
| Enterprise| 10         | 1 year    |

## Testing the System

### 1. Generate Token
```bash
curl -X POST http://localhost:3000/api/internal/zbooking/license/generate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "plan": "pro"
  }'
```

### 2. Verify Token
```bash
curl -X POST http://localhost:3000/api/internal/zbooking/license/verify \
  -H "Content-Type: application/json" \
  -d '{
    "token": "zbk_...",
    "secret_key": "aspirine",
    "domain": "test.example.com",
    "plugin": "zbooking",
    "plugin_ver": "1.0.0"
  }'
```

### 3. UI Test
Visit `http://localhost:3000/zb-token` and fill out the form.

## Security Considerations

1. **Shared Secret**: The `ZBOOKING_SHARED_SECRET` environment variable must match the WordPress plugin settings.
2. **Domain Binding**: Each license can only be used with a limited number of domains (enforced).
3. **Token Length**: 64-character hex strings (256-bit security).
4. **Verification Logging**: All verification attempts are logged for audit purposes.
5. **Rate Limiting**: Consider adding rate limiting to the generate endpoint to prevent abuse.
6. **HTTPS Only**: Ensure all endpoints are accessed over HTTPS in production.

## Error Codes & Reasons

### Generate API
- `Email is required` - Missing or empty email field
- `Invalid email format` - Email format validation failed
- `Invalid plan` - Plan not in allowed list
- `Failed to generate token` - Database or server error

### Verify API
- `missing_fields` - Required fields missing
- `bad_secret` - Shared secret doesn't match
- `invalid_token` - Token not found in database
- `revoked` - License has been revoked
- `expired` - License expiry date has passed
- `domain_limit` - Maximum domains for this license exceeded
- `error` - Server error during verification

## Deployment Checklist

- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` env var
- [ ] Set `ZBOOKING_SHARED_SECRET` env var
- [ ] Verify Supabase tables exist with proper permissions
- [ ] Test generate endpoint
- [ ] Test verify endpoint with multiple domains
- [ ] Test token expiry logic
- [ ] Verify logging is working
- [ ] Update WordPress plugin settings with verify URL and shared secret
- [ ] Test end-to-end flow in production

## WordPress Plugin Integration

The WordPress plugin (`includes/settings.php`) should:

1. Add an "Add Token" button linking to `https://zhovon.com/zb-token`
2. Have a "License Token" text input field
3. Store verify URL: `https://zhovon.com/api/internal/zbooking/license/verify`
4. Store shared secret: `aspirine` (matches `ZBOOKING_SHARED_SECRET`)
5. Call the verify API on each request with domain, token, and secret
6. Cache verification results using transients (e.g., 24 hours)
