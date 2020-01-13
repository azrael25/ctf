import { gql } from 'apollo-server';

export default gql`
    type Player {
        id: ID!
        name: String
        score: Int!
        tasks: [Task]!
        updatedAt: Int
    }

    type Profile {
        id: ID!
        name: String
        email: String!
        validated: Boolean!
        tasks: [Task]!
        score: Int!
        updatedAt: Int
    }

    type Task {
        id: ID!
        title: String
        description: String
        category: String
        solved: Boolean!
        value: Int!
    }
    
    type FlagSubmitResponse {
        success: Boolean!
        tasks: [Task]
        me: Profile
    }

    type Query {
        tasks: [Task]
        scoreboard: [Player]
        me: Profile
    }
    
    type Mutation {
        signup(name: String, email: String, password: String): String
        login(email: String, password: String): String
        logout: String
        submit(flag: String): FlagSubmitResponse!
    }
`;
