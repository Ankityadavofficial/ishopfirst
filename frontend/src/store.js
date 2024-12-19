import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./reducers/Admin"
import CartReducer from "./reducers/Cart"
import UserReducer from "./reducers/User"




// import AdminListReducer from "./reducers/AdminList";
const store = configureStore(
    {
        reducer: {
            "admin": AdminReducer,
            "cart": CartReducer,
            "user": UserReducer,





            // "adminLists": AdminListReducer
        }
    }
)

export default store;