
# QA Engineer Technical Assessment Submission

Candidate: Kamilah Kaye Velante

## Assessment Objective
Demonstrate manual testing, automation testing, and API testing skills.

Applications Tested:
- SauceDemo
- JSONPlaceholder API

---

# Scope

## Web Application Testing
Validated:
- Login
- Add to Cart
- Cart Validation
- Checkout Completion
- Validation Behavior
- Edge Cases
- Navigation Stability

## API Testing
Endpoints covered:
- GET /users
- GET /users/1
- POST /posts
- PUT /posts/1

Coverage:
- Positive cases
- Negative cases
- Edge scenarios
- Assertions
- Response validation

---

# Tools Used

## Automation
- Playwright
- TypeScript
- Node.js

## API Testing
- Postman

## Manual Testing
- Excel 

---

# Test Strategy

Approach:
- Functional testing
- Negative testing
- Edge case testing
- Risk-based validation

Focus:
Critical purchase workflow validation.

---

# Manual Testing Summary

| Metric | Result |
|------|--------|
| Total Test Cases |  |
| Passed | 23 |
| Failed | 2 |


# Identified Issues

## BUG-001
Checkout allowed with empty cart.

Severity:
Medium

---

## BUG-002
Generic validation messaging.

Severity:
Low

---


# Automation Framework

Architecture:
Page Object Model

Coverage:
- Login
- Add item to cart
- Cart validation
- Checkout completion
- Order confirmation

Run:

```bash
npm install
npx playwright install
npm test
```

HTML report:

```bash
npm run test:report
```

---

# API Testing Summary

Endpoints tested:
- GET /users
- GET /users/1
- POST /posts
- PUT /posts/1

Validation included:
- status code checks
- schema verification
- edge case testing
- payload validation

Known limitation:
JSONPlaceholder is a mock API and does not enforce full production validation behavior.

---

# Improvements if Expanded

Potential enhancements:
- CI/CD integration
- cross-browser automation
- parallel execution
- data-driven testing
- API schema validation
- performance assertions
- accessibility testing
- security testing

---

# Submission Notes

This submission was designed to demonstrate:
- structured QA thinking
- maintainable automation engineering
- practical API validation
- defect reporting quality
- professional documentation
