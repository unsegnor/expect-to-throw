module.exports = async function(){
    var fn, expectedErrorMessage
    if(arguments.length === 1){
        fn = arguments[0]
    }else{
        expectedErrorMessage = arguments[0]
        fn = arguments[1]
    }

    var functionWasSuccessfullError = new Error()
    try{
        await fn()
        throw functionWasSuccessfullError
    }catch(exception){
        if(exception === functionWasSuccessfullError) throw new Error('An exception was expected to be thrown' + (expectedErrorMessage?' containing: ' + expectedErrorMessage:''))
        if(expectedErrorMessage && !exception.message.includes(expectedErrorMessage)) throw new Error('An exception was expected to be thrown containing: '+expectedErrorMessage +' but the error message was: '+exception.message)
    }
}