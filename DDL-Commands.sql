- UserProfile Table

CREATE TABLE dbo.UserProfile (
    UserID INT IDENTITY(1,1) NOT NULL,
    FullName NVARCHAR(200) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender NVARCHAR(20) NOT NULL,
    PhoneNumber CHAR(10) NOT NULL,
    Email NVARCHAR(200) NOT NULL,
    AadharNumber CHAR(12) NOT NULL,
    PasswordHash NVARCHAR(510) NULL,
    Role NVARCHAR(20) NOT NULL,
    Password NVARCHAR(100) NULL,

    CONSTRAINT PK_UserProfile PRIMARY KEY CLUSTERED (UserID),

    -- Unique constraints to ensure no duplicates
    CONSTRAINT UQ_UserProfile_Email UNIQUE (Email),
    CONSTRAINT UQ_UserProfile_Phone UNIQUE (PhoneNumber),
    CONSTRAINT UQ_UserProfile_Aadhar UNIQUE (AadharNumber)
);

- Policy Table

CREATE TABLE dbo.Policy (
    PolicyID NVARCHAR(100) NOT NULL,
    PolicyType NVARCHAR(100) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    PolicyTerm INT NOT NULL,
    CoverageAmount DECIMAL(18, 2) NOT NULL,
    PremiumAmount DECIMAL(18, 2) NOT NULL,
    PremiumFrequency NVARCHAR(100) NOT NULL,

    CONSTRAINT PK_Policy PRIMARY KEY CLUSTERED (PolicyID),

    CONSTRAINT CK_Policy_PremiumFrequency CHECK (
        PremiumFrequency IN ('Annually', 'Quarterly', 'Monthly')
    ),

    CONSTRAINT CK_Policy_PolicyTerm CHECK (
        PolicyTerm >= 1 AND PolicyTerm <= 70
    ),

    CONSTRAINT CK_Policy_PolicyType CHECK (
        LOWER(PolicyType) IN ('home', 'car', 'health', 'life', 'travel', 'business', 'device', 'bike')
    )
);

- UserPolicy Table

CREATE TABLE dbo.UserPolicy (
    UserID INT NOT NULL,
    PolicyID NVARCHAR(100) NOT NULL,
    BeneficiaryName NVARCHAR(200) NULL,

    CONSTRAINT PK_UserPolicy PRIMARY KEY CLUSTERED (UserID, PolicyID),

    CONSTRAINT FK_UserPolicy_User FOREIGN KEY (UserID)
        REFERENCES dbo.UserProfile(UserID),

    CONSTRAINT FK_UserPolicy_Policy FOREIGN KEY (PolicyID)
        REFERENCES dbo.Policy(PolicyID)
);
