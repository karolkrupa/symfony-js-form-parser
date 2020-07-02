import {ErrorResponse} from "../src/ErrorResponse"
import {expect} from 'chai';
import simpleResponse from './simpleResponse.json'
import validFlattenObject from './validFlattenObject.json'
import validSimpleFlattenObject from './validSimpleFlattenObject.json'


describe('ErrorResponse', function () {
    it('should return valid nodes', function () {
        let errorResponse = new ErrorResponse(simpleResponse)
        expect(errorResponse.code).to.equal(400)
        expect(errorResponse.message).to.equal("Validation Failed")
        expect(errorResponse.children['customer'].getErrors()[0]).to.equal("This value is not valid.")
        expect(errorResponse.children['customer'].getName()).to.equal("customer")
    })

    it('should return valid flatten object', function () {
        let errorResponse = new ErrorResponse(simpleResponse)
        let flattenObject = errorResponse.getFlattenObject()

        expect(flattenObject).to.deep.equal(validFlattenObject)
    })

    it('should return valid simple flatten object', function () {
        let errorResponse = new ErrorResponse(simpleResponse)
        let flattenObject = errorResponse.getSimpleFlattenObject()

        expect(flattenObject).to.deep.equal(validSimpleFlattenObject)
    })

    it('should parse empty object', function () {
        let errorResponse = new ErrorResponse({});

        let flattenObject = errorResponse.getSimpleFlattenObject();

        expect(flattenObject).to.deep.equal({
            code: null,
            message: null,
            error: null,
            nodes: {}
        })
    })
})


