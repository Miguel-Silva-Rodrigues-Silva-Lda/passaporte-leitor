# Code Review Findings - Passaporte Leitor

**Date:** 2026-01-06
**Scope:** Full end-to-end review (security, performance, code quality, best practices)

---

## Executive Summary

The Passaporte Leitor application is a well-structured children's reading tracker with gamification. The codebase demonstrates good architectural decisions (Hono + Prisma backend, React + Zustand frontend), but has **3 critical security vulnerabilities** that require immediate attention, along with several performance and code quality issues.

---

## Critical Issues (Immediate Action Required)

### 2. Email Enumeration Vulnerability
| | |
|---|---|
| **Severity** | CRITICAL |
| **File** | `backend/src/routes/auth.ts:34-52` |
| **Endpoint** | `POST /api/auth/check-email` |
| **Issue** | Returns `{ exists: true/false }` revealing registered emails |
| **Risk** | Attackers can enumerate valid accounts for phishing/credential stuffing |
| **Fix** | Return same response always, add rate limiting, or require CAPTCHA |

### 3. N+1 Query in Family Map Route
| | |
|---|---|
| **Severity** | CRITICAL (Performance) |
| **File** | `backend/src/routes/map.ts:273` |
| **Issue** | `calculateStreak(child.id)` called per child without passing loaded sessions |
| **Impact** | Extra DB query per child (5 children = 5 extra queries) |
| **Fix** | Pass `child.readingSessions` as second parameter (already loaded) |

---

## High Priority Issues

### Backend Security

| Issue | File | Description |
|-------|------|-------------|
| No rate limiting | `index.ts` | Auth endpoints vulnerable to brute force attacks |
| Weak password policy | `auth.ts:20` | Only 6 character minimum (OWASP recommends 8+) |
| Low bcrypt rounds | `auth.ts:65` | Using 10 rounds (12+ recommended for 2024+) |
| No Zod on check-email | `auth.ts:36-37` | Email format not validated before DB query |
| Unbounded nested data | `family.ts:~146` | `/family/:id/full` returns ALL books/achievements |

### Frontend Security

| Issue | File | Description |
|-------|------|-------------|
| Token in localStorage | `api.ts:24` | Vulnerable to XSS; httpOnly cookies preferred |
| No 401 handling | `api.ts:40-42` | Token expiration not handled gracefully |
| Type safety (`any`) | `api.ts:32,59` | Critical auth paths use `any` type |
| No error boundary | `App.tsx` | Unhandled errors crash entire application |
| Debug logs in prod | `AddBookModal.tsx` | Multiple `console.log` statements |

---

## Medium Priority Issues



### Type Safety

| Issue | File | Lines |
|-------|------|-------|
| `any` type usage | `map.ts` | 64, 104, 113, 248, 258, 266 |
| `any` type usage | `api.ts` | 32, 59 |
| Unsafe type casts | `Books.tsx` | 302 (`as keyof typeof`) |
| Missing error types | `Auth.tsx` | 97, 203 (`catch (err: any)`) |

### Inconsistencies

| Issue | Description |
|-------|-------------|
| Error language | Mixed English/Portuguese error messages |
| Response format | Some endpoints return `{ data }`, others `{ ...data }` |
| Pagination | Mixed `limit/offset` and `page/limit` patterns |
| Date handling | Inconsistent timezone management |

---

## Performance Issues

### Backend

| Issue | Location | Impact |
|-------|----------|--------|
| N+1 query (fixed above) | `map.ts:273` | Extra queries per child |
| Load all achievements | `achievements.ts:14-90` | Loads ALL achievements on every check |
| No pagination on nested | `family.ts` `/full` endpoint | Can return hundreds of records |
| Repeated serialization | All route files | CPU overhead on every response |

### Frontend

| Issue | Location | Impact |
|-------|----------|--------|
| No memoization | `Books.tsx:777-781` | Recalculates on every render |
| No virtualization | `ReadingSessions.tsx` | All sessions rendered (potential memory issue) |
| Redundant state sync | `App.tsx:44-57` | Syncs React Query to Zustand unnecessarily |
| Large components | `Books.tsx` (870 lines) | Hard to maintain, slow to parse |

---

## Architecture Observations

### Strengths
- Clean separation: routes, middleware, services, lib
- Good use of Zod for input validation
- Proper Prisma query patterns (no raw SQL)
- JWT auth with proper middleware
- Good database indexing in Prisma schema
- Security headers configured (HSTS, X-Frame-Options, etc.)
- Code splitting with React lazy loading

### Areas for Improvement
- No request logging middleware
- No structured error logging (just console.error)
- No health check auth (minor, public endpoint is fine)
- No refresh token mechanism
- No CSRF protection (acceptable for API-only backend)

---

## Recommended Action Plan

### Phase 1: Critical Security (30 min)
1. Add authorization to `/api/map/family/:familyId`
2. Fix N+1 query in map.ts
3. Add Zod validation to check-email

### Phase 2: Security Hardening (1 hour)
4. Add rate limiting middleware
5. Increase password requirements (8+ chars)
6. Increase bcrypt rounds to 12

### Phase 3: Code Quality (2 hours)
7. Create shared constants file (COLORS)
8. Create shared utils file (formatDate)
9. Create serializers file (status mapping)
10. Add error boundary to frontend
11. Fix type safety issues
12. Remove console.log statements

### Phase 4: Performance (1 hour)
13. Add memoization to Books.tsx
14. Add pagination to /family/full
15. Remove redundant state sync

---

## Files to Modify

### Critical
- `backend/src/routes/map.ts`
- `backend/src/routes/auth.ts`

### High Priority
- `backend/src/index.ts`
- `frontend/src/lib/api.ts`
- `frontend/src/App.tsx`

### Medium Priority (New Files)
- `backend/src/lib/serializers.ts` (create)
- `frontend/src/lib/constants.ts` (create)
- `frontend/src/lib/utils.ts` (create)

### Medium Priority (Refactor)
- `frontend/src/pages/Books.tsx`
- `frontend/src/pages/Auth.tsx`
- `frontend/src/pages/ReadingSessions.tsx`
- `frontend/src/components/ChildCard.tsx`
- `frontend/src/components/LogReadingModal.tsx`
- `frontend/src/components/AddBookModal.tsx`

---

## Summary Metrics

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Security | 2 | 5 | 2 | 1 |
| Performance | 1 | 3 | 4 | 2 |
| Code Quality | 0 | 2 | 8 | 5 |
| **Total** | **3** | **10** | **14** | **8** |

---

*This review was conducted on 2026-01-06 covering the full codebase including backend (Hono/Prisma/TypeScript) and frontend (React/Zustand/TypeScript).*
