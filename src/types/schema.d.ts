// tslint:disable
// graphql typescript definitions

export namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
posts: Array<IPost>;
post: IPost | null;
users: Array<IUser>;
user: IUser | null;
me: IUser | null;
hello: string;
}

interface IPostOnQueryArguments {
id: string;
}

interface IUserOnQueryArguments {
id: string;
}

interface IHelloOnQueryArguments {
name?: string | null;
}

interface IPost {
__typename: "Post";
id: string;
title: string;
content: string;
user: IUser;
}

interface IUser {
__typename: "User";
id: string;
email: string;
posts: Array<IPost>;
}

interface IMutation {
__typename: "Mutation";
createPost: IPost | null;
login: ILoginResponse | null;
register: IRegisterResponse | null;
}

interface ICreatePostOnMutationArguments {
input: ICreatePostInput;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
email: string;
password: string;
}

interface ICreatePostInput {
title: string;
content: string;
userId: string;
}

interface ILoginResponse {
__typename: "LoginResponse";
user: IUser | null;
authenticated: boolean | null;
token: string | null;
}

interface IRegisterResponse {
__typename: "RegisterResponse";
success: boolean | null;
authenticated: boolean | null;
token: string | null;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}
}

// tslint:enable
