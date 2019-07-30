const expectToThrow = require('../index')

describe('ExpectToThrow', function(){
    it('must not throw when the function throws', async function(){
        var throwingFunction = async function(){
            throw new Error()
        }

        await expectToThrow(async function(){
            await throwingFunction()
        })
    })
})