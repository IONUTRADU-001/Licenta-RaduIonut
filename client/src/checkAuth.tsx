import React, { PropsWithChildren, useEffect } from 'react'
import { useContext, useDispatch } from "./context";
import { UserService } from "./services/user.service";
import { useService } from "./hooks/useService";

const CheckAuth: React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useContext();
    const userService = useService(UserService);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem("token")
        let user = JSON.parse(localStorage.getItem("user"));
        
        userService.getUser(token).then((user) => {
            dispatch({ type: "setUser", user, ready: true });
        })
    }, [])

    return (
        <>{children}</>
    )
}

export default CheckAuth