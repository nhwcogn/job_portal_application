import IconBinoculars from "@tabler/icons-react/dist/esm/icons/IconBinoculars";
import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

const SignUpPage = () => {
    const location = useLocation()
    const navigate = useNavigate();
    return <div className={`w-[100vw] h-[100vh] overflow-hidden sm-mx:overflow-y-auto relative`}>
        <Button size="sm" className="!absolute left-5 z-10" onClick={() => navigate("/")} my="lg" color="brightSun.4" leftSection={<IconArrowLeft size={20}/>} variant="light">Home</Button>
            <div className={`flex [&>*]:flex-shrink-0 transition-all relative ease-in-out duration-1000 ${location.pathname=='/sign-up'?'-translate-x-1/2 sm-mx:-translate-x-full':'translate-x-0'}`}>
                <Login/>
                <div className={`w-1/2 h-[100vh] sm-mx:hidden sm-mx:min-h-full transition-all duration-1000 flex items-center gap-5 justify-center flex-col ${location.pathname == '/sign-up'?'rounded-r-[200px]':'rounded-l-[200px]'} bg-mine-shaft-900`}>
                    <div className="flex gap-3 items-center text-bright-sun-400">
                        <IconBinoculars className="h-20 w-20" stroke={1.25}/>
                        <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-semibold">iJOBS</div>
                    </div>
                    <div className="text-2xl bs-mx:text-xl md-mx:text-lg text-mine-shaft-200 font-semibold">Find the made for you</div>
                </div>
                <SignUp/>
            </div>
        </div>
}
export default SignUpPage;