module.exports = async function(fn){
    var functionWasSuccessfullError = new Error()
    try{
        await fn()
        throw functionWasSuccessfullError
    }catch(exception){
        if(exception === functionWasSuccessfullError) throw new Error('An exception was expected to be thrown')
    }
}