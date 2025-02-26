import * as yup from "yup";

 const schema = yup.object().shape({

    taskTitle: yup.string().required("Task title is required"),
    description: yup.string().required("Description is required"),
    priority: yup.string().required("Priority is required"),
    status: yup.string().required("State is required"),
    image: yup
        .mixed()
        .required("Image is required")
        .test("fileType", "Only image files are allowed", (value) =>
            value && value[0] && value[0].type.startsWith("image/")
        ),
});
export default schema