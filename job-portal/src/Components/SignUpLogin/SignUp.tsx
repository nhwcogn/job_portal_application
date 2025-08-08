import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const form = {
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    accountType:"APPLICANT"
}

const SignUp = () => {
    const [data, setData]= useState<{[key:string]:string}>(form);
    const [formError, setFormError] = useState<{[key:string]:string}>(form);     
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleChange = (event: any) => {

        if(typeof(event)=="string"){
            setData({...data, accountType:event});
            return;
        }
        let name=event.target.name, value=event.target.value; 
        setData({...data, [name]: value });
        setFormError({...formError, [name]: signupValidation(name, value)});
        if(name==="password" && data.confirmPassword!==""){
            let err="";
            if(data.confirmPassword!==value) err="Passwords do not match";
            setFormError({...formError, [name]: signupValidation(name, value), confirmPassword: err});
        }
        if(name==="confirmPassword"){
            if(data.password!==value) setFormError({...formError, [name]:"Passwords do not match"});
            else setFormError({...formError, confirmPassword:""});
        }
    }
    const handleSubmit = () => {
        let valid=true, newFormError:{[key:string]:string}={};
        for(let key in data){
            if (key==="accountType") continue;
            if(key!=="confirmPassword") newFormError[key]=signupValidation(key, data[key]);
            else if(data[key]!==data["password"]) newFormError[key]="Passwords do not match";
            if(newFormError[key]) valid=false;
        }
        setFormError(newFormError);
        if(valid===true){
            setLoading(true);
            registerUser(data).then((res) => {
                console.log(res);
                setData(form);
                successNotification("Registration Successful", "Redirecting to login page..."); 
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                },4000)
            }).catch((err) => {
                setLoading(false);
                console.log(err);
                errorNotification("Registration Failed", err.response.data.errorMessage);
            });
        }
    }
    return <><LoadingOverlay
          visible={loading}
          zIndex={1000}
          className="translate-x-1/2"
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        /> <div className="w-1/2 sm-mx:py-20 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">Create Account</div> 
            <TextInput value={data.name} error={formError.name} name="name" onChange={handleChange} withAsterisk label="Full Name" placeholder="Your Name"/>
            <TextInput value={data.email} error={formError.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt size={16} />} label="Your email" placeholder="Your email"/>
            <PasswordInput value={data.password} error={formError.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
            <PasswordInput value={data.confirmPassword} error={formError.confirmPassword} name="confirmPassword" onChange={handleChange} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />
            <Radio.Group value={data.accountType} onChange={handleChange} label="You are?" withAsterisk>
                <div className="flex gap-6 xs-mx:gap-3">
                    <Radio name="accountType" className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 border hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg has-[:checked]:!border-bright-sun-400 " value="APPLICANT" label="Applicant" />
                    <Radio name="accountType" className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 border hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg has-[:checked]:!border-bright-sun-400 " value="EMPLOYER" label="Employer" />
                </div>
            </Radio.Group>
            <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign up</Button>
            <div className="text-center sm-mx:text-sm xs-mx:text-xs">Have an account?<span className="text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs" onClick={() => { navigate("/login"); setFormError(form); setData(form); }} >Login</span></div>
        </div>
    </>
}
export default SignUp;
