import typePost from './src/core/enums';

interface Type {
    id: number,
    type: typePost
}

interface UserToRegister {
	username: string;
	password: string;
	email: string;
}