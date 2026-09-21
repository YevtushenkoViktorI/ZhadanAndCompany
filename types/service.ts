export type ServiceId = "moving" | "delivery" | "assembly" | "cleaning" | "electrical";

export type ServiceDefinition = {
  id: ServiceId;
  icon: "truck" | "package" | "tool" | "sparkles" | "lightbulb";
};
