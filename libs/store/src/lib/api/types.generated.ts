import { api } from 'libs/store/src/lib/api/base';
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
  note: Note;
  notes: Array<Note>;
  user: User;
  users: Array<User>;
};

export type QueryFolderArgs = {
  id: Scalars['ID'];
};

export type QueryFoldersArgs = {
  userId: Scalars['ID'];
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

export type SignupMutationVariables = Exact<{
  getAuthArgs: UserInput;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: { __typename?: 'AuthOutput'; token: string };
};

export const SignupDocument = `
    mutation signup($getAuthArgs: UserInput!) {
  signup(getAuthArgs: $getAuthArgs) {
    token
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    signup: build.mutation<SignupMutation, SignupMutationVariables>({
      query: variables => ({ document: SignupDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSignupMutation } = injectedRtkApi;
