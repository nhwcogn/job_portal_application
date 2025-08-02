import { Divider } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";

const ApplyJobComp = () => {
    return <div className="w-2/3 mx-auto"> 
        <div className="flex justify-between ">
                    <div className="flex gap-2 items-center">
                        <div className="p-3 bg-mine-shaft-800 rounded-xl">
                            <img className="h-14" src={`/Icons/Google.png`} alt="" />
                        </div> 
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold text-2xl">Software Engineer</div>
                            <div className="text-lg text-mine-shaft-300">Google &#x2022; 3 days &#x2022; 14 applicants</div>
                        </div>
                    </div>
            </div>
            <Divider my="xl"/>
            <ApplicationForm/>
    </div>
}
export default ApplyJobComp;