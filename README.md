![DELAi logo](https://github.com/christinakayastha/clearfortakeoff/blob/master/public/img/edited_logo.png)

## DEL Ai
### A flight delay predictor

Solution to the [NASA Space Apps 2016](https://2016.spaceappschallenge.org) Challenge:  [Clear for Take Off](https://2016.spaceappschallenge.org/challenges/aero/clear-for-take-off)

[Link to the live app](http://ec2-54-165-141-202.compute-1.amazonaws.com:3000/)
[Link to our presentation](http://www.slideshare.net/FatimaSarahKhalid/delai-presentation)

### Introduction 

When flights are delayed, airports get crowded, people get stranded, and airlines have to compensate. Wouldn't it be great if travelers could input their flight number and find out the likelihood of a delay? DelAI is a mobile-friendly application powered by a machine learning algorithm that was trained with historical flight and weather data. The ML takes the flight information and the destination airport weather data in order to predict the probability of a delay.

### Brief Application Writeup
We built a website hosted on an express server on AWS that takes in a flight # as input and uses the current day's weather at the destination airport to call into an R module Machine Learning script that predicts that chance of delay. The R module calls a prediction object which is a trained random forest and outputs class probabilities with respect to a flight being delayed or not. 

### Resources Used:
Wunderground weather API, Openflights datasets, DOT historical flight data, FlightAware FlightInfo API.

### Technologies Used:
NodeJS, Express Framework, R programming language, AWS, and several Npm modules. 

### Coming soon:
- Code Refactoring
- Better documentation
- Project Refinement


