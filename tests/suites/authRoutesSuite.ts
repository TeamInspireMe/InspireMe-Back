import supertest from 'supertest';
import request from 'superagent';
import { User } from '../../src/entity/User';
import AuthController from '../../src/controllers/AuthController';

const authRoutesSuite = (server: supertest.SuperTest<supertest.Test>) =>
	describe('Auth routes', () => {
		const userWithCorrectData: User = new User();
		userWithCorrectData.username = 'Bob';
		userWithCorrectData.password = 'bob1';
		userWithCorrectData.email = 'bob@gmail.com';

		describe('Sign Up routes / Local PASSPORT strategy', () => {
			it('Sign Up with correct data should return 201', async done => {
				const res: request.Response = await server
					.post('/api/auth/signup')
					.send(userWithCorrectData);
				expect(res.status).toBe(201);
				done();
			});
			it('Sign Up with an already used username should return 400', async done => {
				const userWithAlreadyUsedusername: User = userWithCorrectData;
				const res = await server
					.post('/api/auth/signup')
					.send(userWithAlreadyUsedusername);
				expect(res.status).toBe(400);
				done();
			});
			it('Sign Up with too short password should return 400', async done => {
				const userWIthTooShortPwd: User = new User();
				userWIthTooShortPwd.username = 'Bob';
				userWIthTooShortPwd.password = 'bob';
				userWIthTooShortPwd.email = 'bob@gmail.com';

				const res: request.Response = await server
					.post('/api/auth/signup')
					.send(userWIthTooShortPwd);
				expect(res.status).toBe(400);
				done();
			});
			it('Sign Up with unformatted mail should return 400', async done => {
				const userWIthTooShortPwd: User = new User();
				userWIthTooShortPwd.username = 'Bob1';
				userWIthTooShortPwd.password = 'bob1';
				userWIthTooShortPwd.email = 'bob@gmail';

				const res: request.Response = await server
					.post('/api/auth/signup')
					.send(userWIthTooShortPwd);
				expect(res.status).toBe(400);
				done();
			});
		});

		describe('Sign In routes', () => {
			it('Sign In with correct data should return 200', async done => {
				const res: request.Response = await server
					.post('/api/auth/signin')
					.send(userWithCorrectData);
				expect(res.status).toBe(200);
				done();
			});
			it('Sign In with unexisting user should return 400', async done => {
				console.log('### SIGNIN BAD1');
				const userNotCreated: User = new User();
				userNotCreated.username = 'unexists';
				userNotCreated.password = 'unexists';
				userNotCreated.email = 'unexists@gmail.com';

				const res: request.Response = await server
					.post('/api/auth/signin')
					.send(userNotCreated);
				expect(res.status).toBe(400);
				done();
			});
			it('Sign In with wrong password should return 400', async done => {
				console.log('### SIGNIN BAD2');
				const userNotCreated: User = new User();
				userNotCreated.username = 'Bob';
				userNotCreated.password = 'wrongPassword';
				userNotCreated.email = 'bob@gmail.com';

				const res: request.Response = await server
					.post('/api/auth/signin')
					.send(userNotCreated);
				expect(res.status).toBe(400);
				done();
			});
		});

		describe('PASSPORT JWT strategy', () => {
			// Step 1 : Define a weel formatted JsonWebToken, but with false data
			const fictiveUser: User = new User();
			fictiveUser.username = 'fictive';
			fictiveUser.password = 'fictive';
			fictiveUser.email = 'fictive@gmail.com';

			const unexistingJWT = AuthController.setToken(fictiveUser);

			// Step 3 : Run test to auth with unformatted token
			it('Should return 401 if given token is incorrectly formatted', async done => {
				const resWithTrueUuid: request.Response = await server
					.get('/api/user/')
					.set('Accept', 'application/json')
					.set('Authorization', 'Bearer incorrectToken');
				expect(resWithTrueUuid.status).toBe(401);
				done();
			});

			// Step 3 : Run test to auth with this unexisting but well formatted token
			it('Should return 500 if given token is well formatted but does not exist - uuid does not matter', async done => {
				const resWithTrueUuid: request.Response = await server
					.get('/api/user/')
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${unexistingJWT}`); // user1 is already deleted
				expect(resWithTrueUuid.status).toBe(500);
				done();
			});
		});
	});

export default authRoutesSuite;
