import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type CollabInput = {
  email: Scalars['String'];
  id: Scalars['String'];
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
  /** Last updated */
  updatedAt: Scalars['DateTime'];
  /** User who owns the folder */
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCollaborator: Note;
  collabUpdateNote: Note;
  createFolder: Folder;
  createNote: Note;
  createUser: User;
  login: AuthOutput;
  logout: AuthOutput;
  removeFolder: Folder;
  removeNote: Note;
  removeUser: User;
  signup: AuthOutput;
  updateFolder: Folder;
  updateNote: Note;
  updateUser: User;
};


export type MutationAddCollaboratorArgs = {
  collaboratorEmail: Scalars['String'];
  noteId: Scalars['String'];
};


export type MutationCollabUpdateNoteArgs = {
  updateNoteInput: UpdateNoteInput;
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
  /** Collaborators */
  collaborators: Array<User>;
  /** Content of the note */
  content: Scalars['String'];
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** Folder of the note */
  folder: Folder;
  /** Unique identifier */
  id: Scalars['ID'];
  shared: Scalars['Boolean'];
  /** Title of the note */
  title: Scalars['String'];
  /** Last updated */
  updatedAt: Scalars['DateTime'];
  /** User who created the note */
  user: User;
};

export type NoteInput = {
  /** Content of the note */
  content?: InputMaybe<Scalars['String']>;
  /** Folder of the note */
  folder: BaseInput;
  /** Shared note */
  shared?: InputMaybe<Scalars['Boolean']>;
  /** Title of the note */
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  folder: Folder;
  folders: Array<Folder>;
  getNotesForCollaborator: Array<Note>;
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

export type Subscription = {
  __typename?: 'Subscription';
  isOnline: IsOnline;
  noteUpdated: Note;
};


export type SubscriptionNoteUpdatedArgs = {
  id: Scalars['String'];
};

export type UpdateFolderInput = {
  id: Scalars['ID'];
  /** Notes in the folder */
  notes?: InputMaybe<Array<BaseInput>>;
  /** Folder name */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateNoteInput = {
  /** Array of the collaborators */
  collaborators?: InputMaybe<Array<CollabInput>>;
  /** Content of the note */
  content?: InputMaybe<Scalars['String']>;
  /** Folder of the note */
  folder?: InputMaybe<BaseInput>;
  /** Unique identifier */
  id: Scalars['ID'];
  shared?: InputMaybe<Scalars['Boolean']>;
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
  /** Last updated */
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  /** User email */
  email: Scalars['String'];
  /** User password */
  password: Scalars['String'];
};

export type IsOnline = {
  __typename?: 'isOnline';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string } };

export type LoginMutationVariables = Exact<{
  authArgs: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthOutput', token: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'AuthOutput', token: string } };

export type SignupMutationVariables = Exact<{
  getAuthArgs: UserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthOutput', token: string } };

export type CreateFolderMutationVariables = Exact<{
  createFolderInput: CreateFolderInput;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', title: string } };

export type RemoveFolderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveFolderMutation = { __typename?: 'Mutation', removeFolder: { __typename: 'Folder' } };

export type RemoveNoteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveNoteMutation = { __typename?: 'Mutation', removeNote: { __typename?: 'Note', title: string } };

export type GetFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFoldersQuery = { __typename?: 'Query', folders: Array<{ __typename?: 'Folder', id: string, title: string, notes?: Array<{ __typename?: 'Note', id: string, title: string, shared: boolean, user: { __typename?: 'User', id: string } }> | null }> };

export type GetSharedNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSharedNotesQuery = { __typename?: 'Query', getNotesForCollaborator: Array<{ __typename?: 'Note', id: string, title: string, shared: boolean, user: { __typename?: 'User', id: string }, folder: { __typename?: 'Folder', id: string, title: string } }> };

export type CreateNoteMutationVariables = Exact<{
  createNoteInput: NoteInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', id: string, title: string, content: string } };

export type UpdateNoteMutationVariables = Exact<{
  updateNoteInput: UpdateNoteInput;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateNote: { __typename?: 'Note', id: string, title: string, content: string, shared: boolean } };

export type AddCollaboratorMutationVariables = Exact<{
  collaboratorEmail: Scalars['String'];
  noteId: Scalars['String'];
}>;


export type AddCollaboratorMutation = { __typename?: 'Mutation', addCollaborator: { __typename?: 'Note', id: string, title: string, content: string, shared: boolean } };

export type CollabUpdateNoteMutationVariables = Exact<{
  updateNoteInput: UpdateNoteInput;
}>;


export type CollabUpdateNoteMutation = { __typename?: 'Mutation', collabUpdateNote: { __typename?: 'Note', id: string, title: string, content: string } };

export type GetNoteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetNoteQuery = { __typename?: 'Query', note: { __typename?: 'Note', id: string, title: string, content: string, createdAt: any, shared: boolean, collaborators: Array<{ __typename?: 'User', id: string, email: string }> } };

export type IsOnlineSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IsOnlineSubscription = { __typename?: 'Subscription', isOnline: { __typename?: 'isOnline', id?: string | null, email?: string | null } };

export type NoteUpdatedSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type NoteUpdatedSubscription = { __typename?: 'Subscription', noteUpdated: { __typename?: 'Note', id: string, title: string, content: string } };

export type UpdateFolderMutationVariables = Exact<{
  updateFolderInput: UpdateFolderInput;
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', updateFolder: { __typename?: 'Folder', id: string, title: string } };


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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    token
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SignupDocument = gql`
    mutation signup($getAuthArgs: UserInput!) {
  signup(getAuthArgs: $getAuthArgs) {
    token
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

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
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const CreateFolderDocument = gql`
    mutation createFolder($createFolderInput: CreateFolderInput!) {
  createFolder(createFolderInput: $createFolderInput) {
    title
  }
}
    `;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      createFolderInput: // value for 'createFolderInput'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const RemoveFolderDocument = gql`
    mutation removeFolder($id: ID!) {
  removeFolder(id: $id) {
    __typename
  }
}
    `;
export type RemoveFolderMutationFn = Apollo.MutationFunction<RemoveFolderMutation, RemoveFolderMutationVariables>;

/**
 * __useRemoveFolderMutation__
 *
 * To run a mutation, you first call `useRemoveFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFolderMutation, { data, loading, error }] = useRemoveFolderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFolderMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFolderMutation, RemoveFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFolderMutation, RemoveFolderMutationVariables>(RemoveFolderDocument, options);
      }
export type RemoveFolderMutationHookResult = ReturnType<typeof useRemoveFolderMutation>;
export type RemoveFolderMutationResult = Apollo.MutationResult<RemoveFolderMutation>;
export type RemoveFolderMutationOptions = Apollo.BaseMutationOptions<RemoveFolderMutation, RemoveFolderMutationVariables>;
export const RemoveNoteDocument = gql`
    mutation removeNote($id: ID!) {
  removeNote(id: $id) {
    title
  }
}
    `;
export type RemoveNoteMutationFn = Apollo.MutationFunction<RemoveNoteMutation, RemoveNoteMutationVariables>;

/**
 * __useRemoveNoteMutation__
 *
 * To run a mutation, you first call `useRemoveNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeNoteMutation, { data, loading, error }] = useRemoveNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveNoteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveNoteMutation, RemoveNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveNoteMutation, RemoveNoteMutationVariables>(RemoveNoteDocument, options);
      }
export type RemoveNoteMutationHookResult = ReturnType<typeof useRemoveNoteMutation>;
export type RemoveNoteMutationResult = Apollo.MutationResult<RemoveNoteMutation>;
export type RemoveNoteMutationOptions = Apollo.BaseMutationOptions<RemoveNoteMutation, RemoveNoteMutationVariables>;
export const GetFoldersDocument = gql`
    query getFolders {
  folders {
    id
    title
    notes {
      id
      title
      shared
      user {
        id
      }
    }
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
export function useGetFoldersQuery(baseOptions?: Apollo.QueryHookOptions<GetFoldersQuery, GetFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, options);
      }
export function useGetFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoldersQuery, GetFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, options);
        }
export type GetFoldersQueryHookResult = ReturnType<typeof useGetFoldersQuery>;
export type GetFoldersLazyQueryHookResult = ReturnType<typeof useGetFoldersLazyQuery>;
export type GetFoldersQueryResult = Apollo.QueryResult<GetFoldersQuery, GetFoldersQueryVariables>;
export const GetSharedNotesDocument = gql`
    query getSharedNotes {
  getNotesForCollaborator {
    id
    title
    user {
      id
    }
    folder {
      id
      title
    }
    shared
  }
}
    `;

/**
 * __useGetSharedNotesQuery__
 *
 * To run a query within a React component, call `useGetSharedNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSharedNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSharedNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSharedNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetSharedNotesQuery, GetSharedNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSharedNotesQuery, GetSharedNotesQueryVariables>(GetSharedNotesDocument, options);
      }
export function useGetSharedNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSharedNotesQuery, GetSharedNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSharedNotesQuery, GetSharedNotesQueryVariables>(GetSharedNotesDocument, options);
        }
export type GetSharedNotesQueryHookResult = ReturnType<typeof useGetSharedNotesQuery>;
export type GetSharedNotesLazyQueryHookResult = ReturnType<typeof useGetSharedNotesLazyQuery>;
export type GetSharedNotesQueryResult = Apollo.QueryResult<GetSharedNotesQuery, GetSharedNotesQueryVariables>;
export const CreateNoteDocument = gql`
    mutation createNote($createNoteInput: NoteInput!) {
  createNote(createNoteInput: $createNoteInput) {
    id
    title
    content
  }
}
    `;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      createNoteInput: // value for 'createNoteInput'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const UpdateNoteDocument = gql`
    mutation updateNote($updateNoteInput: UpdateNoteInput!) {
  updateNote(updateNoteInput: $updateNoteInput) {
    id
    title
    content
    shared
  }
}
    `;
export type UpdateNoteMutationFn = Apollo.MutationFunction<UpdateNoteMutation, UpdateNoteMutationVariables>;

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      updateNoteInput: // value for 'updateNoteInput'
 *   },
 * });
 */
export function useUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoteMutation, UpdateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument, options);
      }
export type UpdateNoteMutationHookResult = ReturnType<typeof useUpdateNoteMutation>;
export type UpdateNoteMutationResult = Apollo.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const AddCollaboratorDocument = gql`
    mutation addCollaborator($collaboratorEmail: String!, $noteId: String!) {
  addCollaborator(collaboratorEmail: $collaboratorEmail, noteId: $noteId) {
    id
    title
    content
    shared
  }
}
    `;
export type AddCollaboratorMutationFn = Apollo.MutationFunction<AddCollaboratorMutation, AddCollaboratorMutationVariables>;

/**
 * __useAddCollaboratorMutation__
 *
 * To run a mutation, you first call `useAddCollaboratorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollaboratorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollaboratorMutation, { data, loading, error }] = useAddCollaboratorMutation({
 *   variables: {
 *      collaboratorEmail: // value for 'collaboratorEmail'
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useAddCollaboratorMutation(baseOptions?: Apollo.MutationHookOptions<AddCollaboratorMutation, AddCollaboratorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCollaboratorMutation, AddCollaboratorMutationVariables>(AddCollaboratorDocument, options);
      }
export type AddCollaboratorMutationHookResult = ReturnType<typeof useAddCollaboratorMutation>;
export type AddCollaboratorMutationResult = Apollo.MutationResult<AddCollaboratorMutation>;
export type AddCollaboratorMutationOptions = Apollo.BaseMutationOptions<AddCollaboratorMutation, AddCollaboratorMutationVariables>;
export const CollabUpdateNoteDocument = gql`
    mutation collabUpdateNote($updateNoteInput: UpdateNoteInput!) {
  collabUpdateNote(updateNoteInput: $updateNoteInput) {
    id
    title
    content
  }
}
    `;
export type CollabUpdateNoteMutationFn = Apollo.MutationFunction<CollabUpdateNoteMutation, CollabUpdateNoteMutationVariables>;

/**
 * __useCollabUpdateNoteMutation__
 *
 * To run a mutation, you first call `useCollabUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCollabUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [collabUpdateNoteMutation, { data, loading, error }] = useCollabUpdateNoteMutation({
 *   variables: {
 *      updateNoteInput: // value for 'updateNoteInput'
 *   },
 * });
 */
export function useCollabUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CollabUpdateNoteMutation, CollabUpdateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CollabUpdateNoteMutation, CollabUpdateNoteMutationVariables>(CollabUpdateNoteDocument, options);
      }
export type CollabUpdateNoteMutationHookResult = ReturnType<typeof useCollabUpdateNoteMutation>;
export type CollabUpdateNoteMutationResult = Apollo.MutationResult<CollabUpdateNoteMutation>;
export type CollabUpdateNoteMutationOptions = Apollo.BaseMutationOptions<CollabUpdateNoteMutation, CollabUpdateNoteMutationVariables>;
export const GetNoteDocument = gql`
    query getNote($id: ID!) {
  note(id: $id) {
    id
    title
    content
    createdAt
    shared
    collaborators {
      id
      email
    }
  }
}
    `;

/**
 * __useGetNoteQuery__
 *
 * To run a query within a React component, call `useGetNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNoteQuery(baseOptions: Apollo.QueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, options);
      }
export function useGetNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, options);
        }
export type GetNoteQueryHookResult = ReturnType<typeof useGetNoteQuery>;
export type GetNoteLazyQueryHookResult = ReturnType<typeof useGetNoteLazyQuery>;
export type GetNoteQueryResult = Apollo.QueryResult<GetNoteQuery, GetNoteQueryVariables>;
export const IsOnlineDocument = gql`
    subscription isOnline {
  isOnline {
    id
    email
  }
}
    `;

/**
 * __useIsOnlineSubscription__
 *
 * To run a query within a React component, call `useIsOnlineSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIsOnlineSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOnlineSubscription({
 *   variables: {
 *   },
 * });
 */
export function useIsOnlineSubscription(baseOptions?: Apollo.SubscriptionHookOptions<IsOnlineSubscription, IsOnlineSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IsOnlineSubscription, IsOnlineSubscriptionVariables>(IsOnlineDocument, options);
      }
export type IsOnlineSubscriptionHookResult = ReturnType<typeof useIsOnlineSubscription>;
export type IsOnlineSubscriptionResult = Apollo.SubscriptionResult<IsOnlineSubscription>;
export const NoteUpdatedDocument = gql`
    subscription noteUpdated($id: String!) {
  noteUpdated(id: $id) {
    id
    title
    content
  }
}
    `;

/**
 * __useNoteUpdatedSubscription__
 *
 * To run a query within a React component, call `useNoteUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNoteUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteUpdatedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNoteUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NoteUpdatedSubscription, NoteUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NoteUpdatedSubscription, NoteUpdatedSubscriptionVariables>(NoteUpdatedDocument, options);
      }
export type NoteUpdatedSubscriptionHookResult = ReturnType<typeof useNoteUpdatedSubscription>;
export type NoteUpdatedSubscriptionResult = Apollo.SubscriptionResult<NoteUpdatedSubscription>;
export const UpdateFolderDocument = gql`
    mutation updateFolder($updateFolderInput: UpdateFolderInput!) {
  updateFolder(updateFolderInput: $updateFolderInput) {
    id
    title
  }
}
    `;
export type UpdateFolderMutationFn = Apollo.MutationFunction<UpdateFolderMutation, UpdateFolderMutationVariables>;

/**
 * __useUpdateFolderMutation__
 *
 * To run a mutation, you first call `useUpdateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFolderMutation, { data, loading, error }] = useUpdateFolderMutation({
 *   variables: {
 *      updateFolderInput: // value for 'updateFolderInput'
 *   },
 * });
 */
export function useUpdateFolderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFolderMutation, UpdateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument, options);
      }
export type UpdateFolderMutationHookResult = ReturnType<typeof useUpdateFolderMutation>;
export type UpdateFolderMutationResult = Apollo.MutationResult<UpdateFolderMutation>;
export type UpdateFolderMutationOptions = Apollo.BaseMutationOptions<UpdateFolderMutation, UpdateFolderMutationVariables>;