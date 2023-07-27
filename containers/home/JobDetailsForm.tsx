import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { FormState, IJobDetails } from "../../interface/form";

type JobDetailsFormProps = {
  handleTab: (n: PageNumbers) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
};

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({
  handleTab,
  setFormData,
}) => {
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
       // jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        console.log("tab hit second");
        handleTab(2);
      },
    });

  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    handleChange(e);
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  console.log('errors',errors)

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => {
            handleChangeForm(e, "jobTitle");
          }}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => {
            handleChangeForm(e, "jobDetails");
          }}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => {
            handleChangeForm(e, "jobLocation");
          }}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
