const {expect} = require('chai')
const expectToThrow = require('./ExpectToThrow')

describe('ExpectToThrow', function(){
    let errorWasNotThrownError

    beforeEach(function(){
        errorWasNotThrownError = new Error('The function executed successfully')
    })

    async function success(){}
    async function throwingFunction(){
        throw new Error()
    }

    describe('when called only with a function', function(){
        describe('when the function ends its execution successfully', function(){
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
            it('must not throw', async function(){
                await expectToThrow(async function(){
                    await throwingFunction()
                })
            })
        })
    })

    describe('when called with a function and an expected message', function(){
        let expectedErrorMessage

        beforeEach(function(){
            expectedErrorMessage = 'expected error message'
        })

        describe('when the function ends its execution successfully', function(){
            beforeEach(function(){
                errorWasNotThrownError = new Error('The function executed successfully')
            })
    
            it('must throw', async function(){
                try{
                    await expectToThrow(expectedErrorMessage, async function(){
                        await success()
                    })
                    throw errorWasNotThrownError
                }catch(exception){
                    if(exception === errorWasNotThrownError) expect.fail('We should have thrown an error')
                }
            })
    
            it('must throw an error indicating the expected error message', async function(){
                try{
                    await expectToThrow(expectedErrorMessage, async function(){
                        await success()
                    })
                    throw errorWasNotThrownError
                }catch(exception){
                    if(exception === errorWasNotThrownError) expect.fail('We should have thrown an error')
                    expect(exception.message).to.equal('An exception was expected to be thrown containing: ' + expectedErrorMessage)
                }
            })
        })
    
        describe('when the function throws an error with the expected error message', function(){
            async function throwingFunctionWithExpectedErrorMessage(){
                throw new Error(expectedErrorMessage)
            }

            it('must not throw', async function(){
                await expectToThrow(expectedErrorMessage, async function(){
                    await throwingFunctionWithExpectedErrorMessage()
                })
            })
        })

        describe('when the function throws an error containing the expected error message', function(){
            async function throwingFunctionWithErrorMesageIncludingExpected(){
                throw new Error("other things" + expectedErrorMessage + " other things")
            }

            async function throwingFunctionWithErrorMesageIncludingUpperCases(){
                throw new Error("other things" + "ERRor MessAge" + " other things")
            }

            it('must not throw', async function(){
                await expectToThrow(expectedErrorMessage, async function(){
                    await throwingFunctionWithErrorMesageIncludingExpected()
                })
            })

            it('must ignore case', async function(){
                await expectToThrow("errOR meSSage", async function(){
                    await throwingFunctionWithErrorMesageIncludingUpperCases()
                })
            })
        })

        describe('when the function throws an error not containing the expected error message', function(){
            var otherErrorMessage

            beforeEach(function(){
              otherErrorMessage = 'a different error message'  
            })

            async function throwingFunctionWithUnexpectedErrorMessage(){
                throw new Error(otherErrorMessage)
            }

            it('must throw indicating the expected and current error messages', async function(){
                try{
                    await expectToThrow(expectedErrorMessage, async function(){
                        await throwingFunctionWithUnexpectedErrorMessage()
                    })
                    throw errorWasNotThrownError
                }catch(exception){
                    if(exception === errorWasNotThrownError) expect.fail('We should have thrown an error')
                    expect(exception.message).to.equal('An exception was expected to be thrown containing: ' + expectedErrorMessage + ' but the error message was: ' + otherErrorMessage)
                }
            })
        })
    })
})