import {ErrorResponse} from "../ErrorResponse";
import {expect} from 'chai';


describe('ErrorResponse', function () {
    it('should return valid nodes', function () {
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
        expect(errorResponse.code).to.equal(400);
        expect(errorResponse.message).to.equal("Validation Failed");
        expect(errorResponse.children['customer'].getErrors()[0]).to.equal("This value is not valid.");
        expect(errorResponse.children['customer'].getName()).to.equal("customer");
    });
});
