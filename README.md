# Learning Management System

## Schema Model

![schema](./attachments/schema.svg)

## Flow diagram

### Educator Flow Diagram

![educator-flow-diagram](./attachments/educator-flow-diagram.svg)

### Student Flow Diagram

![student-flow-diagram](./attachments/student-flow-diagram.svg)

## Features

### authentication and authorisation

- [x] sign in
- [x] sign up
- [x] sign out

### Educator

- [x] create course
- [x] edit course
- [x] delete course - should delete corresponding chapters and pages and enrolled users and completed entries
- [x] create chapter
- [x] edit chapter
- [x] delete chapter - should delete chapter and corresponding pages and completed entries
- [x] create page
- [x] edit page
- [x] delete page - delete page and corresponding completed entry
- [ ] view reports

### Authorised everyone

- [x] view courses
  - [x] enrolled
  - [x] available
- [x] view chapters
  - [x] locked
  - [x] unlocked
- [x] view pages
- [x] mark as completed a page
- [x] course progress
- [x] enroll in a course
- [x] change password

### Optional features

- [ ] search functionality
- [ ] quizzes at the end of the chapters
