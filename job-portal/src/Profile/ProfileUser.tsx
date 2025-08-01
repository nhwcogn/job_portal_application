import { Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";

const ProfileUser = (props:any) => {
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user);
    const profile = useSelector((state:any) => state.profile);
    const [edit,setEdit]=useState([false, false, false, false, false])
    const [addExp, setAddExp]=useState(false)
    const [addCerti, setAddCerti]=useState(false)
    const handleEdit=(index:any)=>{
        const newEdit=[...edit];
        newEdit[index]=!newEdit[index];
        setEdit(newEdit);
    }
    useEffect(()=>{
        getProfile(user.id).then((data:any)=>{
            dispatch(setProfile(data));
        }).catch((error:any)=>{
            console.error(error);
        })
    }, [])
    return <div className="w-2/3 mx-auto">
        <div className="relative">
            <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
            <img className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="/avatar.png" alt="" />
        </div>
        <div className="px-3 mt-16">
            <Info />    
            </div>    
            <Divider mx="xs" my="xl"/>
            <About />
            <Divider mx="xs" my="xl"/>
            <Skills />
            <Divider mx="xs" my="xl"/>
            <Experience />
            <Divider mx="xs" my="xl"/>
            <Certificate />
    </div>
}
export default ProfileUser;