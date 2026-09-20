export type ServiceId = "moving" | "delivery" | "assembly" | "cleaning";

export type ServiceDefinition = {
  id: ServiceId;
  icon: "truck" | "package" | "tool" | "sparkles";
};
