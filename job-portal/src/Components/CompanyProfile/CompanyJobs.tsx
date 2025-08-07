import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs = () => {
    return <div>
        <div className="mt-10 flex flex-wrap gap-3">
            {
            jobList.map((job, item)=> <JobCard key={item} {...job}/>)
        }
        </div>
    </div>
}
export default CompanyJobs;