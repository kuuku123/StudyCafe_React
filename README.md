# Study Cafe

it is a website that is used for creating study , and let other people join study that you created

## Features
- **Login and Logout with Email Verification**
	- Emails are sent asynchronously
	- once you verify email , then you can create your own study
- **Create Study**
	- you can own multiple study and join multiple study
	- once you create your study you will be a manager of study and have authority to publish one
	- schedule members and you for studying
	- study image, tag and zone can be configured


## Installation

currently no deployment pipe line
- deployed at http://tonylimtest123.duckdns.org/
- react (apache web server) + [spring+redis+mysql] (docker-compose)
- **manual way** (currently doesn't work, url not for local, only for production)
	- docker need to be installed
	- first deploy https://github.com/kuuku123/StudyCafe_Server_For_React
	- and then deploy with following command
	```bash
	git clone https://github.com/kuuku123/StudyCafe_React.git
	cd StudyCafe_React
	./deploy.sh
	```




## Usage

https://github.com/kuuku123/StudyCafe_Server_For_React


## Contributing

Guidelines on how others can contribute to your project.

## License

This project is licensed under the MIT License.

