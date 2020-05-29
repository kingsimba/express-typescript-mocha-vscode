Demo Project of Node.js + Express + TypeScript + Mocha in VSCode
================================================================

This project is a minimal set of files which enables creating backend server with:

*  `Node.js`_  and `Express`_ - Popular backend solution.
*  `TypeScript`_ - A language extends from JavaScript. It adds a lot of essential features(such as strong type)
   for enterprise level projects.

If you just starting learning backend development, I hope this project can make things easier for you.
I will try to explain every bits in the comments of the code.

And the server is tested with:

*  `Mocha`_ - the fun, simple, flexible JavaScript test framework.
*  `Chai`_ - a BDD / TDD assertion library.
*  `Mocha Test Explorer`_ - A VSCode plugin to run tests within VS Code.

Point of interest
-----------------

1. A enjoyable VSCode developing environment.
2. Complete testing: unit test + web server test.

Prepare the Project
-------------------

1. Install Node.js
2. Install VSCode

   *  Install VSCode Extension: Mocha Test Explorer

#. Clone the project
   
   .. code-block:: bash
   
      $ git clone git@github.com:kingsimba/express-typescript-mocha-vscode.git

#. Install dependent node packages
   
   .. code-block:: bash
   
      $ cd express-typescript-mocha-vscode
      $ npm install

#. Open 'express-typescript-mocha-vscode.code-workspace' with VSCode

Start the Server
----------------

1. Press Ctrl+Shift+B, select 'npm watch'

   It's configured in '.vscode/tasks.json'.
   Or you can use 'npm run watch' in console.

2. Open browser and try the following URLS::

      GET http://localhost:8080
      GET http://localhost:8080/api/v1/users
      GET http://localhost:8080/api/v1/users/1
      GET http://localhost:8080/api/v1/users/999
      GET http://localhost:8080/api/v1/docs/sample.html
      POST http://localhost:8080/api/v1/auth/login?username=simba&password=mypassword
      POST http://localhost:8080/api/v1/auth/logout

3. Play with code

   The server will restart automatically when you save any file.
   But you need to refresh the page manually to see the new result.

Start Testing
-------------

There are 3 ways to run the tests.

1. Run from Test Explorer.

.. image:: images/test-explorer.png

Optionally, enable "auto run" and modify any of the \*.spec.ts. When saved, the corresponding tests will run.

2. Click "run" or "debug" in the inlined code.

.. image:: images/inlined-test.png

3. Use "npm test"

.. code-block:: bash

   $ npm test    

   > express-typescript@1.0.0 test C:\Users\kingsimba\Documents\github\express-typescript-mocha-vscode
   > mocha src/**/*.ts --require='ts-node/register/transpile-only'

   server started at http://localhost:8080


   Auth
      √ should return valid AuthResult if auth succeed
      √ should undefined if auth failed

   App
      /api/v1/users
         √ return an array of users
      /api/v1/users/:id
         √ return 404 when the id is invalid
      /api/v1/auth/login
         √ should fail if password is incorrect
         √ should succeed if password is correct

   User
      √ can show all users
      √ can find user with id
      √ should return null when id not exists
      √ have Donald Trump


   10 passing (89ms)

Reference
---------

It's not a trivial work to setup the project. So I created this project to show you the final result.
I learned it from:

* https://developer.okta.com/blog/2018/11/15/node-express-typescript
* https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
* https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

.. _Node.js: https://nodejs.org/en/
.. _Express: https://expressjs.com/
.. _TypeScript: https://www.typescriptlang.org/
.. _Mocha: https://mochajs.org/
.. _Chai: https://www.chaijs.com/
.. _`Mocha Test Explorer`: https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter

Change Log
----------

*  2020-5-29

   *  Use 'ts-node-dev' to launch the server(and re-launch when modified). See "package.json"

      .. code-block:: js
         
         "watch": "ts-node-dev --respawn -- src/index.ts"

   *  Update tslint.json to ignore some warnings.
   *  Remove deprecated 'test/mocha.opts'. It's replace by:
   
      1. 'mochaExplorer.files' and 'mochaExplorer.require' in '.vscode/settings.json'. This is used by `Mocha Test Explorer`_.
         
         .. code-block:: js

            {
               "mochaExplorer.files": "src/**/*.spec.ts",
               "mochaExplorer.require": "ts-node/register/transpile-only"
            }

      2. '.mocharc.json'. This is used by Mocha(running in console) and Mocha Test Explorer.
      
         Note: Add ``"exit": true`` in '.mocharc.json' to make sure the mocha process will exit after test completes.
   
   *  Add some scripts in packages.json. So I can use something like: "npm test", "npm run watch".
     
      .. code-block:: js
     
         "scripts": {
            "build": "npx tsc",
            "watch": "ts-node-dev --respawn -- src/index.ts",
            "test": "mocha src/**/*.ts --require='ts-node/register/transpile-only'",
            "kill": "TaskKill /IM node.exe /F"
         }

   *  Add a test to simulate a complete login process.

      .. code-block:: ts

         it('should succeed if password is correct', async () => {
               // Agent is used to simulate a complete session.
               // So the authentication cookies will be effective in subsequent queries.
               const agent = chai.request.agent(app);

               let res = await agent.get('/api/v1/auth/who-am-i');
               expect(res, 'return 401 because we have not login yet').to.have.status(401);

               res = await agent.post('/api/v1/auth/login?username=simba&password=mypassword');
               expect(res).to.have.status(200);
               expect(res).to.have.cookie('authUser', 'simba');
               expect(res).to.have.cookie('authToken');

               res = await agent.get('/api/v1/auth/who-am-i');
               expect(res).to.have.status(200);
               expect(res.body, 'Because we have login, it should return user name').
                  to.deep.includes({ username: 'simba' });
         });
