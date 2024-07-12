import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productDetailsReducer, productsReducer ,
    productReducer,
    newProductReducer,newReviewReducer, productReviewsReducer} from "./reducers/ProductReducer"
import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, usersDetailsReducer, contactReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { newOrderReducer ,myOrdersReducer,orderDetailsReducer, allOrdersReducer, orderReducer ,} from "./reducers/orderReducer"

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview:newReviewReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:usersDetailsReducer,
    productReviews:productReviewsReducer,
    contact:contactReducer
})
let initialState = {
    cart:{
        cartItems : localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo:localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }
    
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;