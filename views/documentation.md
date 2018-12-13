# Table of contents
1. [Getting started](#start)
3. [endpoints](#endpoints)
4. [auth endpoint](##auth)
5. [companies endpoint](#companies)
6. [employees endpoint](#employees)

## Getting started
Control API is structured in a way where anyone that isn't authenticated with our application shouldn't be able to interact with our API. 
In order to get authenticated with our API, make a post request to the `/auth` with a body containing your desired username and password.
Throughout the rest of this documentation, I will be using `curl`, a command line tool for making requests, to interact with my API.
With that in mind, this is how we'd make the request to our server to get authenticated:
```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"username":"xyz","password":"xyz"}' \
 http://localhost:3000/auth
```
control api will then respond with a success message confirming the creation of your account and an authorization token containing the information needed
to interact with our api. You're now ready to interact with control API.

## endpoints
Listed below are the endpoints that users are able to interact with and what their purpose is:
* `/auth` - provide authentication mechanisms for the user
* `/api/v1/companies` - provide endpoints to CRUD business resources
* `/api/v1/companies/:companyName/employees` - provide endpoints to CRUD employees that belong to a specific company (companyName)

## auth
The `/auth` endpoint provides an interface for users to authenticate into and out of our API. Here are the available http methods:
* `POST /auth` - create a user account within our api and return a token for interacting with the rest of our API
    ### Request
    ```
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"username":"xyz","password":"xyz"}' \
     http://control.cenz.io/auth
    ```
    ### Accepted json fields
    
    | me          | Type   | Example value       | Required |
    |-------------|--------|---------------------|----------|
    | username    | String | "cenz"              | true     |
    | password    | String | "Secure password"   | true     |
    | description | String | "Software engineer" | false    |

    ### Response
    Alongside a cookie, a json response will also be included:
    ```json
    { success: 'You have a successfully created a user' }
    ```

* `PUT /auth` - login into a user account that has already been created and return a token for interacting with the rest of our API
    ### Request
    ```
    curl --header "Content-Type: application/json" \
    --request PUT \
    --data '{"username":"xyz","password":"xyz"}' \
     http://control.cenz.io/auth
    ```
    ### Accepted json fields 

    | me          | Type   | Example value       | Required |
    |-------------|--------|---------------------|----------|
    | username    | String | "cenz"              | true     |
    | password    | String | "Secure password"   | true     |

    ### Response
    Alongside a cookie, a json response will also be included:
    ```json
    { success: 'You have successfully signed into your account' }
    ```
* `DELETE /auth` - logout of your the currently signed in user. Will clear the cookie used for authentication.
    ### Request
    ```
    curl --request DELETE http://control.cenz.io/auth
    ```

    ### Response
    The cookie is cleared from your user, and a json response is sent back:
    ```json
    { success: 'Successfully signed out and removed the users auth token'}
    ```

## Companies
The `/api/v1/companies` endpoint provides an interface for operations that deal with CRUD functionality for our Company model.
* `GET /api/v1/companies` - Gets a list of all companies currently registered within our API
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \
    --request GET \
    http://control.cenz.io/api/v1/companies
    ```

    ### Response
    ```json
    { companies: [
        {
            name: 'google',
            verified: true,
            description: 'We all know about google',
            employees: [(List of employees that work for google)]
        },
    ]}
    ```
* `GET /api/v1/companies/:companyName` - Get a single company by providing the name through the url
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \
    --request GET \
    http://control.cenz.io/api/v1/companies/google
    ```
    ### Response
    ```json
    { company: {
            name: 'google',
            verified: true,
            description: 'We all know about google',
            employees: [(List of employees that work for google)]
        }
     
    }
    ```
* `POST /api/v1/companies` - Create a single company
    ### Request
    ```
    curl --cookie "controlAuth=yes" \
    --request POST \
    --data '{"name": "facebook", "description": "Social media platform" }'
    http://control.cenz.io/api/v1/companies
    ```

    ### Accepted json fields

    | Field name  | Type   | Example value           | Required |
    |-------------|--------|-------------------------|----------|
    | name        | String | "facebook"              | true     |
    | description | String | "Social media platform" | true     |
    
    ### Response
    
    ```json
    { 
        company: {
            name: 'facebook',
            verified: 'false',
            description: 'Social media platform',
            employees: [(empty list)]
        }
    }
    ```
* `PUT /api/v1/companies/:companyName` - Update a single company
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \ 
    --request PUT \ 
    --data '{"name": "Facebook"}' \ 
    http://control.cenz.io/api/v1/companies/facebook
    ```

    ### Accepted json fields
    | Field name  | Type   | Example value           | Required |
    |-------------|--------|-------------------------|----------|
    | name        | String | "facebook"              | true     |
    | description | String | "Social media platform" | true     |

    ### Response
    ```json
    { 
        company: {
            name: 'Facebook',
            verified: false,
            description: 'Social media platform',
            employees: [(Empty list)]
        }
    }
    ```
* `DELETE /api/v1/companies/:companyName` Delete a single company
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \
    --request DELETE \
    http://control.cenz.io/api/v1/companies/Facebook
    ```
    
    ### Response
    ```json
    {
        company: {
            name: 'Facebook',
            verified: false,
            description: 'Social media platform',
            employees: [(Empty list)]
        }
    }
    ```
## Employees
The `/api/v1/companies/:companyName/employees` endpoint provides an interface for CRUD functionality on employees that belong to a specific company
* `GET /api/v1/companies/:companyName/employees` - Get all the employees that belong to a company
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \ 
    --request GET \
    http://control.cenz.io/api/v1/companies/google/employees
    ```

    ### Response
    ```json
    {
        employees: [
            {
                name: 'Severiano',
                position: 'Software engineer',
                email: 'seve@google.com',
                employeeId: 666,
                employedAt: {Company object}
            }
        ]
    }
    ```
* `GET /api/v1/companies/:companyName/employees/:employeeId` - Get a single employee from a company
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \
    --request GET \
    http://control.cenz.io/api/v1/companies/google/employees/666
    ```

    ### Response
    ```json
    {
        employee: {
            name: 'Severiano',
            position: 'Software engineer',
            email: 'seve@google.com',
            employeeId: 666,
            employedAt: {Company object}
        }
    }
    ```
* `POST /api/v1/companies/:companyName/employees` - Create an employee
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \
    --request POST \
    --data '{"name": "Tim", "position": "Software engineer", "email": "tim@google.com"}' \
    http://control.cenz.io/api/v1/companies/google/employees
    ```

    ### Accepted json fields

    | Field name | Type   | Example value   | Required |
    |------------|--------|-----------------|----------|
    | name       | String | "Tim"           | true     |
    | position   | String | "Engineer"      | true     |
    | email      | String | "tim@kaing.com" | true     |

    ### Response
    ```json
    {
        employee: {
            name: 'Tim',
            position: 'Software Engineer',
            email: "tim@google.com",
            employeeId: 666,
            employedAt: {Company Object}
        }
    }
    ```
* `PUT /api/v1/companies/:companyName/employees/:employeeId` - Update a single employee
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \
    --request PUT \
    --data '{"name": "Timothy", "position": "Software engineer", "email": "tim@google.com"}' \
    http://control.cenz.io/api/v1/companies/google/employees/666
    ```
    ### Accepted json fields
    
    | Field name | Type   | Example value   | Required |
    |------------|--------|-----------------|----------|
    | name       | String | "Tim"           | true     |
    | position   | String | "Engineer"      | true     |
    | email      | String | "tim@kaing.com" | true     |

    ### Response
    ```json
    {
        employee: {
            name: 'Tim',
            position: 'Software Engineer',
            email: "tim@google.com",
            employeeId: 666,
            employedAt: {Company Object}
        }
    }
    ```
* `DELETE /api/v1/companies/:companyName/employees/:employeeId` - Delete a single employee
    ### Request
    ```
    curl --cookie "controlAuth=Yes" \
    --request DELETE \
    http://control.cenz.io/api/v1/companies/google/employees/666
    ```

    ### Response
    ```json
    {
        employee: {
            name: 'Tim',
            position: 'Software Engineer',
            email: "tim@google.com",
            employeeId: 666,
            employedAt: {Company Object}
        }
    }
    ```
