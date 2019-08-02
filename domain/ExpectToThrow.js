module.exports = async function(fn, expectedErrorMessage){
    var functionWasSuccessfullError = new Error()
    try{
        await fn()
        throw functionWasSuccessfullError
    }catch(exception){
        if(exception === functionWasSuccessfullError) throw new Error('An exception was expected to be thrown' + (expectedErrorMessage?' containing: ' + expectedErrorMessage:''))
        if(expectedErrorMessage && !exception.message.includes(expectedErrorMessage)) throw new Error('An exception was expected to be thrown containing: '+expectedErrorMessage +' but the error message was: '+exception.message)
    }
}