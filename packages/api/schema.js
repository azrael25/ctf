import { gql } from 'apollo-server';

export default gql`
    type Player {
        id: ID!
        name: String
        tasks: [Task]!
    }

    type Profile {
        id: ID!
        name: String
        email: String!
        validated: Boolean!
        tasks: [Task]!
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
    }

    type Query {
        tasks: [Task]!
        scoreboard: [Player]!
        me: Player
    }
    
    type Mutation {
        login(email: String, password: String): String
        submit(flag: String): FlagSubmitResponse!
    }
`;
