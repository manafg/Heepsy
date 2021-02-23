export const initState = [];

export const reducer = (state, action ) =>{
    switch(action.type) {
        case "AddToFavriote":
            return  [...state,action.payload]
        case "RemoveFromFavriote" : 
            let index = state.indexOf(action.payload)
            return [...state.slice(0,index),...state.slice(index + 1)]
        default :
         return state
    }
}