// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    console.log("state->",state)
    console.log("action->",action)
    switch (action.type) {
        case 'updateCurso-list':
            const CursoUpList = state.curso;
            CursoUpList.list = action.list;
            return { ...state, curso: CursoUpList }
        default:
            return state;
    }
}