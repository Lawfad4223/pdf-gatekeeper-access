
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const HoneypotField = ({ value, onChange }: HoneypotFieldProps) => {
  return (
    <div className="hidden">
      <Label htmlFor="website">Website (leave blank)</Label>
      <Input
        id="website"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
};

export default HoneypotField;
