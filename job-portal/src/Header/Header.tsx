import { Avatar, Button, Indicator } from "@mantine/core";
import { IconBell, IconBinoculars, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProfile } from "../Slices/ProfileSlice";
import { getProfile } from "../Services/ProfileService";
import NotiMenu from "./NotiMenu";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user);
    useEffect(()=>{
        getProfile(user.id).then((data:any)=>{
            dispatch(setProfile(data));
        }).catch((error:any)=>{
            console.error(error);
        })
    }, [])
    const location= useLocation();
    return location.pathname != "/sign-up" && location.pathname != "/login" ? <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center bg-mine-shaft-950">
        <div className="flex gap-3 items-center text-bright-sun-400">
            <IconBinoculars className="h-10 w-10" stroke={1.25}/>
            <div className="text-3xl font-semibold">iJOBS</div>
        </div>
        {NavLinks()}
        <div className=" flex gap-3 items-center">
            {user ? <ProfileMenu/>:<Link to="/login">
            <Button variant="subtle" color="brightSun.4">Login</Button>
            </Link>}
            {/* <div className="bg-mine-shaft-900 rounded-full p-1.5">
            <IconSettings stroke={1.5} />
            </div> */}
            {user?<NotiMenu/>:<></>}
        </div>
    </div>:<></>
}
export default Header;