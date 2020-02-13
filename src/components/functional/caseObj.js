let cases = [{
  "id": 2,
  "name": "Name of Caes",
  "caseNumber": "Case Number Goes Here",
  "court": "Court of Washington",
  "date": "2020-01-21T22:01:30.1914606-08:00",
  "isActive": true,
  "plantiff": "Plantiff Name",
  "defendant": "Defendant Name",
  "caseType": null,
  "plantiffLawyers": [
      {
          "id": 1,
          "firstName": "Amanda",
          "lastName": "Iverson",
          "firm": "We Always Win Firm",
          "address": "123 Candy Cane Lane",
          "bar_Number": "123BarNumber",
          "state_Issued": "WA",
          "userID": null,
          "email": "amanda@wealwayswin.com"
      },
      {
        "id": 3,
        "firstName": "Michelle",
        "lastName": "Smith",
        "firm": "We Always Win Firm",
        "address": "123 Candy Cane Lane",
        "bar_Number": "123BarNumber",
        "state_Issued": "WA",
        "userID": null,
        "email": "michelle@wealwayswin.com"
    }
  ],
  "defendentLawyers": [
      {
          "id": 1,
          "firstName": "Lena",
          "lastName": "Eivy",
          "firm": "We Always Win Firm",
          "address": "123 Candy Cane Lane",
          "bar_Number": "123BarNumber",
          "state_Issued": "WA",
          "userID": null,
          "email": "lena@wealwayswin.com"
      }
  ],
  "depositions": [
    {"id": 0,
      "witnessName": "Meggan Triplett",
      "date": "2020-01-21T22:01:30.2009572-08:00",
      "dayOfWeek": 1,
      "address": "432 5th ave",
      "courtReporterID": 3,
      "caseID": 2,
      "isActive": false,
      "courtReporter": {
        "id": 1,
        "firstName": "Alisa",
        "lastName": "Smith",
        "companyName": "I report all the things",
        "address": "123 address lane",
        "userID": null},
      "case": null,
      "exhibits": [
        {"id": 1,
          "name": "Email",
          "documentID": 0,
          "courtReporterID": 0,
          "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
          "url": "www.supersecretURL.com",
          "document": 
            {"id": 0,
            "lawyerID": 1,
            "depositionID": 0,
            "documentType": 4,
            "isPublic": true,
            "url": "MyURL.com"},
          "courtReporter": 
            {"id": 1,
            "firstName": "Alisa",
            "lastName": "Smith",
            "companyName": "I report all the things",
            "address": "123 address lane",
            "userID": null}
        }],
        "documents": null,
        "notAttending":["michelle@wealwayswin.com"]
      },
      {
        "id": 1,
        "witnessName": "bob dylan",
        "date": "2019-03-21T22:01:30.2009572-08:00",
        "dayOfWeek": 1,
        "address": "432 5th ave",
        "courtReporterID": 3,
        "caseID": 2,
        "isActive": true,
        "courtReporter": {
            "id": 1,
            "firstName": "Alisa",
            "lastName": "Smith",
            "companyName": "I report all the things",
            "address": "123 address lane",
            "userID": null
        },
        "case": null,
        "exhibits": [
            {
                "id": 0,
                "name": "Email",
                "documentID": 0,
                "courtReporterID": 0,
                "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
                "url": "www.supersecretURL.com",
                "document": {
                    "id": 0,
                    "lawyerID": 1,
                    "depositionID": 0,
                    "documentType": 4,
                    "isPublic": true,
                    "url": "MyURL.com"
                },
                "courtReporter": {
                    "id": 1,
                    "firstName": "Alisa",
                    "lastName": "Smith",
                    "companyName": "I report all the things",
                    "address": "123 address lane",
                    "userID": null
                }
            },
            {"id": 3,
            "witnessName": "Kermit The Frog",
            "date": "2019-06-21T22:01:30.2009572-08:00",
            "dayOfWeek": 1,
            "address": "432 5th ave",
            "courtReporterID": 3,
            "caseID": 2,
            "isActive": false,
            "courtReporter": {
              "id": 1,
              "firstName": "Alisa",
              "lastName": "Smith",
              "companyName": "I report all the things",
              "address": "123 address lane",
              "userID": null},
            "case": null,
            "exhibits": [
              {"id": 1,
                "name": "Email",
                "documentID": 0,
                "courtReporterID": 0,
                "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
                "url": "www.supersecretURL.com",
                "document": 
                  {"id": 0,
                  "lawyerID": 1,
                  "depositionID": 0,
                  "documentType": 4,
                  "isPublic": true,
                  "url": "MyURL.com"},
                "courtReporter": 
                  {"id": 1,
                  "firstName": "Alisa",
                  "lastName": "Smith",
                  "companyName": "I report all the things",
                  "address": "123 address lane",
                  "userID": null}
              }],
              "documents": null,
              "notAttending":["michelle@wealwayswin.com"]
            },
            {"id": 4,
            "witnessName": "Miss Piggy",
            "date": "2020-01-21T22:01:30.2009572-08:00",
            "dayOfWeek": 1,
            "address": "432 5th ave",
            "courtReporterID": 3,
            "caseID": 2,
            "isActive": true,
            "courtReporter": {
              "id": 1,
              "firstName": "Alisa",
              "lastName": "Smith",
              "companyName": "I report all the things",
              "address": "123 address lane",
              "userID": null},
            "case": null,
            "exhibits": [
              {"id": 1,
                "name": "Email",
                "documentID": 0,
                "courtReporterID": 0,
                "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
                "url": "www.supersecretURL.com",
                "document": 
                  {"id": 0,
                  "lawyerID": 1,
                  "depositionID": 0,
                  "documentType": 4,
                  "isPublic": true,
                  "url": "MyURL.com"},
                "courtReporter": 
                  {"id": 1,
                  "firstName": "Alisa",
                  "lastName": "Smith",
                  "companyName": "I report all the things",
                  "address": "123 address lane",
                  "userID": null}
              }],
              "documents": null,
              "notAttending":["michelle@wealwayswin.com"]
            },
        ],
        "documents": null,
        "notAttending":["michelle@wealwayswin.com"]
    }
  ]
},
{
  "id": 1,
  "name": "Name of Caes",
  "caseNumber": "Case Number Goes Here",
  "court": "Court of Washington",
  "date": "2020-01-21T22:01:30.1914606-08:00",
  "isActive": false,
  "plantiff": "Plantiff Name",
  "defendant": "Defendant Name",
  "caseType": null,
  "plantiffLawyers": [
      {
          "id": 1,
          "firstName": "Amanda",
          "lastName": "Iverson",
          "firm": "We Always Win Firm",
          "address": "123 Candy Cane Lane",
          "bar_Number": "123BarNumber",
          "state_Issued": "WA",
          "userID": null,
          "email": "amanda@wealwayswin.com"
      },
      {
        "id": 3,
        "firstName": "bob",
        "lastName": "Smith",
        "firm": "We Always Win Firm",
        "address": "123 Candy Cane Lane",
        "bar_Number": "123BarNumber",
        "state_Issued": "WA",
        "userID": null,
        "email": "michelle@wealwayswin.com"
    }
  ],
  "defendentLawyers": [
      {
          "id": 1,
          "firstName": "Lena",
          "lastName": "Eivy",
          "firm": "We Always Win Firm",
          "address": "123 Candy Cane Lane",
          "bar_Number": "123BarNumber",
          "state_Issued": "WA",
          "userID": null,
          "email": "lena@wealwayswin.com"
      }
  ],
  "depositions": [
      {
          "id": 3,
          "witnessName": "Tom Cruise",
          "date": "2020-01-21T22:01:30.2009572-08:00",
          "dayOfWeek": 1,
          "isActive": false,
          "address": "432 5th ave",
          "courtReporterID": 3,
          "caseID": 2,
          "courtReporter": {
              "id": 1,
              "firstName": "Alisa",
              "lastName": "Smith",
              "companyName": "I report all the things",
              "address": "123 address lane",
              "userID": null
          },
          "case": null,
          "exhibits": [
              {
                  "id": 0,
                  "name": "Email",
                  "documentID": 0,
                  "courtReporterID": 0,
                  "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
                  "url": "www.supersecretURL.com",
                  "document": {
                      "id": 0,
                      "lawyerID": 1,
                      "depositionID": 0,
                      "documentType": 4,
                      "isPublic": true,
                      "url": "MyURL.com"
                  },
                  "courtReporter": {
                      "id": 1,
                      "firstName": "Alisa",
                      "lastName": "Smith",
                      "companyName": "I report all the things",
                      "address": "123 address lane",
                      "userID": null
                  }
              }
          ],
          "documents": null,
          "notAttending":["michelle@wealwayswin.com"]
      },
      {
        "id": 4,
        "witnessName": "Nichole Kidman",
        "date": "2020-01-21T22:01:30.2009572-08:00",
        "dayOfWeek": 1,
        "address": "432 5th ave",
        "courtReporterID": 3,
        "caseID": 2,
        "courtReporter": {
            "id": 1,
            "firstName": "Alisa",
            "lastName": "Smith",
            "companyName": "I report all the things",
            "address": "123 address lane",
            "userID": null
        },
        "case": null,
        "exhibits": [
            {
                "id": 0,
                "name": "Email",
                "documentID": 0,
                "courtReporterID": 0,
                "dateStamped": "2020-01-21T22:01:30.2023321-08:00",
                "url": "www.supersecretURL.com",
                "document": {
                    "id": 0,
                    "lawyerID": 1,
                    "depositionID": 0,
                    "documentType": 4,
                    "isPublic": true,
                    "url": "MyURL.com"
                },
                "courtReporter": {
                    "id": 1,
                    "firstName": "Alisa",
                    "lastName": "Smith",
                    "companyName": "I report all the things",
                    "address": "123 address lane",
                    "userID": null
                }
            }
        ],
        "documents": null,
        "notAttending":[]
    }
  ]
}]

export default cases;