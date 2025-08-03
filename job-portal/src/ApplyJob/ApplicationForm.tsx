import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getbase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
    const navigate = useNavigate();
    const user = useSelector((state:any)=>state.user)
    const {id} = useParams();
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const handlePreview = () => {
        form.validate();
        window.scrollTo({top:0, behavior: 'smooth'})
        if(!form.isValid()) return;
        setPreview(!preview);
    };
    const handleSubmit = async() => {
        setSubmit(true);
        let resume:any = await getbase64(form.getValues().resume);
        let applicant = {...form.getValues(), applicantId:user.id, resume: resume.split(',')[1]}
        applyJob(id, applicant).then((res)=>{
            setSubmit(false);
            successNotification("Success", "Application Submitted Successfully")
            navigate("/job-history")
        }).catch((err)=>{
            setSubmit(false);
            errorNotification("Error", err.response.data.errorMessage)
        })
    };
    const form=useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: { 
            name: '', 
            email: '',
            phone: '',
            website: '',
            resume: null,
            coverLetter: ''
        }, 
        validate:{
            name: isNotEmpty("Name is required"),
            email: isNotEmpty("Email is required"),
            phone: isNotEmpty("Phone number is required"),
            website: isNotEmpty("Website is required"),
            resume: isNotEmpty("Resume is required"),
            coverLetter: isNotEmpty("Cover letter is required"),
        }
    });
    return <div>
        <LoadingOverlay className="!fixed"
            visible={submit}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur:2 }}
            loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />
        <div className="text-xl font-semibold mb-5">Submit Your Application</div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-10 [&>*]:w-1/2">
                    <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Full Name" placeholder="Enter your full name" />
                    <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Email" placeholder="Enter your email" />
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Phone Number" placeholder="Enter your phone number" hideControls min={0} max={9999999999}/>
                    <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Personal Website" placeholder="Enter your URL" />
                </div>
                <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5}/>} label="Attach your CV" placeholder="Your CV" leftSectionPointerEvents="none"/>
                <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Cover Letter" placeholder="Write your cover letter here" autosize minRows={4}/>
                {!preview && <Button onClick={handlePreview} color="brightSun.4" variant="light">Preview</Button>}
                {
                    preview && <div className="flex gap-10 [&>*]:w-1/2">
                        <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline">Edit</Button>
                        <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">Submit</Button>
                    </div>
                }
            </div>
    </div>
}
export default ApplicationForm;