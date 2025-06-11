# 💡 Learnings from Insurance Policy Management Website Development

---

## 🚀 Project Overview

This project involved building a full-stack **Insurance Policy Management System** that enables both customers and administrators to interact with insurance policy data online. The platform supports management of Life and Non-Life insurance products, offering features such as policy search, customer data updates, and policy creation with appropriate role-based access control.

---

## 💻 Technical Learnings

### 1. Angular Frontend Development

We used **Angular** to create a dynamic and responsive user interface. Key learnings include:

* **Component-based Architecture:** Created reusable and modular components such as:
    * `home`
    * `add-policy`
    * `admin-dashboard`
    * `admin-profile`
    * `customer-dashboard`
    * `edit-policy`
    * `edit-profile`
    * `explore-policies`
    * `Login`
    * `Register`
    * `search-policy`
    * `Statistics`
    * `view-policy`
    * `Spinner`
    * `Cart`

* **`home` Component**
    * **Role:** Public/User Access
    * **Purpose:** Acts as the landing page for the Insurance Policy Management System, providing introductory information and navigation options.
    * **Key Features:**
        * Displays a welcoming banner and overview of the system’s purpose and benefits.
        * Includes responsive layout with navigation links to login, register, and other core components.
        * Serves as the first point of contact for users visiting the platform, offering clean UI and clear call-to-action buttons.
        * Designed to be accessible to both authenticated and unauthenticated users.
        * Helps route users to appropriate roles (Admin/User) based on their login credentials.

* **`add-policy` Component**
    * **Role:** Admin
    * **Purpose:** Allows administrators to add a new insurance policy into the system.
    * **Key Features:**
        * Displays a form for policy details: ID, type, start & end dates, term, coverage amount, premium, and payment frequency.
        * Validates form inputs with both frontend checks (e.g., required fields, numeric limits) and user-friendly error messages.
        * On successful submission, it sends the data to the backend using `PolicyService.addPolicy()` and redirects to the admin dashboard.

* **`admin-dashboard` Component**
    * **Role:** Admin
    * **Purpose:** Acts as the homepage for admin users, providing quick access to policies and administrative actions.
    * **Key Features:**
        * Displays a search bar to filter policies by Policy ID, Type, or Premium Frequency.
        * Fetches all policies using `PolicyService.getPolicies()` on component initialization.
        * Displays policy data in a table including term, coverage, and payment frequency.
        * Includes buttons for:
            * Viewing full policy details.
            * Editing a policy (navigates to `edit-policy`).
            * Adding a new policy (navigates to `add-policy`).
            * Registering another admin.
            * Statistics.

* **`customer-dashboard` Component**
    * **Role:** Customer
    * **Purpose:** Serves as the main dashboard for customers to manage and explore their policies.
    * **Key Features:**
        * Fetches the list of policies owned by the logged-in customer using `UserService.getPoliciesByUserId()`.
        * Allows real-time search by policy ID, type, premium frequency.
        * Displays a policy table showing:
            * Policy ID
            * Type
            * Coverage amount
            * Payment frequency
            * Beneficiary name
        * Each policy has a **View** button linking to `view-policy`.
        * Includes a button to **Edit Profile**, **Explore Policies** and a **Logout** button for session termination.

* **`edit-policy` Component**
    * **Role:** Admin
    * **Purpose:** Allows admin to update details associated with a specific policy.
    * **Key Features:**
        * Retrieves policy details using the PolicyID from the route.
        * Uses `PolicyService` to fetch and update data.
        * Provides success/error feedback after the update.
        * Includes navigation controls to go back to the dashboard or logout.

* **`edit-profile` Component**
    * **Role:** Customer
    * **Purpose:** Lets the logged-in user (admin or customer) update their own profile information.
    * **Key Features:**
        * Fetches the current user's profile details via a service like `UserService.getCurrentUser()`.
        * Editable fields might include:
            * Full name
            * Phone number
            * Email
            * Date of birth
            * Gender
            * Aadhar number
            * Password
        * Prevents editing of secure fields like password, role, or Aadhar number.
        * Uses `ngModel` for two-way binding and Angular forms for validation.
        * On submission, sends an update request to the backend.
        * Displays success/error messages.
        * **Security:** Only the currently logged-in user can update their own profile. No impersonation is allowed.

* **`login` Component**
    * **Role:** All users and Admin
    * **Purpose:** Authenticates users, admins and provides access to their respective dashboards.
    * **Key Features:**
        * Displays a form to input:
            * Email
            * Password
            * Role
        * Validates credentials on the client and admin-side.
        * Sends credentials to the backend using an authentication service (`AuthService`).
        * On successful login:
            * Stores JWT token in local storage/session.
            * Redirects to either the `admin-dashboard` or `customer-dashboard` based on their role.
        * Displays error messages for invalid login attempts.
        * **Security:** The JWT token is used for all subsequent authorized requests to the backend API.

