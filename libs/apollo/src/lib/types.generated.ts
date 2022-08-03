import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthOutput = {
  __typename?: 'AuthOutput';
  token: Scalars['String'];
};

export type BaseInput = {
  /** Unique identifier */
  id: Scalars['ID'];
};

export type CreateFolderInput = {
  /** Notes in the folder */
  notes?: InputMaybe<Array<BaseInput>>;
  /** Folder name */
  title: Scalars['String'];
};

export type Folder = {
  __typename?: 'Folder';
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** Unique identifier */
  id: Scalars['ID'];
  /** Notes in the folder */
  notes?: Maybe<Array<Note>>;
  /** Folder name */
  title: Scalars['String'];
  /** User who owns the folder */
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFolder: Folder;
  createNote: Note;
  createUser: User;
  login: AuthOutput;
  removeFolder: Folder;
  removeNote: Note;
  removeUser: User;
  signup: AuthOutput;
  updateFolder: Folder;
  updateNote: Note;
  updateUser: User;
};

export type MutationCreateFolderArgs = {
  createFolderInput: CreateFolderInput;
};

export type MutationCreateNoteArgs = {
  createNoteInput: NoteInput;
};

export type MutationCreateUserArgs = {
  createUserInput: UserInput;
};

export type MutationLoginArgs = {
  authArgs: UserInput;
};

export type MutationRemoveFolderArgs = {
  id: Scalars['ID'];
};

export type MutationRemoveNoteArgs = {
  id: Scalars['ID'];
};

export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};

export type MutationSignupArgs = {
  getAuthArgs: UserInput;
};

export type MutationUpdateFolderArgs = {
  updateFolderInput: UpdateFolderInput;
};

export type MutationUpdateNoteArgs = {
  updateNoteInput: UpdateNoteInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Note = {
  __typename?: 'Note';
  /** Content of the note */
  content: Scalars['String'];
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** Folder of the note */
  folder: Folder;
  /** Unique identifier */
  id: Scalars['ID'];
  /** Title of the note */
  title: Scalars['String'];
  /** User who created the note */
  user: User;
};

export type NoteInput = {
  /** Content of the note */
  content?: InputMaybe<Scalars['String']>;
  /** Folder of the note */
  folder: BaseInput;
  /** Title of the note */
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  folder: Folder;
  folders: Array<Folder>;
  me: User;
  note: Note;
  notes: Array<Note>;
  user: User;
  users: Array<User>;
};

export type QueryFolderArgs = {
  id: Scalars['ID'];
};

export type QueryNoteArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type UpdateFolderInput = {
  id: Scalars['ID'];
  /** Notes in the folder */
  notes?: InputMaybe<Array<BaseInput>>;
  /** Folder name */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateNoteInput = {
  /** Content of the note */
  content?: InputMaybe<Scalars['String']>;
  /** Folder of the note */
  folder?: InputMaybe<BaseInput>;
  /** Unique identifier */
  id: Scalars['ID'];
  /** Title of the note */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  /** User email */
  email?: InputMaybe<Scalars['String']>;
  /** Unique identifier */
  id: Scalars['ID'];
  /** User password */
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** User email */
  email: Scalars['String'];
  /** User folder */
  folders?: Maybe<Array<Folder>>;
  /** Unique identifier */
  id: Scalars['ID'];
  notes?: Maybe<Array<Note>>;
  /** User password */
  password: Scalars['String'];
};

export type UserInput = {
  /** User email */
  email: Scalars['String'];
  /** User password */
  password: Scalars['String'];
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: { __typename?: 'User'; id: string; email: string };
};

export type LoginMutationVariables = Exact<{
  authArgs: UserInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'AuthOutput'; token: string };
};

export type SignupMutationVariables = Exact<{
  getAuthArgs: UserInput;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: { __typename?: 'AuthOutput'; token: string };
};

export type GetFoldersQueryVariables = Exact<{ [key: string]: never }>;

export type GetFoldersQuery = {
  __typename?: 'Query';
  folders: Array<{
    __typename?: 'Folder';
    id: string;
    createdAt: any;
    title: string;
  }>;
};

export const MeDocument = gql`
  query me {
    me {
      id
      email
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
  mutation login($authArgs: UserInput!) {
    login(authArgs: $authArgs) {
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      authArgs: // value for 'authArgs'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const SignupDocument = gql`
  mutation signup($getAuthArgs: UserInput!) {
    signup(getAuthArgs: $getAuthArgs) {
      token
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      getAuthArgs: // value for 'getAuthArgs'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const GetFoldersDocument = gql`
  query getFolders {
    folders {
      id
      createdAt
      title
    }
  }
`;

/**
 * __useGetFoldersQuery__
 *
 * To run a query within a React component, call `useGetFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFoldersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFoldersQuery,
    GetFoldersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFoldersQuery, GetFoldersQueryVariables>(
    GetFoldersDocument,
    options
  );
}
export function useGetFoldersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFoldersQuery,
    GetFoldersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFoldersQuery, GetFoldersQueryVariables>(
    GetFoldersDocument,
    options
  );
}
export type GetFoldersQueryHookResult = ReturnType<typeof useGetFoldersQuery>;
export type GetFoldersLazyQueryHookResult = ReturnType<
  typeof useGetFoldersLazyQuery
>;
export type GetFoldersQueryResult = Apollo.QueryResult<
  GetFoldersQuery,
  GetFoldersQueryVariables
>;