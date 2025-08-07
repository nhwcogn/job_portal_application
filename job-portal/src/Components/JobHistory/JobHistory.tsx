import { Tabs } from "@mantine/core";
import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { profile } from "console";
import { useSelector } from "react-redux";

const JobHistory = () => {
    const profile = useSelector((state:any)=>state.profile)
    const user = useSelector((state:any)=>state.user)
    const [activeTab, setActiveTab] = useState<any>('APPLIED')
    const [jobList, setJobList] = useState<any>([])
    const [showList, setShowList] = useState<any>([])
    useEffect(()=>{
        getAllJobs().then((res)=>{
            setJobList(res)
            setShowList(res.filter((job:any)=>{
                let found = false;
                job.applicants?.forEach((applicant:any)=>{
                    if(applicant.applicantId==user.id && applicant.applicationStatus=="APPLIED"){
                        found=true
                    }
                })
                return found
            }))
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    const handleTabChange=(value:string|null)=>{
        setActiveTab(value);
        if(value=="SAVED"){
            setShowList(jobList.filter((job:any)=>profile.savedJobs?.includes(job.id)));
        }else{
            setShowList(jobList.filter((job:any)=>{
                let found = false;
                job.applicants?.forEach((applicant:any)=>{
                    if(applicant.applicantId==user.id && applicant.applicationStatus==value){
                        found=true
                    }
                })
                return found
            }))
        }
    }
    return (
    <div>
        <div className="text-2xl font-semibold mb-5">Job History</div>
        <div>
            <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg">
                <Tabs.List className=" font-semibold [&_button[data-active='true']]:!border-b-mine-shaft-950 [&_button]:!text-xl sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:[&_button]:!py-2 mb-5 [&_button[data-active='true']]:text-bright-sun-400 xs-mx:font-medium">
                    <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                    <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                    <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                    <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={activeTab} className="[&>div]:w-full">
                    <div className="mt-10 flex flex-wrap gap-5">
                        {
                            showList.map((item:any, index:any)=> <Card key={index} {...item} {...{[activeTab.toLowerCase()]:true}}/>)
                        }
        </div>
                </Tabs.Panel>
                
            </Tabs>
        </div>
    </div>
  );
};
export default JobHistory;