* **`register` Component**
    * **Role:** Public (Unregistered users)
    * **Purpose:** Allows new users to create an account.
    * **Key Features:**
        * Presents a form to collect personal and login information:
            * Full Name, Date of Birth, Gender
            * Phone Number, Email, Aadhar Number
            * Password (with strength validation)
            * Role (User/Admin)
        * Enforces form validation using Angular built-in patterns:
            * Aadhar: 12 digits
            * Phone: 10 digits
            * Password: 8–20 chars with uppercase, number, special character
        * On submission:
            * Sends a POST request to `/api/Auth/register`
            * Displays success or error messages
            * Redirects to the login page upon successful registration

* **`search-policy` Component**
    * **Role:** Customer and Admin
    * **Purpose:** Intended to provide search functionality for filtering policies based on different criteria.
    * **Key Features:**
        * Search based on Policy Id, Policy Type, Premium Frequency

* **`statistics` Component**
    * **Role:** Admin
    * **Purpose:** Displays graphical and numerical insights about the policy system.
    * **Key Features:**
        * Fetches statistics from `/api/AdminStatistics`:
            * Total registered customers (excluding admins)
            * Total policies in the system
            * Active policies owned by users
            * Policy Type Distribution (e.g., Life, Health, Car)
            * Premium Frequency Distribution (e.g., Monthly, Annually)
        * Uses **Chart.js** to render:
            * A bar chart for policy types
            * A bar chart for premium frequencies
        * Provides navigation buttons (Back, Logout)

* **`view-policy` Component**
    * **Role:** Customer and Admin
    * **Purpose:** Allows a user to view complete details of a specific policy.
    * **Key Features:**
        * Retrieves a policy by its ID (from the route) using `PolicyService.getPolicyById()`
        * Displays details in two sections:
            * Policy Information: ID, type, start/end date, term
            * Coverage Info: coverage amount, premium, frequency
        * **Note:** This is a read-only component for viewing policy details — editing is not allowed here.

* **`Spinner` Component**
    * **Role:** Shared UI Component
    * **Purpose:** The Spinner component is a reusable UI element designed to display a loading animation while asynchronous operations (such as API calls) are in progress. It enhances the user experience by visually indicating that the system is processing or fetching data.

* **`cart` Component**
    * **Role:** User
    * **Purpose:** Allows users to review policies added to their cart, remove unwanted items, and finalize policy purchase by assigning a beneficiary.
    * **Key Features:**
        * Displays a table of selected policies in the user's cart with key details: Policy ID, Type, Coverage Amount, and Premium Frequency.
        * Provides **Remove** button to delete policies from the cart using `CartService.removeFromCart()`.
        * Includes an "**Add Policy**" button for each policy, which opens a modal for entering the beneficiary name.
        * Uses a **modal overlay** to securely collect beneficiary name input before finalizing a policy.
        * On submission, sends data to the backend via `UserPolicyService.addUserPolicy()` and updates the cart accordingly.
        * Provides user feedback using **ngx-toastr** for success, error, or info messages.
        * Displays a dynamic message and navigation option if the cart is empty.
        * Includes a **Back** button to return to the Explore Policies page.
        * All interactions (add/remove) are disabled while in progress to avoid duplicate actions.

* **Service Integration:** Developed dedicated Angular services for authentication (`AuthService`) and data operations (`PolicyService`, `CustomerService`), enabling smooth communication with the backend API.
* **Routing and Navigation:** Implemented Angular Routing and route guards to restrict access to certain routes based on user roles.
* **Form Handling:** Used Reactive Forms to handle input validation and two-way binding.
* **Charts Integration:** Visualized policy sales data using bar/line charts with libraries like `ngx-charts` or `Chart.js`.

---

### 2. ASP.NET Core Web API Development

We developed the backend using **ASP.NET Core Web API**. Learnings include:

* **RESTful API Design:** Built REST endpoints for managing policies and customer records using controller-action pattern. Included the following Controllers:
    * `AdminStatisticsController.cs`
    * `AuthController.cs`
    * `PolicyController.cs`
    * `UserPolicyController.cs`
    * `UserProfileController.cs`

* **`AdminStatistics` Controller**
    * **Purpose:** Provides aggregated statistical data for admin dashboard.
    * **Key Features:**
        * Fetches:
            * Total number of users (excluding admins)
            * Total policies in the system
            * Count of active user policies
        * Generates:
            * Distribution of policy types
            * Distribution of premium frequencies
        * Returns all metrics in a structured response for admin analysis.

* **`Auth` Controller**
    * **Purpose:** Handles user registration and login functionality.
    * **Key Features:**
        * **POST `/register`:**
            * Registers users or admins
            * Validates role (User/Admin), uniqueness of email
        * **POST `/login`:**
            * Validates credentials
            * Issues JWT token with role-based claims
            * Returns token for client-side session management

* **`Policy` Controller**
    * **Purpose:** Manages all available insurance policies in the system.
    * **Key Features:**
        * **GET `/`:** Lists all policies
        * **GET `/{id}`:** Fetches a specific policy
        * **POST `/`:** Creates a new policy
        * **PUT `/{id}`:** Updates a policy
        * **DELETE `/{id}`:** Deletes a policy

