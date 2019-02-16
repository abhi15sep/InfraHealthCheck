'use strict';

var http = require('http');

exports.handler = function(event,context) {

  try {

    if(process.env.NODE_DEBUG_EN) {
      console.log("Request:\n"+JSON.stringify(event,null,2));
    }



    var request = event.request;
    var session = event.session;

    if(!event.session.attributes) {
      event.session.attributes = {};
    }

    /*
      i)   LaunchRequest       Ex: "Open health check"
      ii)  IntentRequest
      iii) SessionEndedRequest Ex: "exit" or error or timeout
    */

    if (request.type === "LaunchRequest") {
      handleLaunchRequest(context);

    } else if (request.type === "IntentRequest") {

      if (request.intent.name === "MyeeIntent") {

        handleMyeeIntent(request,context);

      } else if (request.intent.name === "AEMAuthorIntent") {

        handleAEMAuthorIntent(request,context,session);

      } else if (request.intent.name === "AEMPublisherIntent") {

        handleAEMPublisherIntent(request,context,session);

      } else if (request.intent.name === "AEMPublisherIntent") {

        handleAEMPublisherIntent(request,context,session);

      } else if (request.intent.name === "IdAppIntent") {

        handleIdAppIntent(request,context,session);

      } else if (request.intent.name === "CasperIntent") {

        handleCasperIntent(request,context,session);

      } else if (request.intent.name === "AuthorBackupIntent") {

        handleAuthorBackupIntent(request,context,session);

      } else if (request.intent.name === "AEMPublisherBackupIntent") {

        handleAEMPublisherBackupIntent(request,context,session);

      } else if (request.intent.name === "SaltmasterIntent") {

        handleSaltmasterIntent(request,context,session);

      } else if (request.intent.name === "AMAZON.StopIntent" || request.intent.name === "AMAZON.CancelIntent") {
        context.succeed(buildResponse({
          speechText: "Good bye. ",
          endSession: true
        }));

      } else {
        throw "Unknown intent";
      }

    } else if (request.type === "SessionEndedRequest") {

    } else {
      throw "Unknown intent type";
    }
  } catch(e) {
    context.fail("Exception: "+e);
  }

}

function buildResponse(options) {

  if(process.env.NODE_DEBUG_EN) {
    console.log("buildResponse options:\n"+JSON.stringify(options,null,2));
  }

  var response = {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "SSML",
        ssml: "<speak>"+options.speechText+"</speak>"
      },
      shouldEndSession: options.endSession
    }
  };

  if(options.repromptText) {
    response.response.reprompt = {
      outputSpeech: {
        type: "SSML",
        ssml: "<speak>"+options.repromptText+"</speak>"
      }
    };
  }

  if(options.cardTitle) {
    response.response.card = {
      type: "Simple",
      title: options.cardTitle
    }

    if(options.imageUrl) {
      response.response.card.type = "Standard";
      response.response.card.text = options.cardContent;
      response.response.card.image = {
        smallImageUrl: options.imageUrl,
        largeImageUrl: options.imageUrl
      };

    } else {
      response.response.card.content = options.cardContent;
    }
  }

  if(options.session && options.session.attributes) {
    response.sessionAttributes = options.session.attributes;
  }

  if(process.env.NODE_DEBUG_EN) {
    console.log("Response:\n"+JSON.stringify(response,null,2));
  }

  return response;
}

function handleLaunchRequest(context) {
  let options = {};
  options.speechText =  'Welcome to Infrastructure health check skill. Using our skill you can check health check of My<say-as interpret-as="characters">EE</say-as>, <say-as interpret-as="characters">AEM</say-as> author, <say-as interpret-as="characters">AEM</say-as> publisher, <say-as interpret-as="characters">ID</say-as> app, casper, author backup, <say-as interpret-as="characters">AEM</say-as> publisher backup, saltmaster. Which health check you want to know about?';
  options.repromptText = "You can say for example, how is the heath check looking for Myee for the day. ";
  options.endSession = false;
  context.succeed(buildResponse(options));
}

function handleMyeeIntent(request,context) {
    let options = {};
    options.speechText = `Services in My<say-as interpret-as="characters">EE</say-as> are runing fine, my<say-as interpret-as="characters">EE</say-as> all servers are app ready true, my<say-as interpret-as="characters">EE</say-as> all servers are in service in load balancer`;
    options.cardTitle = `MYEE health check`;
    options.cardContent = options.speechText;
    options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
    options.endSession = true;
    context.succeed(buildResponse(options));
  }

  function handleAEMAuthorIntent(request,context) {
      let options = {};
      options.speechText = `Services are running fine on all <say-as interpret-as="characters">AEM</say-as> author servers, all <say-as interpret-as="characters">AEM</say-as> author servers are app ready true, <say-as interpret-as="characters">AEM</say-as> author all servers are in service in load balancer.`;
      options.cardTitle = `AEM author health check`;
      options.cardContent = options.speechText;
      options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
      options.endSession = true;
      context.succeed(buildResponse(options));
  }

  function handleAEMPublisherIntent(request,context) {
      let options = {};
      options.speechText = `<say-as interpret-as="characters">AEM</say-as> publisher services are running fine, <say-as interpret-as="characters">AEM</say-as> publisher all servers are app ready true, <say-as interpret-as="characters">AEM</say-as> publisher  all servers are in service in load balance.`;
      options.cardTitle = `AEM publisher health check`;
      options.cardContent = options.speechText;
      options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
      options.endSession = true;
      context.succeed(buildResponse(options));
  }

  function handleIdAppIntent(request,context) {
      let options = {};
      options.speechText = `Services are running fine on <say-as interpret-as="characters">ID</say-as> app servers, <say-as interpret-as="characters">ID</say-as> app all servers are app ready true, <say-as interpret-as="characters">ID</say-as> app all servers are in service in Load balance.`;
      options.cardTitle = `IDApp health check`;
      options.cardContent = options.speechText;
      options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
      options.endSession = true;
      context.succeed(buildResponse(options));
  }

  function handleCasperIntent(request,context) {
      let options = {};
      options.speechText = `Services are running fine for casper servers, casper all servers are app ready true, casper all servers are in service in load balance.`;
      options.cardTitle = `Casper health check`;
      options.cardContent = options.speechText;
      options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
      options.endSession = true;
      context.succeed(buildResponse(options));
  }

  function handleAuthorBackupIntent(request,context) {
      let options = {};
      options.speechText = `Author backup has been completed successfully`;
      options.cardTitle = `Author backup health check`;
      options.cardContent = options.speechText;
      options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
      options.endSession = true;
      context.succeed(buildResponse(options));
  }

  function handleAEMPublisherBackupIntent(request,context) {
      let options = {};
      options.speechText = `Publisher backup has been completed successfully.`;
      options.cardTitle = `AEM publisher backup health check`;
      options.cardContent = options.speechText;
      options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
      options.endSession = true;
      context.succeed(buildResponse(options));
  }

  function handleSaltmasterIntent(request,context) {
      let options = {};
      options.speechText = `Both master and minion  service is running.`;
      options.cardTitle = `saltmaster health check`;
      options.cardContent = options.speechText;
      options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
      options.endSession = true;
      context.succeed(buildResponse(options));
  }
