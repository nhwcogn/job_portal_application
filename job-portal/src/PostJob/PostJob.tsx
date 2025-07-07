import { TagsInput } from "@mantine/core";
import { fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";

const PostJob = () => {
    const select = fields;
    return <div className="w-3/4 mx-auto">
        <div className="text-2xl font-semibold mb-5">Post Job</div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput {...select[0]}/>
                <SelectInput {...select[1]}/>
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput {...select[2]}/>
                <SelectInput {...select[3]}/>
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput {...select[4]}/>
                <SelectInput {...select[5]}/>
            </div> 
            <TagsInput label="Skills" placeholder="Add skills" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur/>
        </div>
    </div>
}
export default PostJob;
