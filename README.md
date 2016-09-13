## Ikran  - You Financial Advice Buddy

This is a prototype application which provides financial advice to newbies based on their income.
The API's used are

* [AWS Lambda](https://aws.amazon.com/lambda/)
* [ZingCharts](http://zingchart.github.io/ZingChart-AngularJS/)
* [Quandl API](https://www.quandl.com/tools/api)

## [Demo](http://rajeshetty.com/intuitchallenge/index.html)

The applciation is running on Angular JS and AWS Lambda for portfolio calculation.


## Installation
1. Clone this project or Download that ZIP file
2. Make sure you have [bower](http://bower.io/), [gulp](https://www.npmjs.com/package/gulp) and  [npm](https://www.npmjs.org/) installed globally
3. On the command prompt run the following commands
- cd `project-directory`
- `bower install`. When you get the screen select option 5.
```
Unable to find a suitable version for angular, please choose one by typing one of the numbers below:
    1) angular#1.3.20 which resolved to 1.3.20 and is required by angular-mocks#1.3.20
    2) angular#1.4.x || 1.2.x which resolved to 1.4.12 and is required by angular-snap#1.8.5
    3) angular#^1.5.0 which resolved to 1.5.8 and is required by yapp
    4) angular#^1.0.8 which resolved to 1.5.8 and is required by ui-router#0.2.18
    5) angular#1.5.8 which resolved to 1.5.8 and is required by angular-animate#1.5.8

Prefix the choice with ! to persist it to bower.json

? Answer 5
```
- `npm install`
- `gulp serve` - For development mode
- `gulp build` - concat, minify and generate the files for deployment


### Voice Interaction

The application works with a voice reponse on the online alexa version Echoism.io[echoism.io]
Just  "Alexa, start skill Ikran"

### Talk Docker to me

You can follow installation steps or you simple download the below image from my docker repo and start using it
```
docker pull rajeshetty/intuitchallenge
docker run -it -p 8000:8000 --name test rajeshetty/intuitchallenge
cd intuitchallengefall2015
gulp serve
```
Hit the [url](http://localhost:8000/#/login). And your app is ready.

### Automation tools

- [Gulp](http://gulpjs.com/)
