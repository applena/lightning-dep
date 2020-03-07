// let cases = [{
//     "id": 2,
//     "name": "Bob vs Pokemon",
//     "caseNumber": "2300",
//     "court": "Court of Washington",
//     "date": "2020-01-21T22:01:30.1914606-08:00",
//     "isActive": true,
//     "plantiff": "Plantiff Name",
//     "defendant": "Defendant Name",
//     "caseType": null,
//     "plantiffLawyers": [
//         {
//             "id": 1,
//             "firstName": "Amanda",
//             "lastName": "Iverson",
//             "firm": "We Always Win Firm",
//             "address": "123 Candy Cane Lane",
//             "bar_Number": "123BarNumber",
//             "state_Issued": "WA",
//             "userID": null,
//             "email": "amanda@wealwayswin.com"
//         },
//         {
//           "id": 3,
//           "firstName": "Michelle",
//           "lastName": "Smith",
//           "firm": "We Always Win Firm",
//           "address": "123 Candy Cane Lane",
//           "bar_Number": "123BarNumber",
//           "state_Issued": "WA",
//           "userID": null,
//           "email": "michelle@wealwayswin.com"
//       }
//     ],
//     "defendentLawyers": [
//         {
//             "id": 1,
//             "firstName": "Lena",
//             "lastName": "Eivy",
//             "firm": "We Always Win Firm",
//             "address": "123 Candy Cane Lane",
//             "bar_Number": "123BarNumber",
//             "state_Issued": "WA",
//             "userID": null,
//             "email": "lena@wealwayswin.com"
//         }
//     ],
//     "depositions": [
//       {"id": 0,
//         "witnessName": "Meggan Triplett",
//         "date": "2020-01-21T22:01:30.2009572-08:00",
//         "dayOfWeek": 1,
//         "address": "432 5th ave",
//         "courtReporterID": 3,
//         "caseID": 2,
//         "isActive": false,
//         "courtReporter": {
//           "id": 1,
//           "firstName": "Alisa",
//           "lastName": "Smith",
//           "companyName": "I report all the things",
//           "address": "123 address lane",
//           "userID": null,
//           "image_url": "../../assets/courtReporter.jpg"
//         },
//         "case": null,
//         "exhibits": [
//           {"id": 1,
//             "name": "Email",
//             "documentID": 0,
//             "courtReporterID": 0,
//             "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
//             "url": "www.supersecretURL.com",
//             "document": 
//               {"id": 0,
//               "lawyerID": 1,
//               "depositionID": 0,
//               "documentType": 4,
//               "isPublic": true,
//               "url": "MyURL.com"},
//             "courtReporter": 
//               {"id": 1,
//               "firstName": "Alisa",
//               "lastName": "Smith",
//               "companyName": "I report all the things",
//               "address": "123 address lane",
//               "userID": null,
//               "image_url": "../../assets/courtReporter.jpg"}
//           }],
//           "documents": null,
//           "notAttending":["michelle@wealwayswin.com"]
//         },
//         {
//           "id": 5,
//           "witnessName": "bob dylan",
//           "date": "2019-03-21T22:01:30.2009572-08:00",
//           "dayOfWeek": 1,
//           "address": "432 5th ave",
//           "courtReporterID": 3,
//           "caseID": 2,
//           "isActive": true,
//           "courtReporter": {
//               "id": 1,
//               "firstName": "Alisa",
//               "lastName": "Smith",
//               "companyName": "I report all the things",
//               "address": "123 address lane",
//               "userID": null,
//               "image_url": "../../assets/courtReporter.jpg"
//           },
//           "case": null,
//           "exhibits": [
//               {
//                   "id": 0,
//                   "name": "Email",
//                   "documentID": 0,
//                   "courtReporterID": 0,
//                   "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
//                   "url": "www.supersecretURL.com",
//                   "document": {
//                       "id": 0,
//                       "lawyerID": 1,
//                       "depositionID": 0,
//                       "documentType": 4,
//                       "isPublic": true,
//                       "url": "MyURL.com"
//                   },
//                   "courtReporter": {
//                       "id": 1,
//                       "firstName": "Alisa",
//                       "lastName": "Smith",
//                       "companyName": "I report all the things",
//                       "address": "123 address lane",
//                       "userID": null,
//                       "image_url": "../../assets/courtReporter.jpg"
//                   }
//               },
//               {"id": 3,
//               "witnessName": "Kermit The Frog",
//               "date": "2019-06-21T22:01:30.2009572-08:00",
//               "dayOfWeek": 1,
//               "address": "432 5th ave",
//               "courtReporterID": 3,
//               "caseID": 2,
//               "isActive": false,
//               "courtReporter": {
//                 "id": 1,
//                 "firstName": "Alisa",
//                 "lastName": "Smith",
//                 "companyName": "I report all the things",
//                 "address": "123 address lane",
//                 "userID": null,
//                 "image_url": "../../assets/courtReporter.jpg"},
//               "case": null,
//               "exhibits": [
//                 {"id": 1,
//                   "name": "Email",
//                   "documentID": 0,
//                   "courtReporterID": 0,
//                   "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
//                   "url": "www.supersecretURL.com",
//                   "document": 
//                     {"id": 0,
//                     "lawyerID": 1,
//                     "depositionID": 0,
//                     "documentType": 4,
//                     "isPublic": true,
//                     "url": "MyURL.com"},
//                   "courtReporter": 
//                     {"id": 1,
//                     "firstName": "Alisa",
//                     "lastName": "Smith",
//                     "companyName": "I report all the things",
//                     "address": "123 address lane",
//                     "userID": null,
//                     "image_url": "../../assets/courtReporter.jpg"}
//                 }],
//                 "documents": null,
//                 "notAttending":["michelle@wealwayswin.com"]
//               },
//               {"id": 4,
//               "witnessName": "Miss Piggy",
//               "date": "2020-01-21T22:01:30.2009572-08:00",
//               "dayOfWeek": 1,
//               "address": "432 5th ave",
//               "courtReporterID": 3,
//               "caseID": 2,
//               "isActive": true,
//               "courtReporter": {
//                 "id": 1,
//                 "firstName": "Alisa",
//                 "lastName": "Smith",
//                 "companyName": "I report all the things",
//                 "address": "123 address lane",
//                 "userID": null,
//                 "image_url": "../../assets/courtReporter.jpg"},
//               "case": null,
//               "exhibits": [
//                 {"id": 1,
//                   "name": "Email",
//                   "documentID": 0,
//                   "courtReporterID": 0,
//                   "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
//                   "url": "www.supersecretURL.com",
//                   "document": 
//                     {"id": 0,
//                     "lawyerID": 1,
//                     "depositionID": 0,
//                     "documentType": 4,
//                     "isPublic": true,
//                     "url": "MyURL.com"},
//                   "courtReporter": 
//                     {"id": 1,
//                     "firstName": "Alisa",
//                     "lastName": "Smith",
//                     "companyName": "I report all the things",
//                     "address": "123 address lane",
//                     "userID": null,
//                     "image_url": "../../assets/courtReporter.jpg"}
//                 }],
//                 "documents": null,
//                 "notAttending":["michelle@wealwayswin.com"]
//               },
//           ],
//           "documents": null,
//           "notAttending":["michelle@wealwayswin.com"]
//           }
//       ] 
//   },
//   {
//     "id": 1,
//     "name": "Joe vs The Valcano",
//     "caseNumber": "12345d567",
//     "court": "Court of Washington",
//     "date": "2020-01-21T22:01:30.1914606-08:00",
//     "isActive": false,
//     "plantiff": "Plantiff Name",
//     "defendant": "Defendant Name",
//     "caseType": null,
//     "plantiffLawyers": [
//         {
//             "id": 1,
//             "firstName": "Amanda",
//             "lastName": "Iverson",
//             "firm": "We Always Win Firm",
//             "address": "123 Candy Cane Lane",
//             "bar_Number": "123BarNumber",
//             "state_Issued": "WA",
//             "userID": null,
//             "email": "amanda@wealwayswin.com"
//         },
//         {
//           "id": 3,
//           "firstName": "bob",
//           "lastName": "Smith",
//           "firm": "We Always Win Firm",
//           "address": "123 Candy Cane Lane",
//           "bar_Number": "123BarNumber",
//           "state_Issued": "WA",
//           "userID": null,
//           "email": "michelle@wealwayswin.com"
//       }
//     ],
//     "defendentLawyers": [
//         {
//             "id": 1,
//             "firstName": "Lena",
//             "lastName": "Eivy",
//             "firm": "We Always Win Firm",
//             "address": "123 Candy Cane Lane",
//             "bar_Number": "123BarNumber",
//             "state_Issued": "WA",
//             "userID": null,
//             "email": "lena@wealwayswin.com"
//         }
//     ],
//     "depositions": [
//         {
//             "id": 6,
//             "witnessName": "Tom Cruise",
//             "date": "2020-02-21T22:01:30.2009572-08:00",
//             "dayOfWeek": 1,
//             "isActive": false,
//             "address": "432 5th ave",
//             "courtReporterID": 3,
//             "caseID": 2,
//             "courtReporter": {
//                 "id": 1,
//                 "firstName": "Alisa",
//                 "lastName": "Smith",
//                 "companyName": "I report all the things",
//                 "address": "123 address lane",
//                 "userID": null
//             },
//             "case": null,
//             "exhibits": [
//                 {
//                     "id": 0,
//                     "name": "Email",
//                     "documentID": 0,
//                     "courtReporterID": 0,
//                     "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
//                     "url": "www.supersecretURL.com",
//                     "document": {
//                         "id": 0,
//                         "lawyerID": 1,
//                         "depositionID": 0,
//                         "documentType": 4,
//                         "isPublic": true,
//                         "url": "MyURL.com"
//                     },
//                     "courtReporter": {
//                         "id": 1,
//                         "firstName": "Alisa",
//                         "lastName": "Smith",
//                         "companyName": "I report all the things",
//                         "address": "123 address lane",
//                         "userID": null
//                     }
//                 }
//             ],
//             "documents": null,
//             "notAttending":["michelle@wealwayswin.com"]
//         },
//         {
//           "id": 4,
//           "witnessName": "Nichole Kidman",
//           "date": "2020-01-21T22:01:30.2009572-08:00",
//           "dayOfWeek": 1,
//           "address": "432 5th ave",
//           "courtReporterID": 3,
//           "caseID": 2,
//           "courtReporter": {
//               "id": 1,
//               "firstName": "Alisa",
//               "lastName": "Smith",
//               "companyName": "I report all the things",
//               "address": "123 address lane",
//               "userID": null,
//               "image_url": "../../assets/courtReporter.jpg"
//           },
//           "case": null,
//           "exhibits": [
//               {
//                   "id": 0,
//                   "name": "Email",
//                   "documentID": 0,
//                   "courtReporterID": 0,
//                   "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
//                   "url": "www.supersecretURL.com",
//                   "document": {
//                       "id": 0,
//                       "lawyerID": 1,
//                       "depositionID": 0,
//                       "documentType": 4,
//                       "isPublic": true,
//                       "url": "MyURL.com"
//                   },
//                   "courtReporter": {
//                       "id": 1,
//                       "firstName": "Alisa",
//                       "lastName": "Smith",
//                       "companyName": "I report all the things",
//                       "address": "123 address lane",
//                       "userID": null,
//                       "image_url": "../../assets/courtReporter.jpg"
//                   }
//               }
//           ],
//           "documents": null,
//           "notAttending":[]
//       }
//     ]
// }]