* **`UserPolicyController`**
    * **Purpose:** Manages policy-related actions for users, such as viewing and managing their insurance policies.
    * **Key Features:**
        * Provides endpoints to view all policies assigned to a user.
        * Allows users to add or remove policies.
        * Validates policy data before processing.
        * Calls service layer for policy-related business logic.
        * Sends structured HTTP responses for success and failure scenarios.

* **`UserProfileController`**
    * **Purpose:** Manages user profile information, including viewing and editing profile details.
    * **Key Features:**
        * Offers endpoints to retrieve the user’s profile information.
        * Allows users to update personal details (like address, phone, etc.).
        * Handles client-side and server-side validation for profile data.
        * Interacts with the user service to perform CRUD operations.
        * Provides clear HTTP responses for profile update success or error states.

* **Entity Framework Core:** Used EF Core for database access and object-relational mapping. Leveraged LINQ for querying and data filtering.
* **Repository Pattern:** Implemented a clean architecture with service and repository layers to separate concerns and improve maintainability.

---

### 3. Authentication & Authorization

Security was a crucial part of the application. Key learnings:

* **JWT Authentication:** Implemented token-based authentication using **JSON Web Tokens (JWT)**. Secured backend endpoints and ensured only authenticated users could access them.
* **Role-Based Access Control (RBAC):** Distinguished between "Admin" and "Customer" roles. Restricted access to policy creation functionality to Admin users only.

---

### 4. SQL Server Database Design

We designed a well-structured, normalized relational database in **SQL Server** to store and manage user profiles, policies, and their relationships efficiently. The schema supports integrity, scalability, and optimized access to data.

* **Tables Created:**
    * **`UserProfile`:** Stores user details such as name, contact information, Aadhar number, login credentials, and user roles (e.g., Admin or Customer).
    * **`Policy`:** Stores insurance policy details including type, term, coverage, premium details, and applicable constraints.
    * **`UserPolicy`:** Represents the many-to-many relationship between users and policies, including optional beneficiary information.

* **Constraints Used:**
    * **Primary Keys:**
        * `UserID` in `UserProfile`
        * `PolicyID` in `Policy`
        * Composite key of `UserID` and `PolicyID` in `UserPolicy`
    * **Foreign Keys:**
        * `UserPolicy.UserID` → `UserProfile.UserID`
        * `UserPolicy.PolicyID` → `Policy.PolicyID`
    * **Unique Constraints in `UserProfile`:**
        * `Email` (`UQ_UserProfile_Email`)
        * `Phone Number` (`UQ_UserProfile_Phone`)
        * `Aadhar Number` (`UQ_UserProfile_Aadhar`)
    * **Check Constraints in `Policy`:**
        * `PremiumFrequency` must be one of 'Annually', 'Quarterly', or 'Monthly'.
        * `PolicyTerm` must be between 1 and 70.
        * `PolicyType` must be one of 'home', 'car', 'health', 'life', 'travel', 'business', 'device', 'bike'.
    These constraints ensure data validity and prevent duplication while enforcing business rules.

* **Search Optimization:** The database was designed to support efficient policy search and filtering, including:
    * Searching by Policy ID, Policy Type, or Premium Frequency
    * Optimized use of indexes via primary keys and foreign keys to speed up joins and lookups
    * Structured to support further analytical queries like aggregating policy sales by month, type, or user

---

## 🛑 Challenges

* JWT integration with Angular
* Handling unauthorized access to components
* Managing component state and refreshing data after updates
* Designing a scalable database schema
* Keeping the UI responsive and user-friendly

---

## ✅ Resolutions

* Created an `AuthService` to manage tokens and appended tokens in HTTP request headers.
* Used Angular route guards and backend role checks to restrict unauthorized access.
* Used RxJS observables and Angular's `ngOnInit` lifecycle hook for data reloading.
* Followed normalization rules and used foreign keys for relational integrity.
* Applied Angular Material and responsive design principles for smooth UX.

---

## 🤝 Version Control with Git & GitHub

To manage source code effectively, we used **Git** for version control and **GitHub** for collaboration. This enabled our team to track changes, collaborate efficiently, and maintain a clean project history.

* **Common Git Commands Used**

    ```bash
    # Stage all changes for commit
    git add .

    # Commit changes with a meaningful message
    git commit -m " "

    # Push commits to the remote GitHub repository
    git push

    # Clone the repository to local system
    git clone [https://github.com/Hiranya-2795/Insurance-Policy-Management.git](https://github.com/Hiranya-2795/Insurance-Policy-Management.git)
    git clone -b Hiranya --single-branch https://github.com/Hiranya-2795/Insurance-Policy-Management.git 
    ```

* **Key Learnings from Git Usage**
    * Understood the **commit-push workflow** and how it integrates with remote repositories.
    * Learned to manage code changes using `git add`, `commit`, and `push`.
    * Experienced using branches for feature development and resolving merge conflicts.
    * Used GitHub for issue tracking, collaboration, and code review.

This helped ensure smooth team coordination, traceability of features, and easy rollback when required.
