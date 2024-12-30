import * as yup from "yup";

export const schemaTask = yup.object({
    name: yup.string().required("Task name is required"),
    assignee: yup.string().required("Assignee is required"),
    status: yup.string().required("Task status is required"),
    expiryAt: yup.string().required("Date is required"),
});

export const schemaProject = yup.object({
    name: yup.string().required("Project name is required"),
});