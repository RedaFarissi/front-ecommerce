# E-Commerce Backend API

A full-featured e-commerce backend built with Django and Django REST Framework. This project provides RESTful APIs for product management, shopping cart operations, order processing, and payment integration.

## Features

* Product management
* Shopping cart functionality
* Order management
* Payment processing
* RESTful API architecture
* Media upload support
* Docker support
* Frontend integration with React
* SQLite database (development)

## Tech Stack

* Python
* Django
* Django REST Framework
* SQLite
* Docker
* REST API

## Project Structure

```text
cart/          -> Shopping cart management
order/         -> Order processing
payment/       -> Payment management
produit/       -> Product management
media/         -> Uploaded files
```

## Installation

### Clone Repository

```bash
git clone https://github.com/RedaFarissi/back-ecommerce.git
cd back-ecommerce
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

Linux / Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Migrations

```bash
python manage.py migrate
```

### Start Server

```bash
python manage.py runserver
```

Server:

```text
http://127.0.0.1:8000/
```

## Docker

```bash
docker-compose up --build
```

## Frontend Repository

https://github.com/RedaFarissi/front-ecommerce

## Screenshots

Add screenshots of:

* API endpoints
* Admin dashboard
* Product management
* Orders
* Cart operations

## Author

Reda Eskouni
