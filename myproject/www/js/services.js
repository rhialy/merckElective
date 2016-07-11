angular.module('starter.services', [])

.factory('EventList', function($q) {
    var eventList = [],
        docClient;

    return {
        init: function(key, secret) {
            AWS.config.update({
                accessKeyId: key,
                secretAccessKey: secret
            });
            AWS.config.region = 'eu-west-1';
            docClient = new AWS.DynamoDB.DocumentClient({
                region: 'eu-west-1'
            });
            //AWS.config.update({endpoint: "https://dynamodb.eu-west-1.amazonaws.com"});
        },
        all: function() {
            var deferred = $q.defer();
            var params = {
                TableName: "merckElective",
                IndexName: "type-index",
                KeyConditionExpression: "#type = :type",
                ExpressionAttributeNames: {
                    "#type": "type"
                },
                ExpressionAttributeValues: {
                    ":type": 'peerTest'
                }
            };
            console.log(docClient)
            docClient.query(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    deferred.reject();
                } else {
                    console.log("Query succeeded.");
                    data.Items.forEach(function(item) {
                        console.log(item);
                    });
                    eventList = data;
                    deferred.resolve(eventList.Items);
                }
            });
            return deferred.promise;
        },
        create: function() {

          //var pIndex = prescr_index;
          //var aIndex = agent_index;
          //console.log(pIndex);
          //console.log(aIndex);

          var key =  1000 + Math.floor(Math.random() * 90000) + "";

          //var prescInfo = Patients.get(0);

          var itemParams = {
            TableName: 'merckElective',
            Item: {
              id: key,
              type: 'peerTest',
              date: new Date().toString(),
            }
          };

          console.log(itemParams);

          docClient.put(itemParams, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log('object stored')
            }
          });

        },
        update: function(medicationOrder) {

            var params = {
                TableName: "merckElective",
                Item: eventList
            };

            docClient.put(params, function(err, data) {
                if (err) console.log(err);
                else console.log(data);
            });

        },
        get: function(ID) {

          var params = {
              TableName: "merckElective",
              IndexName: "type-index",
              KeyConditionExpression: "#type = :type",
              ExpressionAttributeNames: {
                  "#type": "type"
              },
              ExpressionAttributeValues: {
                  ":type": 'peerTest'
              }
          };
          docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                eventList = data;
            }
          });
            return eventList;
        }
    };
})
