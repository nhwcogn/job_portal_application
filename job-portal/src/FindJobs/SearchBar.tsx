import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 300]);
    const handleChange = (event:any)=>
        {dispatch(updateFilter({salary:event}));}
    return <div className="flex p-5 py-8">
        {
            dropdownData.map((item, index) => {
            return <React.Fragment key={index}>
                <div className="w-1/5"> 
                    <MultiInput title={item.title} icon={item.icon} options={item.options} />
                </div> 
                <Divider mr="xs" size="xs" orientation="vertical" />
            </React.Fragment>
            })
        }
        <div className="w-1/5 [&_.matine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between ">
                <div>Salary</div>
                <div>${value[0]} - ${value[1]}</div>
            </div>
            <RangeSlider color="brightSun.4" size="xs" value={value} onChange={setValue} onChangeEnd={handleChange}/>
        </div>
        
    </div>
}
export default SearchBar;