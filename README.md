# CarCar

Team:

* Gio Medina - service
* Matthew Oshimo - sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Utilize polling to pull automobile inventory from inventory microservice. 

All models need some kind of association with Navbar

Need to create salesPerson model.
- name
- employee number
    - make each one unique

create potential customer model.
- name
- address
- phone number

create automobileVO model:
- true or false if sold
    - ended up modifying the original automobile model in the inventory app.
- get automobile id
    - addendum-don't actually need ID since vin has to be unique, was getting postgress error messages from having id
- get automobile vin

create a sales model
  - price of sale
  - one to one relationship with automobile
  - one to many relationship with customer
  - one to many relationship with salesPerson

Views.py:
- create encoder for each model.
- set up sales list and sales delete functions.
    - sales list do GET and POST 
    - delete do DELETE, PUT, and GET for individual sales
        - include delete for future testing.
    - include automobileVO, customer, and sales person encoders as part sales encoder.
- customer, sales person, and automobileVO more straight forward.
    - make PUT, GET, POST, DELETE for each so can test in Insomnia

Forms/lists:
- Sales Person sale history:
    - filter sales list based on employee number of currently selected sales person.
        - utilize this.state to get employeeNumber
- Automobile list:
    - pull from http://localhost:8100/api/automobiles/
- Sales form:
    - filter automobiles to select from based on if sold is set to true or false.
      - use .filter() to check
        - use "put" command to set sold variable of selected automobile to true once sales form is submitted.
    - get sales person objects.
        - pull from http://localhost:8090/api/salesPerson/
            - use employee number as key
    - get customer objects.
        - pull from http://localhost:8090/api/customers/
            - use customer id as key
    - get automobile objects.
        - pull from http://localhost:8100/api/automobiles/
            - use VIN as key

- customer form:
    - don't need to pull from other objects.
- sales person form:
    - don't need to pull from other objects. 

might want to create separate page with all sales-based links so Nav bar isn't so cluttered.
  - implemented dropdown menu with with all sales related information using bootstrap.

## Service Microservice

Use polling to retrieve inventory from inventory mircroservice 

Technician Model
- name 
- employee number (unique=true)

Service Appointment(added to navbar dropdown Services)
- Appointment model
- vin
- owner
- date brought in 
- time brought in
- reason
(saves form)

List of appointments(added to navbar as dropdown(services))
-vin 
-customer name(owner)
- date
- time 
- technician 
- reason
- returning (VIP)

service history(navbar service dropdown)
-vin
- customer name(owner)
-date 
- time
-technician 
-reason

service views
-encoders
   - automobile
   - technician 
   -service
   -appointment 
   