import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { setUser } from "../../Slices/UserSlice";
import { setJwt } from "../../Slices/JwtSlice";
import { loginUser } from "../../Services/AuthService";
import { jwtDecode } from "jwt-decode";

const form = {
    email:"",
    password:""
}

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData]= useState<{[key:string]:string}>(form);
    const [formError, setFormError] = useState<{[key:string]:string}>(form);     
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const handleChange = (event: any) => {
        setFormError({...formError, [event.target.name]:""});
        setData({...data, [event.target.name]: event.target.value });
    }
    const handleSubmit = () => {
        let valid=true, newFormError:{[key:string]:string}={};
        for(let key in data){
            newFormError[key]=loginValidation(key, data[key]);
            if(newFormError[key]) valid=false;
        }
        setFormError(newFormError);
        if(valid){
            setLoading(true);
            loginUser(data).then((res) => {
                successNotification("Login Successful", "Redirecting to home page..."); 
                dispatch(setJwt(res.jwt))
                const decoded = jwtDecode(res.jwt);
                dispatch(setUser({...decoded, email:decoded.sub}));
                setTimeout(() => {
                    navigate("/");
                },4000)
            }).catch((err) => {
                console.log(err);
                errorNotification("Login Failed", err.response.data.errorMessage);
            });
        }
    }
    return <><LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        /><div className="w-1/2 px-20 flex flex-col justify-center gap-3">
                <div className="text-2xl font-semibold">Welcome back</div>
                <TextInput value={data.email} error={formError.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt size={16} />} label="Your email" placeholder="Your email"/>
                <PasswordInput value={data.password} error={formError.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
                <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
                <div className="mx-auto">Don't have an account?<span onClick={() => { navigate("/sign-up"); setFormError(form); setData(form); }} className="text-bright-sun-400 hover:underline cursor-pointer">Sign up</span></div>
                <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password?</div>
            </div>
            <ResetPassword opened={opened} close={close} />
            </>
}
export default Login;
