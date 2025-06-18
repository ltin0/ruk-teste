/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetMe {\n    me {\n      id\n      name\n      email\n      telephones {\n        area_code\n        number\n      }\n    }\n  }\n": typeof types.GetMeDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(loginInput: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation SignUp($name: String!, $email: String!, $password: String!, $telephones: [TelephoneInput!]!) {\n    signUp(createUserInput: {\n      name: $name,\n      email: $email,\n      password: $password,\n      telephones: $telephones\n    }) {\n      id\n      created_at\n    }\n  }\n": typeof types.SignUpDocument,
};
const documents: Documents = {
    "\n  query GetMe {\n    me {\n      id\n      name\n      email\n      telephones {\n        area_code\n        number\n      }\n    }\n  }\n": types.GetMeDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(loginInput: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($name: String!, $email: String!, $password: String!, $telephones: [TelephoneInput!]!) {\n    signUp(createUserInput: {\n      name: $name,\n      email: $email,\n      password: $password,\n      telephones: $telephones\n    }) {\n      id\n      created_at\n    }\n  }\n": types.SignUpDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMe {\n    me {\n      id\n      name\n      email\n      telephones {\n        area_code\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    me {\n      id\n      name\n      email\n      telephones {\n        area_code\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(loginInput: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(loginInput: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp($name: String!, $email: String!, $password: String!, $telephones: [TelephoneInput!]!) {\n    signUp(createUserInput: {\n      name: $name,\n      email: $email,\n      password: $password,\n      telephones: $telephones\n    }) {\n      id\n      created_at\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($name: String!, $email: String!, $password: String!, $telephones: [TelephoneInput!]!) {\n    signUp(createUserInput: {\n      name: $name,\n      email: $email,\n      password: $password,\n      telephones: $telephones\n    }) {\n      id\n      created_at\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;