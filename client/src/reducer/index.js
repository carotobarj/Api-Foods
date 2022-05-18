import { GET_ALL, GET_ALL_DIETS, FILTER_BY_CREATOR, FILTER_BY_DIETS, ORDER_BY_SCORE, ORDER_BY_NAME, SEARCH_BY_NAME, RECIPE_DETAIL, CLEAN_DATA, POST_RECIPE } from '../actions';

const initialState = {
    recipes: [],
    allRecipes: [],
    RecipeDetail: [],
    dietType: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,

            }

        case GET_ALL_DIETS:
            console.log(action.payload)
            return {
                ...state,
                dietType: action.payload,

            }

        case FILTER_BY_CREATOR:
            const creatorFilter = action.payload === 'createdInDb' ? state.allRecipes.filter(el => el.createdInDb) : state.allRecipes.filter(el => !el.createdInDb)
            return {
                ...state,
                recipes: action.payload === 'ALL' ? state.allRecipes : creatorFilter,

            }

        case FILTER_BY_DIETS:
            const allRecipes = state.allRecipes
            const dietsFilter = action.payload === 'ALL' ? allRecipes : allRecipes.filter((el) => el.dietType.includes(action.payload))
            console.log(dietsFilter)
            return {
                ...state,
                recipes: dietsFilter
            }
        // case FILTER_BY_DIETS:
        //     const allRecipes = state.allRecipes;
        //     let filterRecipes = [];
        //     if(action.payload === "ALL") {
        //         filterRecipes = allRecipes
        //     } else {
        //         for (let i = 0; i < allRecipes.length; i++) {
        //             let found =  allRecipes[i].dietType
        //             let found2 = found.map((e) => e === action.payload);
                    
        //             if(found2) filterRecipes.push(allRecipes[i])
        //         }
        //     }
        //     return {
        //         ...state,
        //         recipes: filterRecipes
        //     };

        case ORDER_BY_SCORE:
            let hightToLowRecipes = action.payload === "score-+" ? state.recipes.sort((a, b) => {
                if (a.score > b.score) {
                    return 1;
                } if (b.score > a.score) {
                    return -1;
                }
                return 0;
            }) :
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })
                console.log(hightToLowRecipes)
            return {
                ...state,
                recipes: hightToLowRecipes
            }

        case ORDER_BY_NAME:
            let aZRecipes = action.payload === "AZ" ? state.allRecipes.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (b.title > a.title) {
                    return -1;
                }
                return 0;
            }) :
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: aZRecipes
            }

        case SEARCH_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
            }
        case RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
            }
        case POST_RECIPE:
            return {
                ...state,
            }

        case CLEAN_DATA:
            return {
                ...state,
                recipes: [],
            }
           
        default:
            return state;
        }
    }


export default rootReducer;