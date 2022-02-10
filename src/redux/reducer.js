import { DISHES } from '../shares/dishes';
import { COMMENTS } from '../shares/comments';
import { PROMOTIONS } from '../shares/promotions';
import { LEADERS } from '../shares/leaders';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
    return state;
};