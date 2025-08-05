import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card } from "../Data/JobDescData";
//@ts-ignore
import DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";

const JobDesc = (props:any) => {
    const dispatch = useDispatch();
    const [applied, setApplied]=useState(false)
    const profile = useSelector((state:any)=>state.profile)
    const user = useSelector((state:any)=>state.user)
    const handleSaveJob=()=>{
            let savedJobs:any=[...profile.savedJobs];
            if(savedJobs?.includes(props.id)){
                savedJobs=savedJobs?.filter((id:any)=>id!==props.id);
            }else{
                savedJobs=[...savedJobs, props.id];
            }
            let updatedProfile={...profile,savedJobs:savedJobs};
            dispatch(changeProfile(updatedProfile));
        }
        useEffect(() => {
            if(props.applicants?.filter((applicant:any) => applicant.applicantId === user.applicantId)){
                setApplied(true);
            } else {
                setApplied(false);
            }
        }, [props]); 
        const handleClose=()=>{
            postJob({...props, jobStatus: "CLOSED"}).then((res)=>{
                successNotification("Success", "Job Closed Successfully");
            }).catch((err)=>{
                errorNotification("Error", err.response.data.errorMessage)
            })
        }
    const cleanHTML = DOMPurify.sanitize(props.description);
     return <div className="w-2/3">
        <div className="flex justify-between ">
            <div className="flex gap-2 items-center">
                <div className="p-3 bg-mine-shaft-800 rounded-xl">
                    <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
                </div> 
                <div>
                    <div className="font-semibold text-2xl">{props.jobTitle}</div>
                    <div className="text-lg text-mine-shaft-300">{props.company} &#x2022;  {timeAgo(props.postTime)} &#x2022; {props.applicants?props.applicants.length:0} applicants</div>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                {(props.edit || !applied) && <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`} className="w-full"> 
                    <Button color="brightSun.4" size="sm" variant="light">{props.closed?"Reopen":props.edit?"Edit":"Apply"}</Button>
                </Link>}
                {
                    !props.edit && applied && <Button color="green.8" size="sm" variant="light">Applied</Button>
                }
                {props.edit && !props.closed?<Button onClick={handleClose} color="red.5" size="sm" variant="outline">Close</Button>:profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-bright-sun-400" stroke={1.5}/>
                            :<IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" stroke={1.5}/>}
            </div>
        </div>      
        <Divider my="xl"/>
        <div className="flex justify-between">
            {
                card.map((item:any, index:any) => <div key={index} className="flex flex-col items-center gap-1">
                <ActionIcon color="brightSun.4" className="!h-12 !w-12" variant="light" radius="xl" aria-label="Settings">
                    <item.icon className="h-4/5 ư-4/5" stroke={1.5} />
                </ActionIcon>
                <div className="text-sm text-mine-shaft-300">{item.name}</div>
                <div className="font-semibold">{props?props[item.id]:"NA"}{item.id=="packageOffered" && <>$</>}</div>
            </div>)
            } 
        </div>
        <Divider my="xl"/>
        <div>
            <div className="text-xl font-semibold mb-5">Required Skills</div>
            <div className="flex flex-wrap gap-2">
                {
                    props?.skillsRequired?.map((item:any,index:number)=><ActionIcon key={index} color="brightSun.4" className="!h-fit font-medium text-sm !w-fit" variant="light" p="xs" radius="xl" aria-label="Settings">
                    {item}
                </ActionIcon>)
                }
            </div>
        </div>
        <Divider my="xl"/>
        <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify " dangerouslySetInnerHTML={{__html:cleanHTML}}>
        </div>
        <Divider my="xl"/>
        <div>
            <div className="text-xl font-semibold mb-5">About Company</div>
            <div className="flex justify-between mb-3">
            <div className="flex gap-2 items-center">
                <div className="p-3 bg-mine-shaft-800 rounded-xl">
                    <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
                </div> 
                <div className="flex flex-col">
                    <div className="font-medium text-lg">{props.company}</div>
                    <div className="text-mine-shaft-300">10K+ employees</div>
                </div>
            </div>
                <Link to={`/company/${props.company}`}> 
                    <Button color="brightSun.4" variant="light">Company Page</Button>
                </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nemo provident ex nisi libero facilis ipsam in, deleniti eaque ipsa quas mollitia vel earum recusandae voluptates quos aperiam perspiciatis sed! Quisquam porro vel similique placeat esse. In consectetur quas et?</div>
        </div>
     </div>
}
export default JobDesc;