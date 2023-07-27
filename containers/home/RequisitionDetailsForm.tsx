import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { FormState, IRequisitionDetails } from "../../interface/form";
import { genderOptions, urgencyOptions } from "./constants";



type RequisitionDetailsFormProps = {
  handleTab: (n: PageNumbers) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
};

const RequisitionDetailsForm: React.FC<RequisitionDetailsFormProps> = ({
  handleTab,
  setFormData,
}) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      console.log('tab hit first')
      handleTab(1);
    },
  });

  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    handleChange(e);
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => {
            handleChangeForm(e, "requisitionTitle");
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => {
            handleChangeForm(e, "noOfOpenings");
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(field:string,value:string) => {
            setFieldValue(field,value);
            setFormData(prev=>({...prev,[field]:value}))
          }}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(field:string,value:string)=>{
            setFieldValue(field,value);
            setFormData(prev=>({...prev,[field]:value}))
          }}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
