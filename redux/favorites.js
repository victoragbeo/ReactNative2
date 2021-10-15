import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch (action.type) {
// store ids of each fav campsite in state as an array
// then if user tries to add new Fav, we will receive id of
// campsite thats been Fav as payload
        case ActionTypes.ADD_FAVORITE:
// check if ID has already been added in states array usin 
// includes(). we pass action.payload to see if it matches in the array
            if (state.includes(action.payload)) {
            // if the campsite ID matches, we'll return state as true
                return state;
            }
// if Fav ID doesnt exist, we return new state with new Fav id added to the end of 
// state by using concat.
            return state.concat(action.payload);
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(favorite => favorite !== action.payload);
        default:
            return state;
    }
};