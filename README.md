# Symfony form error response javascript parser

This library provides a simple solution for analyzing symfony form error responses

## Usage
```typescript
import ErrorResponse from 'symfony-js-form-parser'

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
 error: '',
 nodes: {
   comment: '',
   customer: 'This value is not valid.',
   'return_address.postal_code': '',
   'return_address.street': '',
   'return_address.town': '',
   'return_address.type': '',
   'return_address.name': '',
   'return_address.first_name': '',
   'return_address.last_name': '',
   'return_address.email': '',
   'return_address.phone_number': '',
   'return_address.customer': '',
   'return_address.country': '',
   return_address: '',
   order_items: 'This value is not valid.',
   status: '',
   parcels: ''
 }
}
*/
```