import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

const menuData = [
    {
        name: "Dashboard",
        icon: <AccountBalanceIcon />,
        link: "dashboard"
    },
    {
        name: "Organisations",
        icon: <BusinessCenterIcon />,
        link: "organisations"
    },
    {
        name: "Clients",
        icon: <PersonIcon />,
        link: "clients"
    },
    {
        name: "User Management",
        icon: <PeopleIcon />,
        link: "user"
    },
    {
        name: "Policies",
        icon: <DirectionsCarIcon />,
        link: "policies"
    },
    {
        name: "Claims",
        icon: <AirlineSeatReclineExtraIcon />,
        link: "claims"
    },
    {
        name: "Reports",
        icon: <AssessmentIcon />,
        link: "reports"
    }
]

export default menuData;