// imports actions, 
import * as ActionTypes from './ActionTypes';

// then takes campsites state, initializes with default 
// param and then takes actions dispatched to it
export const campsites = (state = { isLoading: true,
                                     errMess: null,
                                     campsites: []}, action) => {
    // goes thru each action and if action matches, it creates a new state,
    // if not, it returns the old state
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};