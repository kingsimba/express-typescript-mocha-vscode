Demo Project of Node.js + Express + TypeScript + Mocha in VSCode
================================================================

This project is a minimal set of files which enables creating backend server with:

1. `Node.js`_  and `Express`_ - Popular backend solution.
#. `TypeScript`_ - A language extends from JavaScript. It adds a lot of essential features(such as strong type)
   for enterprise level projects.
#. `Mocha`_ - the fun, simple, flexible JavaScript test framework.
#. `Chai`_ - a BDD / TDD assertion library.

.. _Node.js: https://nodejs.org/en/
.. _Express: https://expressjs.com/
.. _TypeScript: https://www.typescriptlang.org/
.. _Mocha: https://mochajs.org/
.. _Chai: https://www.chaijs.com/

It takes me some time to learn all the pieces.
But it's quite enjoyable when all things are in spin.
Now I can focus on coding & testing and the productivity is impressive.

It's not a trivial work to setup the project. So I created this project to show you the final result.
I learned it from:

* https://developer.okta.com/blog/2018/11/15/node-express-typescript

Prepare The Project
-------------------

1. Install Node.js
2. Install VSCode
#. Install Extensions: Mocha Test Explorer, ES6 Mocha Snippets
#. Clone the project
   
   .. code-block:: bash
   
      $ git clone git@github.com:kingsimba/express-typescript-mocha-vscode.git

#. Install dependent node packages
   
   .. code-block:: bash
   
      $ cd express-typescript-mocha-vscode
      $ npm install

#. Open VSCode
   
   .. code-block:: bash
   
      $ code .

Start The Server
----------------

1. Press F5 to launch the server
2. Open browser and try the following URLS
   
   ::
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

1. Click Testing Panel
2. Enable auto run
3. Open users.spec.ts, modify the file
   
   And all the test will run automatically. And the test error messages will be shown along with the code.
