import axios from 'axios';

export function actionName() {
  return {
    type: "THING",
    payload: {
      var: "VAR"
    }
  }
}

export function ajaxThing() {
  return function(dispatch) {
    axios.get('http://URL')
      .then((response) => {
        dispatch({ type: "THING", payload: response.data})
      })
      .catch((err) => {
        dipatch({type: "ERROR_THING", payload: err})
      })
  }
}