import axios from 'axios';

const BASE_URL = "http://localhost:8000/api"

export default axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const fetchJobPostingList = async () => {
            const jobPostingList = await axios.get(`${BASE_URL}/jobs`);
           // console.log(jobPostingList);
            return jobPostingList.data;
};

export const fetchJobPostingById = async (id) => {
    const result = await axios.get(`${BASE_URL}/jobs/${id}`);
    return result.data;
};

// export const fetchDoses = async () => {
//         const doseList = await axios.get(`${BASE_URL}/doses`);
//         return doseList.data.data;
// };
// export const deleteDose = async (id) => {
//     const result = await axios.delete(`${BASE_URL}/doses/${id}`);
//     return result;
// };

// export const fetchDrugCodes = async () => {
//     const drugCodeList = await axios.get(`${BASE_URL}/drugcodes`);
//     return drugCodeList.data.data;
// };

// export const fetchDrugCodesByDescription = async (desc) => {
//     const drugCodeList = await axios.get(`${BASE_URL}/drugcodesbydescription/${desc}`);
//     return drugCodeList.data.data;
// };

// export const deleteDrugCode = async (id) => {
//     const result = await axios.delete(`${BASE_URL}/drugcodes/${id}`);
//     return result;
// };
// export const fetchDrugs = async () => {
//     const drugList = await axios.get(`${BASE_URL}/drugs`);
//     return drugList.data.data;
// };
// export const deleteDrug = async (id) => {
//     const result = await axios.delete(`${BASE_URL}/drugs/${id}`);
//     return result;
// };

// export const fetchPatients = async () => {
//     const patientList = await axios.get(`${BASE_URL}/patients`);
//     return patientList.data.data;
// };
// export const deletePatient = async (id) => {
//     const result = await axios.delete(`${BASE_URL}/patients/${id}`);
//     return result;
// };
// export const fetchPatientsByName = async (name) => {
//     const result = await axios.get(`${BASE_URL}/patients/${name}`);
//     return result.data.data;
// };



//window.fetchD = fetchDoses
