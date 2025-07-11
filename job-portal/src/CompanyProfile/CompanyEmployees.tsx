import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees = () => {
    return <div className="mt-10 flex flex-wrap gap-10">
            {
            talents.map((talent, item)=>item<6 && <TalentCard key={item} {...talent}/>)
        }
        </div>
}
export default CompanyEmployees;