let lawyer = {
  "id":1,
  "firstName":"Amanda",
  "lastName":"Iverson",
  "email":"email@email.com",
  "firm":"I always win",
  "address":"123 my way",
  "bar_Number":"123 bar Number",
  "state_Issued":"WA",
  "profilePic":null,
  "cases":[
     {
       "case":{
           "id":1,
           "name":"Iverson vs Disney",
           "caseNumber":"123 Case Number",
           "court":"Mickey's supreme court",
           "openDate":"2020-02-23T17:13:51.6724219",
           "isActive":true,
           "plantiff":"Amanda Iverson",
           "defendant":"Walt Disney",
           "caseType":"Civil"
          },
        "plantiffLawyers":[
           {
              "id":2,
              "firstName":"Belle",
              "lastName":"Iverson",
              "email":"email@email.com",
              "firm":"The Cats win",
              "address":"123 my way",
              "bar_Number":"123 bar Number",
              "state_Issued":"WA",
              "profilePic":null
           },
           {
              "id":3,
              "firstName":"Frpdp",
              "lastName":"Johnson",
              "email":"email@email.com",
              "firm":"The other firm",
              "address":"546 my way",
              "bar_Number":"123 bar Number",
              "state_Issued":"WA",
              "profilePic":null
           }
        ],
        "defendentLawyers":[
           {
              "id":1,
              "firstName":"Amanda",
              "lastName":"Iverson",
              "email":"email@email.com",
              "firm":"I always win",
              "address":"123 my way",
              "bar_Number":"123 bar Number",
              "state_Issued":"WA",
              "profilePic":null
           }
        ],
        "depositions":[
           {
              "id":1,
              "caseNumber":"123 Case Number",
              "witnessName":"Josie Cat",
              "date":"2020-02-23T17:13:51.6785452",
              "startTime":"0001-01-01T00:00:00",
              "endTime":"0001-01-01T00:00:00",
              "address":"123 Candycane lane",
              "isComplete":true,
              "courtReporter":{
                 "id":1,
                 "firstName":"Josie",
                 "lastName":"Kitty",
                 "companyName":"Court Reporting Inc",
                 "state":"WA",
                 "address":"132 street address",
                 "accredidation":"My Accrediation",
                 "email":"Emailll@email.com"
              },
              "exhibits":[
                 {
                    "id":1,
                    "name":"Email of sale",
                    "url":"http://www.msite.com",
                    "dateStamped":"2020-02-23T17:13:51.6792733",
                    "courtReporterName":"Josie Kitty",
                    "fileType":"Email",
                    "exhibitNumber":24,
                    "depositionID":1
                 }
              ],
              "notAttendingLawyers":[
                 "amanda@lightningdep.com",
                 "meggan@lightningdep.com"
              ]
           },
           {
              "id":2,
              "caseNumber":"123 Case Number",
              "witnessName":"Belle kitty",
              "date":"2020-02-23T17:13:51.6788913",
              "startTime":"0001-01-01T00:00:00",
              "endTime":"0001-01-01T00:00:00",
              "address":"123 kitty cat lane",
              "isComplete":false,
              "courtReporter":{
                 "id":1,
                 "firstName":"Josie",
                 "lastName":"Kitty",
                 "companyName":"Court Reporting Inc",
                 "state":"WA",
                 "address":"132 street address",
                 "accredidation":"My Accrediation",
                 "email":"Emailll@email.com"
              },
              "exhibits":[
                 {
                    "id":2,
                    "name":"Court Report",
                    "url":"http://www.msite.com",
                    "dateStamped":"2020-02-23T17:13:51.6794214",
                    "courtReporterName":"Josie Kitty",
                    "fileType":"Email",
                    "exhibitNumber":24,
                    "depositionID":2
                 }
              ],
              "notAttendingLawyers":[
                 "amanda@lightningdep.com",
                 "meggan@lightningdep.com"
              ]
           }
        ]
     },
     {
        "case":{
           "id":2,
           "name":"Princess vs Villilan",
           "caseNumber":"Insert Case Number here",
           "court":"King County Supereme Court",
           "openDate":"2020-02-23T17:13:51.6764428",
           "isActive":true,
           "plantiff":"Princecss Amanda",
           "defendant":"All the Villians",
           "caseType":"Family"
        },
        "plantiffLawyers":[
           {
              "id":1,
              "firstName":"Amanda",
              "lastName":"Iverson",
              "email":"email@email.com",
              "firm":"I always win",
              "address":"123 my way",
              "bar_Number":"123 bar Number",
              "state_Issued":"WA",
              "profilePic":null
           }
        ],
        "defendentLawyers":[
           {
              "id":2,
              "firstName":"Belle",
              "lastName":"Iverson",
              "email":"email@email.com",
              "firm":"The Cats win",
              "address":"123 my way",
              "bar_Number":"123 bar Number",
              "state_Issued":"WA",
              "profilePic":null
           },
           {
              "id":3,
              "firstName":"Frpdp",
              "lastName":"Johnson",
              "email":"email@email.com",
              "firm":"The other firm",
              "address":"546 my way",
              "bar_Number":"123 bar Number",
              "state_Issued":"WA",
              "profilePic":null
           }
        ],
        "depositions":[
           {
              "id":3,
              "caseNumber":"Insert Case Number here",
              "witnessName":"Trinity kitty",
              "date":"2020-02-23T17:13:51.6788996",
              "startTime":"0001-01-01T00:00:00",
              "endTime":"0001-01-01T00:00:00",
              "address":"123 kitty cat lane",
              "isComplete":false,
              "courtReporter":{
                 "id":1,
                 "firstName":"Josie",
                 "lastName":"Kitty",
                 "companyName":"Court Reporting Inc",
                 "state":"WA",
                 "address":"132 street address",
                 "accredidation":"My Accrediation",
                 "email":"Emailll@email.com"
              },
              "exhibits":[
              ],
              "notAttendingLawyers":[
                 "amanda@lightningdep.com",
                 "meggan@lightningdep.com"
              ]
           },
           {
              "id":4,
              "caseNumber":"Insert Case Number here",
              "witnessName":"Neo kitty",
              "date":"2020-02-23T17:13:51.6789004",
              "startTime":"0001-01-01T00:00:00",
              "endTime":"0001-01-01T00:00:00",
              "address":"123 kitty cat lane",
              "isComplete":false,
              "courtReporter":{
                 "id":1,
                 "firstName":"Josie",
                 "lastName":"Kitty",
                 "companyName":"Court Reporting Inc",
                 "state":"WA",
                 "address":"132 street address",
                 "accredidation":"My Accrediation",
                 "email":"Emailll@email.com"
              },
              "exhibits":[
              ],
              "notAttendingLawyers":[
                 "amanda@lightningdep.com",
                 "meggan@lightningdep.com"
              ]
           }
        ]
     }
  ]
}

export default lawyer;