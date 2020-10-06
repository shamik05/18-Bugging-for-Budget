# Bugging-for-Budget
![GitHub License](https://img.shields.io/badge/License-None-blue)
## Description
Bugging for Budget is budget tracker app that allows one to record their revenue and expenses. In a user created transaction, users can set the name and the numeric amount incurred. Each transaction is logged and charted to allow budget tracking. The app also functions in offline mode with the transactions being logged and queued. Once the app regains network functionality, the transactions are processed. The app stores data using NoSQL and indexeddb for online and offline respectively. It uses a backend compromised of express and node to handle network requests. The offline functionality is implemented using the navigator object, service-worker and the browser's indexeddb capabilities. Finally, the app is hosted on heroku [here]().
## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Questions](#Questions)
## Installation
Download or clone the repo to a working directory and extract its contents. Use a **C**ommand **L**ine **I**nterface to install necessary dependencies by running the following command:
```
npm i
```
## Usage 
Type the following in any CLI to run the app. 
```
npm start
```
Each module's functions have also been demo-ed below.
![Budget](assets/budget.gif)
## License 
The project is currently licenseless.
## Contributing
Message the owner on github or by email.
## Questions 
If you have any questions about the repo, open an issue or contact me directly at shamik05@hotmail.com. You can find more of my work at [shamik05](https://github.com/shamik05/).