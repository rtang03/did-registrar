# did-registrar

### Useful Commands

```shell script
docker rm -f \$(docker ps -aq -f status=exited)

# sometimes Postgresql fails to release the port 5432, you need to kill the process manually
sudo lsof -P -sTCP:LISTEN -i TCP -a -p 5432
sudo lsof -i :5432

psql -U postgres

```

Session {
user: {
nickname: 'tangross',
name: 'tangross@hotmail.com',
picture: 'https://s.gravatar.com/avatar/98bbcb716a56a509bb8dc06aab84313d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fta.png',
updated_at: '2021-03-23T14:41:17.714Z',
email: 'tangross@hotmail.com',
email_verified: true,
sub: 'auth0|6059aed4aa7803006a20d824'
},
idToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJTMzh4M2pJTHN4M0J3dHdTM3BCeiJ9.eyJuaWNrbmFtZSI6InRhbmdyb3NzIiwibmFtZSI6InRhbmdyb3NzQGhvdG1haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzk4YmJjYjcxNmE1NmE1MDliYjhkYzA2YWFiODQzMTNkP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdGEucG5nIiwidXBkYXRlZF9hdCI6IjIwMjEtMDMtMjNUMTQ6NDE6MTcuNzE0WiIsImVtYWlsIjoidGFuZ3Jvc3NAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9kYXNoc2xhYi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjA1OWFlZDRhYTc4MDMwMDZhMjBkODI0IiwiYXVkIjoiY0dFeGNQNGN5M2VsanpsaGdoQmhUb1JQNDZiUDNiTFkiLCJpYXQiOjE2MTY1MTA0NzgsImV4cCI6MTYxNjU0NjQ3OCwibm9uY2UiOiJ6VzkzdkI4MzhJR3JobW1Sdmw1Rkk2MEVGamg0OHhFT0RTU3FYVnRBOV9nIn0.NgOYwN8CBCwMJbs5-QlqWPGUm4cuIHqnsEs6bKNfHm11InqwwCJ3X82iL0BBga74O_HLejJ_w7P0k28JJ2S8a0fpix6UeqbzVRlRvJVkGIAUtVFJHefd8b2lZBIng__HDXtxEZTtZbw8r-n6NoXLwupgTG0MzL12TSYHbyRMCrSzKV0MSRXCbUZPruXFLWPSfNMx5_tqYdtsECFB40zFgImAtQvnMC8R19Etn4DP6k1gPYFKhnGy7_00kBSYjeOZAgT8sOZH8usVL-mMm9qYqPQrWx5mQAq4qIevp6F1halulWC23KMPym39Qbp11zLnnZYymdpnFJJZ4ydBqcV6jg',
accessToken: 'XgRAo3Icr5s_X38la55zijYquyx6_gOV',
accessTokenScope: 'openid profile email',
accessTokenExpiresAt: 1616596878,
token_type: 'Bearer'
}

id_token
{
"nickname": "tangross",
"name": "tangross@hotmail.com",
"picture": "https://s.gravatar.com/avatar/98bbcb716a56a509bb8dc06aab84313d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fta.png",
"updated_at": "2021-03-23T14:41:17.714Z",
"email": "tangross@hotmail.com",
"email_verified": true,
"iss": "https://dashslab.us.auth0.com/",
"sub": "auth0|6059aed4aa7803006a20d824",
"aud": "cGExcP4cy3eljzlhghBhToRP46bP3bLY",
"iat": 1616510478,
"exp": 1616546478,
"nonce": "zW93vB838IGrhmmRvl5FI60EFjh48xEODSSqXVtA9_g"
}


https://ec.europa.eu/cefdigital/wiki/display/CEFDIGITALEBSI/Verifiable+Credential+API
https://arxiv.org/pdf/2006.07521.pdf
https://github.com/romitamgai/multitenant-application-example
https://blog.lftechnology.com/designing-a-secure-and-scalable-multi-tenant-application-on-node-js-15ae13dda778
