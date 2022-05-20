import axios from 'axios';


export const GET_ALL = 'GET_ALL';
export const GET_ALL_DIETS = 'GET_ALL_DIETS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const CLEAN_DATA = 'CLEAN_DATA';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const RECIPE_DETAIL  = 'RECIPE_DETAIL';
export const POST_RECIPE = 'POST_RECIPE';
export const FILTER_BY_CREATOR = 'FILTER_BY_CREATOR';


export function getAll() {
    return function (dispatch) {
        axios.get('http://localhost:3001/recipes')
            .then((json) => {
                return dispatch({
                    type: GET_ALL,
                    payload: json.data
                })
            }).catch((error) => {
                console.log(error.response.data);
            })
    }
};

// export function getAll(){
//     return async function(dispatch){
//         try{
//             const json = await axios.get('http://localhost:3001/recipes');
//             dispatch({
//                 type: GET_ALL,
//                 payload: json.data
//             });
//         }catch(error){
//             console.log(error);
//         }
//     }
// };

export function getAllDiets(dietTypes) {

    return async function (dispatch) {
        try {
            var dietTypes = await axios.get('http://localhost:3001/types');
            console.log(dietTypes.data);
            return dispatch({
                type: GET_ALL_DIETS,
                payload: dietTypes
            });
        } catch (error) {
            console.log(error.response.data)
        }
    }
};

export function searchByName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error.response.data);
        }
    }
};


export const cleanData = () => (dispatch) => {
    let clean = {};
    dispatch({
        type: "CLEAN_DATA",
        payload: clean
    })

}

export function filterByDiets(dietType) {
    return {
        type: FILTER_BY_DIETS,
        payload: dietType
    }
}

export function orderByScore(payload) {
    return {
        type: 'ORDER_BY_SCORE',
        payload: payload,
    }
};

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload: payload
    }
};
export function recipeDetail(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/recipes/${id}`)
            .then(json => dispatch({
                type: "RECIPE_DETAIL",
                payload: json.data
            }))
            .catch(error => console.log(error.json.data))
    }
};

export function postRecipe(payload) {
    //console.log(payload)
    return async function () {
        const creado = await axios.post("http://localhost:3001/recipe", payload)
        //console.log(creado)
        return creado;

    }
};
export function filterByCreator(payload){
    return {
        type: 'FILTER_BY_CREATOR',
        payload: payload,
    }
};