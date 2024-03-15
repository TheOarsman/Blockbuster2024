import {
    UPDATE_LIST,
    ADD_TO_LIST,
    REMOVE_FROM_LIST,
    UPDATE_LIST_QUANTITY,
    CLEAR_LIST,
    TOGGLE_LIST
} from './actions';

const initialState = {
    list: [],
    categories: [],
    currentCategory: '',
};

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIST:
            return {
                ...state,
                list: [...action.list],
            };

        case ADD_TO_LIST:
            return {
                ...state,
                list: [...state.list, action.book],
            };

        case REMOVE_FROM_LIST:
            return {
                ...state,
                list: state.list.filter((book) => book.bookId !== action.bookId),
            };

        case UPDATE_LIST_QUANTITY:
            return {
                ...state,
                list: state.list.map((book) =>
                    book.bookId === action.bookId
                        ? { ...book, quantity: action.quantity }
                        : { ...book }
                ),
            };

        case CLEAR_LIST:
            return {
                ...state,
                list: [],
            };

        case TOGGLE_LIST:
            return {
                ...state,
                list: state.list.map((book) =>
                    book.bookId === action.bookId
                        ? { ...book, saved: !book.saved }
                        : { ...book }
                ),
            };

        default:
            return state;
    }
};

export default reducers;