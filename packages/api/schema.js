import { gql } from 'apollo-server';

export default gql`
    type Player {
        id: ID!
        name: String
        email: String
        validated: Boolean
        tasks: [Task]
    }

    type Task {
        id: ID!
        title: String
        description: String
        category: String
    }

    type Query {
        tasks: [Task]
        scoreboard: [Player]
    }
`;
