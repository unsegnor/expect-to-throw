[![Build Status](https://travis-ci.org/unsegnor/expect-to-throw.svg?branch=master)](https://travis-ci.org/unsegnor/expect-to-throw)

# expect-to-throw
Just a method to expect an async method to throw

~~~~
const expectToThrow = require('expect-to-throw')

describe('some method', function(){
    it('must throw', async function(){
        expectToThrow(async function(){
            await someMethod()
        })
    })
})
~~~~