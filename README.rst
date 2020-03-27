Demo Project of Node.js + Express + TypeScript + Mocha in VSCode
================================================================

This project is a minimal set of files which enables creating backend server with:

1. `Node.js`_  link and `Express`_ - Popular backend solution.
#. `TypeScript`_ - A language extends from JavaScript. It adds a lot of essential features(such as strong type)
   for enterprise level projects.
#. `Mocha`_ - the fun, simple, flexible JavaScript test framework
#. `Chai`_ - a BDD / TDD assertion library for 

.. _Node.js: https://nodejs.org/en/
.. _Express: https://expressjs.com/
.. _TypeScript: https://www.typescriptlang.org/
.. _Mocha: https://mochajs.org/
.. _Chai: https://www.chaijs.com/

It takes me some time to learn all the pieces.
But it's quite enjoyable when all things are in spin.
Now I can focus on coding & testing and the productivity is impressive.

Prepare The Project
-------------------

1. Install VSCode
2. Install Node.js
3. Clone the project
   
   .. code-block:: bash
   
      $ git clone git@github.com:kingsimba/express-typescript-mocha-vscode.git

#. Install dependent node packages
   
   .. code-block:: bash
   
      $ cd express-typescript-mocha-vscode
      $ npm install

#. Open VSCode
   
   .. code-block:: bash
   
      $ code .

#. Install Extensions: Mocha Test Explorer

Start The Server
----------------

1. Press F5 to launch the server
2. Open browser to see the result
   
   a. http://127.0.0.1:8080
   b. http://127.0.0.1:8080/users
   c. http://127.0.0.1:8080/users/1

3. Play with index.ts

   The server will restart automatically when you save the file.
   But you need to refresh the page manually to see the new result.

Start Testing
-------------

1. Click Testing Panel
2. Enable auto run
3. Open users.spec.ts, modify the file
   
   And all the test will run automatically. And the test error messages will be shown along with the code.
