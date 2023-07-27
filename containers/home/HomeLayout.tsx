import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import { FormState } from "@/interface/form";

export interface IRequisitionDetailsValues {
  requestTitle: string;
  owner: string;
  hiringManager: string;
  noOfOpenings: string;
  urgency: string;
  employmentType: string;
  prefferedGender: string;
  status: string;
}

export interface IJobDetailsValues {
  jobTitle: string;
  jobDetails: string;
  jobLocation: string;
}

export interface IInterviewSettingsValues {
  interviewMode: string;
  interviewDuration: string;
  interviewLanguage: string;
}

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [page, setPage] = useState<PageNumbers>(0);
  const [formData, setFormData] = useState<FormState>({
    requisitionTitle: "",
    noOfOpenings: 0,
    urgency: "",
    gender: "",
    jobTitle: "",
    jobDetails: "",
    jobLocation: "",
    interviewMode: "",
    interviewDuration: "",
    interviewLanguage: "",
  });

  const handlePage = (pageNumber: PageNumbers) => {
    setPage(pageNumber);
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior="keepMounted">
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm
                  handleTab={handlePage}
                  setFormData={setFormData}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleTab={handlePage}
                  setFormData={setFormData}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handleTab={handlePage}
                  setFormData={setFormData}
                />
              </TabPanel>
            </TabPanels>
            <DisplayCard formData={formData}/>
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
