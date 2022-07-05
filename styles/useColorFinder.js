import { COLORS } from "./colors";

export default function useColorFinder(serviceTitle) {
    let servicetext = serviceTitle ? serviceTitle.toLowerCase().replace(/ /g, "") : null;
    if (servicetext === 'tutoring') {
        return `${COLORS.tutorPrimary}`;
    } else if (servicetext === 'shepherding') {
        return `${COLORS.shepherdPrimary}`;
    } else if (servicetext === 'testprep') {
        return `${COLORS.testPrimary}`;
    } else if (servicetext === 'educationalconsulting') {
        return `${COLORS.educationPrimary}`;
    } else {
        return `${COLORS.primaryBlue}`;
    }  
}