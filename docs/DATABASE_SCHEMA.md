# DATABASE_SCHEMA.md

# Database
PostgreSQL

Provider
Supabase

---

# Users
id UUID PK
name
email
phone
password_hash
role
avatar
is_verified
created_at
updated_at

Relationships: One User ↓ One Student Profile

---

# Student_Profile
id
user_id FK
college
degree
year
skills
linkedin
github
resume_url
bio
country
state
city

---

# Courses
id
title
slug
description
thumbnail
price
discount_price
duration
level
category
certificate
placement_support
is_featured
created_at
updated_at

---

# Course_Modules
id
course_id FK
title
position

---

# Lessons
id
module_id FK
title
video_url
notes_url
duration
position
is_preview

---

# Assignments
id
lesson_id FK
title
description
submission_type
deadline

---

# Assignment_Submissions
id
assignment_id FK
student_id FK
file_url
grade
feedback
submitted_at

---

# Enrollments
id
student_id FK
course_id FK
progress
completed
certificate_issued
enrolled_at

---

# Certificates
id
student_id FK
course_id FK
certificate_url
verification_code
issued_at

---

# Payments
id
student_id FK
amount
currency
payment_gateway
transaction_id
status
invoice_url
created_at

---

# Faculty
id
name
designation
bio
photo
linkedin
email

---

# Blogs
id
title
slug
cover_image
content
author
published
published_at
seo_title
seo_description

---

# Blog_Categories
id
name
slug

---

# Events
id
title
description
banner
location
event_date
registration_link

---

# Testimonials
id
student_name
photo
company
salary
review
video_url
rating

---

# Companies
id
name
logo
website
industry

---

# Placements
id
student_id FK
company_id FK
job_role
salary
placement_date
offer_letter

---

# Study_Abroad
id
country
university
course
fees
duration
hostel
scholarship
intake
eligibility
application_deadline
banner

---

# Study_Abroad_Applications
id
student_id FK
study_abroad_id FK
passport
marksheet
status
created_at

---

# Career_Roadmaps
id
title
description
difficulty
estimated_months
thumbnail

---

# Roadmap_Steps
id
roadmap_id FK
step_number
title
description
resource_url

---

# AI_Career_Reports
id
student_id FK
career_goal
skills
recommendation
salary_prediction
learning_path
resume_score
generated_at

---

# Resume_Analysis
id
student_id FK
resume_url
ats_score
missing_skills
strengths
improvements
created_at

---

# Leads
id
name
email
phone
source
campaign
course_interest
status
assigned_to
remarks
created_at

---

# CRM_Activities
id
lead_id FK
activity
notes
follow_up
created_by

---

# Notifications
id
user_id FK
title
message
type
read
created_at

---

# Support_Tickets
id
student_id FK
subject
description
status
priority
created_at

---

# Contact_Forms
id
name
email
phone
message
created_at

---

# Newsletters
id
email
subscribed_at

---

# Roles
Admin
Super Admin
Faculty
Student
Counsellor
Recruiter
Content Writer
Placement Officer

---

# Relationships
User ↓ Student Profile ↓ Enrollments ↓ Courses ↓ Modules ↓ Lessons ↓ Assignments ↓ Certificates ↓ Placements
User ↓ Notifications
User ↓ Payments
Lead ↓ CRM Activities
Course ↓ Modules ↓ Lessons ↓ Assignments
Student ↓ Placement ↓ Company
Student ↓ Study Abroad Application ↓ University

---

# API CONTRACTS

## Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me

## Courses
GET /api/courses
GET /api/courses/:slug
POST /api/courses
PATCH /api/courses/:id
DELETE /api/courses/:id

## Enrollments
POST /api/enroll
GET /api/my-courses

## Payments
POST /api/payments/create-order
POST /api/payments/verify
GET /api/payments/history

## Blogs
GET /api/blogs
GET /api/blogs/:slug
POST /api/blogs

## Placements
GET /api/placements
POST /api/placements

## Study Abroad
GET /api/study-abroad
GET /api/universities
POST /api/apply

## Leads
POST /api/leads
GET /api/admin/leads
PATCH /api/admin/leads/:id

## AI
POST /api/ai/career-path
POST /api/ai/resume-analysis
POST /api/ai/mock-interview
POST /api/ai/skill-gap

## Dashboard
GET /api/dashboard/student
GET /api/dashboard/admin
