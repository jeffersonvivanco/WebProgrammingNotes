import todosReducer, {add, TodosState} from "./todosSlice";

describe('todos reducer', () => {
    const initialState: TodosState = {
        listOfTodos: []
    }

    it('should handle initial state', () => {
        expect(todosReducer(undefined, {type: 'unknown'})).toEqual(
            {
                listOfTodos: ['Have a healthy breakfast']
            }
        )
    });

    it('should handle adding a todo item', () => {
        const actual = todosReducer(initialState, add('Write test cases'));
        expect(actual.listOfTodos).toEqual(['Write test cases']);
    });
})
