import { GET_ALL, GET_ALL_DIETS, SEARCH_BY_NAME, CLEAN_DATA, FILTER_BY_DIETS, ORDER_BY_SCORE, ORDER_BY_NAME, RECIPE_DETAIL, POST_RECIPE, FILTER_BY_CREATOR } from "../actions/index.js";

const initialState = {
    recipes: [],
    allRecipes: [],
    dietType: [],
    recipeDetail: {},
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };
        case CLEAN_DATA:
            return {
                ...state,
                detail: action.payload,
                
            };
        case SEARCH_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            };
        case GET_ALL_DIETS:
            return {
                ...state,
                dietType: action.payload,
               
            };
        case FILTER_BY_DIETS:
            const allRecipes = state.allRecipes
            const dietsFilter = action.payload === 'ALL' ? allRecipes : allRecipes.filter((el) => el.dietType?.includes(action.payload))
            console.log(dietsFilter)
            return {
                ...state,
                recipes: dietsFilter
            }

        case ORDER_BY_SCORE:
            let hightToLowRecipes =
                action.payload === "Score-+"
                    ? state.recipes.sort((a, b) => a.score - b.score)
                    : state.recipes.sort((a, b) => b.score - a.score);
            return {
                ...state,
                recipes: action.payload === "Order By Score" ? state.recipes : hightToLowRecipes,
            };

        case ORDER_BY_NAME:
            let aZRecipes =
                action.payload === "AZ"
                    ? state.recipes.sort(function (a, b) {
                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                        }
                        if (b.title.toLowerCase() > a.title.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.recipes.sort(function (a, b) {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return 1;
                        }
                        if (b.title.toLowerCase() < a.title.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                    });
            return {
                ...state,
                recipes: action.payload === "default" ? state.recipes : aZRecipes,
            };

        case RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
            }
        case POST_RECIPE:
            return {
                ...state,
            }
        case FILTER_BY_CREATOR:
            const creatorFilter = action.payload === 'createdInDb' ? state.allRecipes.filter(el => el.createdInDb) : state.allRecipes.filter(el => !el.createdInDb)
            return {
                ...state,
                recipes: action.payload === 'ALL' ? state.allRecipes : creatorFilter,

            }
        default:
            return state
    }
}

