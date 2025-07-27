import IconBinoculars from "@tabler/icons-react/dist/esm/icons/IconBinoculars";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

const SignUpPage = () => {
    const location = useLocation()
    const navigate = useNavigate();
    return <div className="min-h-[90vh] bg-mine-shaft-950 overflow-hidden relative">
        <Button size="sm" className="!absolute left-5" onClick={() => navigate("/")} my="lg" color="brightSun.4" leftSection={<IconArrowLeft size={20}/>} variant="light">Home</Button>
            <div className={`w-[100vw] h-[100vh] transition-all ease-in-out flex [&>*]:flex-shrink-0 ${location.pathname=='/sign-up'?'-translate-x-1/2':'translate-x-0'}`}>
                <Login/>
                <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out ${location.pathname == "/sign-up"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col`}>
                    <div className="flex gap-3 items-center text-bright-sun-400">
                        <IconBinoculars className="h-20 w-20" stroke={1.25}/>
                        <div className="text-6xl font-semibold">iJOBS</div>
                    </div>
                    <div className="text-2xl text-mine-shaft-200 font-semibold">Find the made for you</div>
                </div>
                <SignUp/>
            </div>
        </div>
}
export default SignUpPage;