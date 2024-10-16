import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox } from "@/components/ui/checkbox3";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface CheckBoxDropDownProps {
  itemSource: any[];
  label: string;
  unit: string;
  desc: string;
  selectedVal: any;
  id: any;
  id2?: any;
  field: any;
  maxLength: number,
  maxDiaplay: number,
  handleChangeVal: (id: any,id2: any, field: any, value: any) => void;
}

export default function CheckBoxDropDown({
  itemSource,
  label,
  desc,
  unit,
  selectedVal,
  handleChangeVal,
  id,
  id2 = undefined,
  field,
  maxLength,
  maxDiaplay
}: CheckBoxDropDownProps) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  console.log("selectedVal", selectedVal)

  return (
    <div>
      <FormControl focused className="w-full">
        <InputLabel
          sx={{
            fontWeight: "600",
            color: "#2C5079",
            "&.Mui-focused": {
              color: "#2C5079",
              fontWeight: "600",
              fontSize: "18px",
            },
          }}
          id="demo-multiple-checkbox-label"
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          size="small"
          multiple
          value={selectedVal || []}
          onChange={(e) => handleChangeVal(id,id2, field, e.target.value)}
          input={<OutlinedInput label={label} />}
          renderValue={(value) => value.length === 0 ?
            `Select` :
            `${desc} ${
              selectedVal
                ? selectedVal.length === maxLength ? 
                  maxDiaplay : selectedVal.length
                : 0
            } ${unit}`
          } // Provide fallback for renderValue
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            borderRadius: "10px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #1D7A9B", // Customize border color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #1D7A9B", // Customize border color on focus
              fontSize: "18px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #1D7A9B", // Hover border color
            },
            "& .MuiSelect-icon": {
              color: "#83A2AD", // Customize arrow icon color
            },
          }}
        >
          {itemSource.map((item) => (
            <MenuItem key={item.desc} value={item.id}>
              <Checkbox checked={selectedVal?.includes(item.id)} />
              <ListItemText primary={item.desc} className="pl-2" />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
