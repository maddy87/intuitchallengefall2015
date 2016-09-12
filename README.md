## Ikran  - You Financial Advice Buddy

This is a prototype application which provides financial advice to newbies based on their income.
The API's used are
    * [AWS Lambda](https://aws.amazon.com/lambda/)
    * [ZingCharts](http://zingchart.github.io/ZingChart-AngularJS/)
    * [Qundi API](https://www.quandl.com/tools/api)

## [Demo](http://rajeshetty.com/index.html)

The applciation is running on Angular JS and AWS Lamda for asses calculationn


## Installation
1. Clone this project or Download that ZIP file
2. Make sure you have [bower](http://bower.io/), [gulp](https://www.npmjs.com/package/gulp) and  [npm](https://www.npmjs.org/) installed globally
3. On the command prompt run the following commands
- cd `project-directory`
- `bower install`
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
