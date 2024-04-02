# Navigo task

> This task should be able to test the candidate's ability to create simple React components, but also the ability to think about the problem in plain javascript. It is based on a simple implementation of the principles that are used on the frontend of the software [Navigo](https://navigo3.com/).


## API
> Do not realy care about implementation of API in this project. It is just a simple fake implementation of creating async requests.

## Stores
> Store is a class that helps developer to work with specific API in specific part of application.

>  In [Navigo](https://navigo3.com/) we have *Store* called *FormStore* which is initialized with a method named as 'some-api-topic/get' to retrieve existing data or 'some-api-topic/default' to get new data, the data is used to populate the form. After the FormStore is initialized, it needs an API method to store the data. We name them 'some-api-topic/upsert'. With this information, FormStore can handle any form you can think of.