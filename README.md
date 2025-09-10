# Requirements

- Use Tailwind CSS library for styling.
- Implementation should be responsive.
- Mobile Design: https://www.figma.com/design/RfLWz0MVx9YbgvDYydKqBo/FE-Test?node-id=0-1156&t=hyntdepgafE9wvoY-0
- Desktop Design: https://www.figma.com/design/RfLWz0MVx9YbgvDYydKqBo/FE-Test?node-id=2-4926&p=f&t=239mfFyGIXEeqzYh-0
- Components: https://www.figma.com/design/RfLWz0MVx9YbgvDYydKqBo/FE-Test?node-id=2-4927&p=f&t=TnB7Q6t3QGAbAZKo-0
- On the design fonts are our premium font but you can use google fonts or any font you want but they need to be aesthetically pleasing.
- Form should be on different page (You need to navigate to another page) and it should validate input on blur and submit event.
- Validation Rules:
  - ```
    {
        "name": alphaNumericString, maxlength: 255
        "company": string, maxlength: 255
        "mobile_phone": numericString, RegExp:/^0(\s*)(7)(\s*)(\d(\s*)){9}$/
        "email_address": string, minLength: 5, maxlength:255, RegExp:email
        "postcode": alphaNumericString, maxlength:30
        "pay_later": boolean,
        "pay_now": boolean
    }
        "pay_later" or "pay_now" at least one of them or both should be true
    ```
- Build two enpoints by using API Routes of Nextjs.
  - POST endpoint should capture form data and save it to a list.
  - GET endpoint should return that list to render on list page.
  - You don't need to implement any database solution. Just using plain local JSON file will be enough.
- All validation should happen on frontend. You don't need to implement any validation business logic on the backend side.
- List should searchable by company name.
- List should be persisted.
- Clean and maintainable code is a must, you can use eslint (We are evaluating folder structure as well).
- Implementing a automated testing is a must. There should be one end to end test that testing the flow OR Unit tests with at least %20 coverage. (You can use Cypress for e2e or react-testing-library for unit tests).
- Don’t hesitate to take initiative and improvise on things/design parts that are not provided.
- You can use any library you want but please keep in mind about bundle size.
- If a functionality isn’t provided for a part you can leave them as static.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
