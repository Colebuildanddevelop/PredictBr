const initialState = {
  isLoading: true, 
  test: ''
}

const graph = (state=initialState, action) => {
  switch(action.type) {
    case 'TEST': {
      return {
        isLoading: false,
        test: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default graph;