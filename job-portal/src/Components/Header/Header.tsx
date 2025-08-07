import { Avatar, Button, Indicator } from "@mantine/core";
import { IconBell, IconBinoculars, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProfile } from "../../Slices/ProfileSlice";
import { getProfile } from "../../Services/ProfileService";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user);
    const token = useSelector((state:any)=> state.jwt)
    const location= useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        setupResponseInterceptor(navigate)
    }, [navigate])
    useEffect(()=>{
        
        if(token!=""){
            const decoded = jwtDecode(localStorage.getItem("token")||"");
            dispatch(setUser({...decoded, email:decoded.sub}));
        }
        getProfile(user?.profileId).then((res)=>{
            dispatch(setProfile(res));
        }).catch((err)=>{
            console.log(err);
        })
    }, [token, navigate])
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