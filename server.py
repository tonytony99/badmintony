import random
import flask
from flask import request
import json
import math
app = flask.Flask(__name__)
app.config["DEBUG"] = True

sessionsdict = {}
sessionsdict[123] = {
    "id": 13396310,
    "created": "2020-04-03T09:04:42.041Z",
    "lastUpdated": "2020-04-03T09:04:42.041Z",
    "duration": None,
    "began": None,
    "ended": None,
    "players": [
        {
            "id": 234,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "name": "Tom",
            "played": 0,
            "won": 0
        },
        {
            "id": 3557992,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "name": "Sam",
            "played": 0,
            "won": 0
        },
        {
            "id": 32758688,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "name": "Sam",
            "played": 0,
            "won": 0
        },
        {
            "id": 81487339,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "name": "Loz",
            "played": 0,
            "won": 0
        },
        {
            "id": 22201070,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "name": "Ron",
            "played": 0,
            "won": 0
        }
    ],
    "teams": [
        {
            "id": 456,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "players": [
                78876833,
                3557992
            ],
            "played": 0,
            "won": 0
        },
        {
            "id": 98061902,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "players": [
                32758688,
                81487339
            ],
            "played": 0,
            "won": 0
        },
        {
            "id": 23993779,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "players": [
                32758688,
                22201070
            ],
            "played": 0,
            "won": 0
        },
        {
            "id": 21370721,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "players": [
                78876833,
                81487339
            ],
            "played": 0,
            "won": 0
        },
        {
            "id": 51914949,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "players": [
                3557992,
                81487339
            ],
            "played": 0,
            "won": 0
        }
    ],
    "matches": [
        {
            "id": 41672872,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "duration": None,
            "began": None,
            "ended": None,
            "games": [
                {
                    "id": 38184341,
                    "created": "2020-04-03T09:04:42.041Z",
                    "lastUpdated": "2020-04-03T09:04:42.041Z",
                    "court": [
                        [
                            3557992,
                            78876833
                        ],
                        [
                            32758688,
                            81487339
                        ]
                    ],
                    "score": [
                        0,
                        0
                    ],
                    "winner": None,
                    "firstTo": 21,
                    "upperLimit": 30,
                    "servingTeam": 0,
                    "servingSide": 1
                }
            ],
            "teams": [
                58852557,
                98061902
            ],
            "score": [
                0,
                0
            ],
            "winner": None,
            "firstTo": 21,
            "upperLimit": 30,
            "bestOf": 3
        },
        {
            "id": 59620602,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "duration": None,
            "began": None,
            "ended": None,
            "games": [
                {
                    "id": 66390329,
                    "created": "2020-04-03T09:04:42.041Z",
                    "lastUpdated": "2020-04-03T09:04:42.041Z",
                    "court": [
                        [
                            22201070,
                            32758688
                        ],
                        [
                            78876833,
                            81487339
                        ]
                    ],
                    "score": [
                        0,
                        0
                    ],
                    "winner": None,
                    "firstTo": 21,
                    "upperLimit": 30,
                    "servingTeam": 0,
                    "servingSide": 1
                }
            ],
            "teams": [
                23993779,
                21370721
            ],
            "score": [
                0,
                0
            ],
            "winner": None,
            "firstTo": 21,
            "upperLimit": 30,
            "bestOf": 3
        },
        {
            "id": 46343557,
            "created": "2020-04-03T09:04:42.041Z",
            "lastUpdated": "2020-04-03T09:04:42.041Z",
            "duration": None,
            "began": None,
            "ended": None,
            "games": [
                {
                    "id": 81826210,
                    "created": "2020-04-03T09:04:42.041Z",
                    "lastUpdated": "2020-04-03T09:04:42.041Z",
                    "court": [
                        [
                            22201070,
                            32758688
                        ],
                        [
                            3557992,
                            81487339
                        ]
                    ],
                    "score": [
                        0,
                        0
                    ],
                    "winner": None,
                    "firstTo": 21,
                    "upperLimit": 30,
                    "servingTeam": 0,
                    "servingSide": 1
                }
            ],
            "teams": [
                23993779,
                51914949
            ],
            "score": [
                0,
                0
            ],
            "winner": None,
            "firstTo": 21,
            "upperLimit": 30,
            "bestOf": 3
        }
    ]
}


def getIndexFromId(l, id):
    return [i for i, item in enumerate(l) if item.id == id]


def getById(l, lid):
    for item in l:
        if item['id'] == lid:
            return item


def removeById(l, lid):
    for i, item in l:
        if item['id'] == lid:
            return item

def newId():
    return random.randint(10 ** 5, 10 ** 16)

@app.route('/session/<int:session_id>/team/<int:team_id>', methods=['GET', 'PUT'])
def team(session_id, team_id):
    response = flask.Response()
    responseCode = 200
    if not (session_id in sessionsdict):
        return "", 404
    session = sessionsdict[session_id]
    teams = session['teams']
    team = getById(teams, team_id)

    if (request.method == "GET"):
        if not team:
            return "", 404
        response = flask.jsonify(team)
        print(f"Found team at session/{session_id}/team/{team_id}")

    if (request.method == "PUT"):
        newTeam = request.json
        if team:
            teamIndex = teams.index(team)
            teams[teamIndex] = newTeam
            print(f"Updated team at session/{session_id}/team/{team_id}")
        else:
            teams.append(newTeam)
            responseCode = 201
            print(f"Added team at session/{session_id}/team/{team_id}")

    response.headers.add('Access-Control-Allow-Origin', 'localhost')
    return response, responseCode

@app.route('/session/<int:session_id>/player/<int:player_id>', methods=['GET', 'PUT'])
def player(session_id, player_id):
    response = flask.Response()
    responseCode = 200
    if not (session_id in sessionsdict):
        return "", 404
    session = sessionsdict[session_id]
    players = session['players']
    player = getById(players, player_id)

    if (request.method == "GET"):
        if not player:
            return "", 404
        response = flask.jsonify(player)
        print(f"Found player at session/{session_id}/player/{player_id}")

    if (request.method == "PUT"):
        newPlayer = request.json
        if player:
            playerIndex = players.index(player)
            players[playerIndex] = newPlayer
            print(f"Updated player at session/{session_id}/player/{player_id}")
        else:
            players.append(newPlayer)
            responseCode = 201
            print(f"Added player at session/{session_id}/player/{player_id}")

    response.headers.add('Access-Control-Allow-Origin', 'localhost')
    return response, responseCode

@app.route('/session/<int:session_id>', methods=['GET', 'PUT'])
def session(session_id):
    response = flask.Response()
    responseCode = 200
    session = sessionsdict[session_id]

    if (request.method == "GET"):
        if not session:
            return "", 404
        response = flask.jsonify(session)
        print(f"Found session/{session_id}")

    if (request.method == "PUT"):
        newSession = request.json
        sessionsdict[session_id] = newSession
        if session:
            print(f"Updated session/{session_id}")
        else:
            responseCode = 201
            print(f"Added session/{session_id}")

    response.headers.add('Access-Control-Allow-Origin', 'localhost')
    return response, responseCode


app.run()
