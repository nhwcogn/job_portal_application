import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";
import { getAllJobs } from "../../Services/JobService";

const Jobs=() => {
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState([{}]);
    const filter = useSelector((state:any)=>state.filter);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);
    const sort = useSelector((state:any)=>state.sort);
    useEffect(() => {
        dispatch(resetFilter());
        dispatch(resetSort());
        getAllJobs().then((res) => {
            setJobList(res.filter((job:any)=>job.jobStatus=="ACTIVE"));
        }).catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        if (sort === "Salary: Low to High") {
            setJobList([...jobList].sort((a: any, b: any) =>
                a.packageOffered - b.packageOffered
            ));
        } else if (sort === "Salary: High to Low") {
            setJobList([...jobList].sort((a: any, b: any) =>
                b.packageOffered - a.packageOffered
            ));
        }
    }, [sort]);

    useEffect(()=>{
        let filterJob = jobList;
        if(filter["Job Title"] && filter["Job Title"].length>0){
            filterJob = filterJob.filter((job: any) =>
        job.jobTitle &&filter["Job Title"].some((title: any) =>
        job.jobTitle.toLowerCase().includes(title.toLowerCase())));
        }
        if(filter.Location && filter.Location.length>0){
            filterJob = filterJob.filter((job: any) =>
        job.location &&filter.Location.some((location: any) =>job.location.toLowerCase().includes(location.toLowerCase())));
        }
        if(filter.Experience && filter.Experience.length>0){
            filterJob = filterJob.filter((job: any) =>
        job.experience &&filter.Experience.some((experience: any) =>job.experience.toLowerCase().includes(experience.toLowerCase())));
        }
        if(filter["Job Type"] && filter["Job Type"].length>0){
            filterJob = filterJob.filter((job: any) =>
        job.jobType &&filter["Job Type"].some((title: any) =>
        job.jobType.toLowerCase().includes(title.toLowerCase())));
        }
        if (filter.salary && filter.salary.length > 0) {
            filterJob = filterJob.filter((jobs: any) =>filter.salary[0]<=jobs.packageOffered && jobs.packageOffered<=filter.salary[1])
        }

        setFilteredJobs(filterJob)
    }, [filter, jobList])
    return (
        <div className="px-5 py-5">
            <div className="flex justify-between flex-wrap mt-5">
                <div className="text-2xl xs-mx:text-xl font-semibold">Recommended Jobs</div>
                <Sort sort="job" />
            </div>
            <div className="mt-10 flex flex-wrap gap-5">
                {
                    filteredJobs .map((job:any, item:any)=> <JobCard key={item} {...job}/>)
                }
            </div>
        </div>
    );
}
export default Jobs;