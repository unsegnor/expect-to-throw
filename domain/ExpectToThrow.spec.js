const {expect} = require('chai')
const expectToThrow = require('./ExpectToThrow')

describe('ExpectToThrow', function(){
    describe('when the function ends its execution successfully', function(){
        let errorWasNotThrownError

        beforeEach(function(){
            errorWasNotThrownError = new Error('The function executed successfully')
        })

        async function success(){}

        it('must throw', async function(){
            try{
                await expectToThrow(async function(){
                    await success()
                })
                throw errorWasNotThrownError
            }catch(exception){
                if(exception === errorWasNotThrownError) expect.fail('We should have thrown an error')
            }
        })

        it('must throw an error telling that an exception was expected', async function(){
            try{
                await expectToThrow(async function(){
                    await success()
                })
                throw errorWasNotThrownError
            }catch(exception){
                if(exception === errorWasNotThrownError) expect.fail('We should have thrown an error')
                expect(exception.message).to.equal('An exception was expected to be thrown')
            }
        })
    })

    describe('when the function throws', function(){
        async function throwingFunction(){
            throw new Error()
        }

        it('must not throw', async function(){
            try{
                await expectToThrow(async function(){
                    await throwingFunction()
                })
            }catch(exception){
                if(exception.message === 'An exception was expected to be thrown'){
                    expect.fail('We should not have thrown an exception')
                }
            }
        })
    })
})