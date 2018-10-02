const graphql = require('graphql');

const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;
const _ = require('lodash');

//dummyData

var rooms = [
    {name: "Rumpus", random:"Taro", id:'1', user_id:"1"},
    {name: "BoomBoom", random:"Jacob", id:'2', user_id:"2"},
    {name: "War", random:"Sieh", id:'3', user_id:"3"},
]

var users = [
    {name: "taro", age: "27", id:"1"},
    {name: "anna", age: "24", id:"2"},
    {name: "saty", age:"4", id:"3"}
]

const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields:() =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        random: {type: GraphQLString},
        user_id: {
            type: UserType,
            resolve(parent, args){
                console.log(parent);
                return _.find(users, {id: parent.user_id});
            }
        
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:() =>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})
const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        room: {
            type: RoomType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                console.log(args);

                return _.find(rooms, {id: args.id});

            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(users, {id: args.id});
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})