# Symfony form error response javascript parser

This library provides a simple solution for analyzing symfony form error responses.
Thanks to this you can easily display errors in the form, etc.

## Instalation

```bash
$ npm install symfony-js-form-parser
```

## Example

With this library you can easily convert this type of json:
```json 
{
  "code": 400,
  "message": "Validation Failed",
  "errors": {
    "children": {
      "comment": {},
      "customer": {
        "errors": [
          "This value is not valid."
        ]
      },
      "return_address": {
        "children": {
          "postal_code": {},
          "street": {},
          "town": {},
          "type": {},
          "name": {},
          "first_name": {},
          "last_name": {},
          "email": {},
          "phone_number": {},
          "customer": {},
          "country": {}
        }
      },
      "order_items": {
        "errors": [
          "This value is not valid."
        ]
      },
      "status": {},
      "parcels": {}
    }
  }
}
```

to this:

```json
{
  "errors": [],
  "code": 400,
  "message": "Validation Failed",
  "nodes": {
    "comment": [],
    "customer": ["This value is not valid."],
    "return_address.postal_code": [],
    "return_address.street": [],
    "return_address.town": [],
    "return_address.type": [],
    "return_address.name": [],
    "return_address.first_name": [],
    "return_address.last_name": [],
    "return_address.email": [],
    "return_address.phone_number": [],
    "return_address.customer": [],
    "return_address.country": [],
    "return_address": [],
    "order_items": ["This value is not valid."],
    "status": [],
    "parcels": []
  }
}
```

or this:
```json
{
  "code": 400,
  "message": "Validation Failed",
  "error": null,
  "nodes": {
    "comment": null,
    "customer": "This value is not valid.",
    "return_address.postal_code": null,
    "return_address.street": null,
    "return_address.town": null,
    "return_address.type": null,
    "return_address.name": null,
    "return_address.first_name": null,
    "return_address.last_name": null,
    "return_address.email": null,
    "return_address.phone_number": null,
    "return_address.customer": null,
    "return_address.country": null,
    "return_address": null,
    "order_items": "This value is not valid.",
    "status": null,
    "parcels": null
  }
}
```

## Usage
```typescript
import {ErrorResponse} from 'symfony-js-form-parser'

let simpleResponse = {
    "code": 400,
    "message": "Validation Failed",
    "errors": {
        "children": {
            "comment": {},
            "customer": {
                "errors": [
                    "This value is not valid."
                ]
            },
            "return_address": {
                "children": {
                    "postal_code": {},
                    "street": {},
                    "town": {},
                    "type": {},
                    "name": {},
                    "first_name": {},
                    "last_name": {},
                    "email": {},
                    "phone_number": {},
                    "customer": {},
                    "country": {}
                }
            },
            "order_items": {
                "errors": [
                    "This value is not valid."
                ]
            },
            "status": {},
            "parcels": {}
        }
    }
}

let errorResponse = new ErrorResponse(simpleResponse);
console.log(errorResponse.toFlattenObject())
/*
{
  "errors": [],
  "code": 400,
  "message": "Validation Failed",
  "nodes": {
    "comment": [],
    "customer": ["This value is not valid."],
    "return_address.postal_code": [],
    "return_address.street": [],
    "return_address.town": [],
    "return_address.type": [],
    "return_address.name": [],
    "return_address.first_name": [],
    "return_address.last_name": [],
    "return_address.email": [],
    "return_address.phone_number": [],
    "return_address.customer": [],
    "return_address.country": [],
    "return_address": [],
    "order_items": ["This value is not valid."],
    "status": [],
    "parcels": []
  }
}
*/

console.log(errorResponse.toSimpleFlattenObject())
/*
{
  "code": 400,
  "message": "Validation Failed",
  "error": null,
  "nodes": {
    "comment": null,
    "customer": "This value is not valid.",
    "return_address.postal_code": null,
    "return_address.street": null,
    "return_address.town": null,
    "return_address.type": null,
    "return_address.name": null,
    "return_address.first_name": null,
    "return_address.last_name": null,
    "return_address.email": null,
    "return_address.phone_number": null,
    "return_address.customer": null,
    "return_address.country": null,
    "return_address": null,
    "order_items": "This value is not valid.",
    "status": null,
    "parcels": null
  }
}
*/
```

## Tests

All you need to do to run the tests is run:
```bash
$ npm test
```
