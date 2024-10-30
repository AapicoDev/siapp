"use client";
interface StepIconProps {
  icon: any;
  active: any;
  completed: any;
}

export function CustomStepIcon({ icon, active, completed }: StepIconProps) {
  return (
    <div
      style={{
        backgroundColor: active || completed ? "#4C9BF5" : "#C7D4D7", // Active or passed step circle color
        color: "#FFFFFF", // Text color inside the step icon
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px", // Font size for the step number
      }}
    >
      {icon}
    </div>
  );
}
