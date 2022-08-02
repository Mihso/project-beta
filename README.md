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
-name
-employee number


create potential customer model.
- name
- address
- phone number


create automobileVO model:
-true or false if sold
-get automobile id
-get automobile vin

create a sales model
    - price of sale
    -one to one relationship with automobile
    - -one to many relationship with sales model
    - -one to many relationship with sales model.