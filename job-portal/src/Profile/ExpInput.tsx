import { useState } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput=(props:any)=>{
    const select = fields;
    const [desc, setDesc]= useState("As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process.")
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [checked, setChecked]= useState(false)
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">{props.add?"Add":"Edit"} Experience</div>
        <div className="flex gap-10 [&>*]:w-1/2">
                        <SelectInput {...select[0]}/>
                        <SelectInput {...select[1]}/>
                </div>
                <SelectInput {...select[2]}/>
                <Textarea withAsterisk label="Summary" value={desc} placeholder="Enter summary..." autosize minRows={3} onChange={(event) => setDesc(event.currentTarget.value)}/>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <MonthPickerInput withAsterisk maxDate={endDate || undefined} label="Start date" placeholder="Start date" value={startDate} onChange={setStartDate}/>
                    <MonthPickerInput disabled={checked} withAsterisk minDate={startDate || undefined} maxDate={new Date()} label="Start date" placeholder="End date" value={endDate} onChange={setEndDate}/>
                </div>
                <Checkbox checked={checked} onChange={(event)=>setChecked(event.currentTarget.checked)} autoContrast label="Currently working here"/>
                <div className="flex gap-5">
                    <Button onClick={()=>props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
                    <Button color="red.8" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
                </div>
    </div>
}
export default ExpInput;
