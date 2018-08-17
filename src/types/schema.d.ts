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
}

interface IMutation {
__typename: "Mutation";
createPost: IPost | null;
register: boolean | null;
}

interface ICreatePostOnMutationArguments {
input: ICreatePostInput;
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
}

// tslint:enable
