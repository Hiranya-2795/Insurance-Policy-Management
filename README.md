InsurancePolicyManagement
==================================

An online application to manage insurance policies for both Life and Non-Life insurance products. The system allows customers to manage their policy information and enables administrators to add new policies.

Features
--------

Customer Features:
- Login with token-based authentication (JWT)
- Search policies by:
  - Policy ID
  - Policy Type
  - Premium Frequency
- View policy details
- Edit personal details (phone, email, address)

Admin Features:
- Login with admin credentials
- Add new policy
- Edit the existing Policies
- View Statistics

Analytics:
- A dashboard view of the number of policies sold based on the type of policy and premium frequency via bar graph

Tech Stack
----------

| Layer              | Technology Used                  |
|-------------------|----------------------------------|
| Frontend          | Angular                          |
| Backend API       | ASP.NET Core Web API             |
| Database          | Microsoft SQL Server             |
| Authentication    | JWT (Token-Based Authentication) |

Modules
-------

Backend (ASP.NET Core):
- Authentication Module: Login and JWT Token generation
- Policy Management Module: CRUD operations on policies and customer details
- Security Module: Role-based access control for customer and admin

Frontend (Angular):
- login Component
- register Component
- admin-dashboard Component
- customer-dashboard Component
- add-policy Component
- edit-policy Component
- view-policy Component
- search-policy Component
- edit-profile Component
- statistics Component


Setup Instructions
------------------

Backend (ASP.NET Core):
1. Create a new ASP.NET Core Web API project.
2. Configure Entity Framework Core with SQL Server.
3. Set up models and DbContext with appropriate constraints.
4. Create REST controllers for:
   - Authentication
   - Policy management
5. Implement JWT-based authentication.
6. Apply role-based authorization.

Frontend (Angular):
1. Create a new Angular project using `ng new`.
2. Generate required components and services.
3. Use Angular services to interact with the REST API.
4. Store and use JWT tokens for all API requests.
5. Use Angular Charts for data visualization of policy sales.

Testing
-------

- Backend API endpoints tested via Swagger with JWT tokens.

Security
--------

- JWT-based authentication
- Role-based authorization (Customer vs Admin)
- Secure storage of JWT tokens
