# CarCar

Team:

* Gio Medina - service
* Matthew Oshimo - sales

## Design

## Bounded-Contexts:
    Inventory Microservice: 
        -Automobiles (Entity)
            -color
            -vin
            -year
            -sold
            -returning
            -model

        -Vehicles (Value Object)
            -name
            -pic

        -Manufacturers (Value Object)
            -name
-------------------------------------------
    Service Microservice: Uses polling to grab from inventory 
        - Technician(Entity)
            -name
            -employee number

        - Service Appointments(aggregate)
            -vin
            -owner
            -date
            -technician
            -reason

        - Appointments List(aggregate)
            -vin
            -owner
            -date
            -auto
            -technician 
            -reason

        - Service History(aggregate)
            -vin
            -owner
            -date
            -technician 
            -reason

---------------------------------------------
    Sales Microservice:Uses polling to grab from inventory 
        - Sales Person (Entity)
            - name
            - employee number

        - Potential Customer(Entity)
            - name
            - address
            - id
            - phone number

        - Sales Record(value Object)
            -automobile
            -sales person
            -customer
            -price

        - List All Sales(bounded context)
            - sales Record
            - sales person
            - employee number
            - purchaser/customer
            - automobile
            - price

        - Sales Person History (aggregate)
            - sales person
            - customer
            - vin/automobile
            - price of sale
----------------------------------

## General Relationships

Technician, service/service history, and appointments are connected:
- one technician can have multiple appointments with multiple services 
- one appointment can be associated with one technician 
- a service can be associated with a technician 
- a technician can have multiple appointments with different automobiles 

Automobile and service history are connected:
- one auto can have multiple services 
- service history can only be associated with one automobile

Automobile and appointments are connected:
- one automobile can have many appointments 
- an appointment can only be associated with one automobile 
- one auto can have multiple services done previously 

Manufacturer and Vehicle are connected:
- each vehicle has one manufacturer.
- each manufacturer can be associated with many vehicles.

Automobiles and vehicles connection:
- an automobile is only associated with one vehicle.
- a vehicle can be associated with many automobiles.

customer and automobile should, theoretically, be connected with each other.
- a customer can purchase multiple automobiles.
- a automobile can only be associated with one customer.
 
Sales person and sales should have a connection with each other.
- One sales person can be a part of multiple sales.
- a sale can only be associated with one sales person.

Pollers:
- allow for connection between both sales and service microservices to inventory microservice.

## Service microservice


Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Utilize polling to pull automobile inventory from inventory microservice. 
- get automobileVO model from sales_rest.models.py
  - grab vin from automobile objects.

All models need some kind of association with Navbar

Need to create salesPerson model.
- name
- employee number
    - make each one unique

create potential customer model.
- name
- address
- phone number
- id (automatically created)

create automobileVO model:
- true or false if sold
    - ended up modifying the original automobile model in the inventory app.
- get automobile id
    - addendum-don't actually need ID since vin has to be unique, was getting postgress error messages from having id
- get automobile vin

create a sales model
  - price of sale
    - make it a float so it includes cents
  - one to one relationship with automobile
  - many to one relationship with customer
  - many to one relationship with salesPerson

Views.py:
- create encoder for each model.
- sales encoder includes code to get specific customer, automobileVO, and Salesperson.
  - include customer, automobile, and Salesperson encoders.
    - customer: let customer ID be input into sales.
    - Saleperson: let employee number be input into sales.
    - automobileVO: let vin be input into sales

- set up sales list and sales delete functions.
    - sales list do GET and POST 
    - delete do DELETE, PUT, and GET for individual sales
        - include delete for future testing.
    - include automobileVO, customer, and sales person encoders as part of sales encoder.
- customer, sales person, and automobileVO more straight forward.
    - make PUT, GET, POST, DELETE for each so can test in Insomnia
    - include ID variable in customer encoder so customer ID can be retrieved.
    - mainly use ["DELETE","POST","GET"] for delete functionality, so name function after delete function


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
    - input for name, address, and phone number
      - make sure it sends right format as input

- sales person form:
    - don't need to pull from other objects.
    - input for name and employee number
      - make sure it sends right format as input


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
- cancel delete button works but you need to refresh webpage 
  - recently utilized componentDidUpdate function to get it to refresh information, but causes terminal to repeatedly print GET messages.

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
-service list(get , post, delete)


Forms/lists:
-appointmentList
    -added cancel and finished buttons 
    - http://localhost:8080/api/appointments/
-service form
    - added date and time as same input 
-service history
    - search history using vin input 
-technician form
    -from http://localhost:8080/api/technician/
