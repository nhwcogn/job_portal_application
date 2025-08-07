import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import MultiInput from "./MultiInput";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { dropdownData } from "../../Data/JobsData";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const matches = useMediaQuery('(max-width: 475px)');
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 300]);
    const handleChange = (event:any)=>
        {dispatch(updateFilter({salary:event}));}
    return ( <div>
        <div className="flex justify-end">
        {matches&&<Button onClick={toggle} m="sm" radius="lg" className="align" variant="outline" color="brightSun.4" autoContrast>{opened?"Close":"Filters"}</Button>}
        </div>
        <Collapse in={(opened || !matches)}>
        <div className=" flex lg-mx:!flex-wrap px-5 py-8 !text-mine-shaft-100">
        {
            dropdownData.map((item, index) => {
            return <React.Fragment key={index}>
                <div className=" w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1"> 
                    <MultiInput title={item.title} icon={item.icon} options={item.options} />
                </div> 
                <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
            </React.Fragment>
            })
        }
        <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:mb-1 xs-mx:w-full text-mine-shaft-300 text-sm [&_.matine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between ">
                <div>Salary</div>
                <div>${value[0]} - ${value[1]}</div>
            </div>
            <RangeSlider color="brightSun.4" size="xs" value={value} onChange={setValue} onChangeEnd={handleChange}/>
        </div>
    </div>
    </Collapse>
    </div>
    )
}
export default SearchBar;