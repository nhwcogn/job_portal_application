import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";

const SearchBar = () => {
    const [value, setValue] = useState<[number, number]>([1, 100]);
    return <div className="flex p-5 py-8">
        {
           dropdownData.map((item, index)=><> <div key={index} className="w-1/5"> 
            <MultiInput {...item}/>
            </div> 
            <Divider mr="xs" size="xs" orientation="vertical" />
            </>)
        }
        <div className="w-1/5 [&_.matine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between ">
                <div>Salary</div>
                <div>${value[0]} - ${value[1]}</div>
            </div>
            <RangeSlider color="brightSun.4" size="xs" value={value} 
            labelTransitionProps={{
                transition: 'skew-down',
                duration: 150,
                timingFunction: 'linear',
            }} 
            onChange={setValue} />
        </div>
        
    </div>
}
export default SearchBar;