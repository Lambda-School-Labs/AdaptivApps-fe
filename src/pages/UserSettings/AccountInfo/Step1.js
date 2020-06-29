// React/Reach Router imports
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_1, PROFILE_INFO } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import SaveButton from "../../../theme/LargeFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Query imports
import { GET_RECIPIENTS } from '../../Chat/queries/Chats'
// Auth0 imports
import { useAuth0 } from "../../../config/react-auth0-spa";

// Material-UI imports
import {
  makeStyles,
  Typography,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: '67.5%',
    '& .MuiInputLabel-root': {
      color: "black",
    },
    "& .MuiInputLabel-asterisk": {
      fontSize: '2rem',
      color: 'red',
      fontWeight: 'bolder'
    },
  },
  form: {
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: '100%',
    },
  },
  namePhoneBox: {
    display: "flex",
    marginBottom: "1.6rem",
    "& .MuiTextField-root": {
      width: "36rem",
      height: "4.8rem",
      [theme.breakpoints.down("sm")]: {
        margin: '1.2rem auto'
      },
      [theme.breakpoints.down("xs")]: {
        margin: '1.2rem auto'
      },
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
    },
  },
  firstInput: {
    marginRight: "2.4rem"
  },
  typeSelect: {
  
    height: "4.8rem",
    marginBottom: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      width: "40rem"
    },
    [theme.breakpoints.down("xs")]: {
      width: "40rem"
    },
  },
  em: {
    fontStyle: "italic",
    fontSize: "1.6rem"
  },
  addressBox: {
    display: "flex",
    marginBottom: "1.6rem",
    "& .MuiTextField-root": {
      width: "36rem",
      height: "4.8rem",
      [theme.breakpoints.down("sm")]: {
        margin: '1.2rem auto',
      },
      [theme.breakpoints.down("xs")]: {
        margin: '1.2rem auto',
      },
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
    },
  },
  bioBox: {
    width: "100%",
    "& .MuiTextField-root": {
      width: "100%",
      height: "4.8rem",
    }
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  error: {
    color: 'red',
    fontSize: '2rem',    
    fontVariant: 'all-small-caps',
    fontWeight: 'bold',
    '&:last-child': {
      fontSize: '1.65rem',
      color: 'red',
      marginTop: '1rem',
    }
  },
  errorLabel: {
    marginLeft: '1rem',
    fontSize: '1.65rem',
    color: 'red',
    fontVariant: 'all-small-caps',
    fontWeight: 'bold'
  }
}));

export default function Step1({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_1, {
    variables: { email: userEmail },
  });
  const { data } = useQuery(GET_RECIPIENTS);
  const { data: user } = useQuery(PROFILE_INFO, { variables: { email: userEmail } });  
  const currentUser = user?.profile?.userName


  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const [errorState, setErrorState] = useState();
  const { handleSubmit, setValue, control, errors } = useForm({
    defaultValues: {
      firstName: currentUserInfo && currentUserInfo?.profile?.firstName,
      lastName: currentUserInfo && currentUserInfo?.profile?.lastName,
      userName: currentUserInfo && currentUserInfo?.profile?.userName,
      phoneNumber: currentUserInfo && currentUserInfo?.profile?.phoneNumber,
      address1: currentUserInfo && currentUserInfo?.profile?.address1,
      address2: currentUserInfo && currentUserInfo?.profile?.address2,
      city: currentUserInfo && currentUserInfo?.profile?.city,
      state: currentUserInfo && currentUserInfo?.profile?.state,
      postalCode: currentUserInfo && currentUserInfo?.profile?.postalCode,
      country: currentUserInfo && currentUserInfo?.profile?.country,
      legal: currentUserInfo && currentUserInfo?.profile?.legal,
      bio: currentUserInfo && currentUserInfo?.profile?.bio,
    },
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    if (!loading && !currentUserInfo) setCurrentUserInfo(defaultInfo);
    if (!loading && currentUserInfo) {
      setValue([
        { firstName: currentUserInfo && currentUserInfo?.profile?.firstName },
        { lastName: currentUserInfo && currentUserInfo?.profile?.lastName },
        { userName: currentUserInfo && currentUserInfo?.profile?.userName },
        {
          phoneNumber: currentUserInfo && currentUserInfo?.profile?.phoneNumber,
        },
        { address1: currentUserInfo && currentUserInfo?.profile?.address1 },
        { address2: currentUserInfo && currentUserInfo?.profile?.address2 },
        { city: currentUserInfo && currentUserInfo?.profile?.city },
        { state: currentUserInfo && currentUserInfo?.profile?.state },
        { postalCode: currentUserInfo && currentUserInfo?.profile?.postalCode },
        { country: currentUserInfo && currentUserInfo?.profile?.country },
        { legal: currentUserInfo && currentUserInfo?.profile?.legal },
        { bio: currentUserInfo && currentUserInfo?.profile?.bio },
      ]);
    }
  }, [loading, currentUserInfo, defaultInfo, setValue]);


  // Will update profile and route user to next step in profile wizard
  const onNext = handleSubmit(async data => {
    await updateProfile({
      variables: {
        email: userEmail,
        firstName: data.firstName,
        userName: data.userName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        legal: data.legal,
        bio: data.bio,
      },
    });

    alert("Successfully updated account info!");
    navigate(`/updateaccount/${userEmail}/step2of6`);
  });

  const userNames = []
  data && data.profiles.filter(user => user.userName !== null && user.userName !== '' && user.userName !== currentUser && userNames.push(user.userName.toLowerCase()));

  const validateUsername = () => {
    const userName = control.getValues().userName.toLowerCase();
    if (userNames.includes(userName)) {
      setErrorState(true);
      alert('That username is already taken. Please choose another one!');
  } else setErrorState(false)  ;
};

  // Will update profile and route user back to settings page allowing user to complete profile wizard at a later time
  const onSave = handleSubmit(async data => {
    await updateProfile({
      variables: {
        email: userEmail,
        firstName: data.firstName,
        userName: data.userName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        legal: data.legal,
        bio: data.bio,
      },
    });

    alert("Successfully saved account info!");
    navigate(`/`);
  });

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={1} stepNumber={1} userEmail={userEmail} />
      <form className={classes.form}>
        <Box className={classes.namePhoneBox}>
          <Box>
            <InputLabel required htmlFor="firstName">First Name</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.firstInput}
              name="firstName"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.firstName && <Typography className={classes.error}>first name is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="lastName">Last Name</InputLabel>
            <Controller
              as={<TextField />}
              name="lastName"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.lastName && <Typography className={classes.error}>last name is a required field</Typography>}
          </Box>
        </Box>
        <Box className={classes.namePhoneBox}>
          <Box>
            <InputLabel required htmlFor="userName">Username</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.firstInput}
              name="userName"
              variant="outlined"
              type="text"
              control={control}
              defaultValue=""
              onBlur={validateUsername}
              rules={{ required: true }}
            />
            {errors.userName && <Typography className={classes.error}>username is a required field</Typography>}
            {errorState && <Typography className={classes.error}>Button is disabled until a unique username is chosen</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="phoneNumber">Phone Number</InputLabel>
            <Controller
              as={<TextField />}
              name="phoneNumber"
              variant="outlined"
              type="text"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.phoneNumber && <Typography className={classes.error}>phone number is a required field</Typography>}
          </Box>
        </Box>
        <Box className={classes.addressBox}>
          <Box>
            <InputLabel required htmlFor="address1">Address 1</InputLabel>
            <Controller
              as={<TextField />}
              name="address1"
              type="text"
              className={classes.firstInput}
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.address1 && <Typography className={classes.error}>address is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel htmlFor="address2">Address 2</InputLabel>
            <Controller
              as={<TextField />}
              name="address2"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
            />
          </Box>
        </Box>
        <Box className={classes.addressBox}>
          <Box>
            <InputLabel required htmlFor="city">City</InputLabel>
            <Controller
              as={<TextField />}
              name="city"
              type="text"
              className={classes.firstInput}
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.city && <Typography className={classes.error}>city is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="state">State</InputLabel>
            <Controller
              as={<TextField />}
              name="state"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.state && <Typography className={classes.error}>state is a required field</Typography>}
          </Box>
        </Box>
        <Box className={classes.addressBox}>
          <Box>
            <InputLabel required htmlFor="postal code">Postal Code</InputLabel>
            <Controller
              as={<TextField />}
              name="postalCode"
              type="text"
              className={classes.firstInput}
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.postalCode && <Typography className={classes.error}>postal code is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="country">Country</InputLabel>
            <Controller
              as={<TextField />}
              name="country"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.country && <Typography className={classes.error}>country is a required field</Typography>}
          </Box>
        </Box>
        <InputLabel required htmlFor="legal">Are you over 18 years old?</InputLabel>
        {errors.legal && <Typography className={classes.error}>Please make a selection</Typography>}
        <Controller
          as={
            <Select className={classes.typeSelect}>
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="legal"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        <InputLabel htmlFor="bio">
          If you're comfortable sharing, tell us your story
        </InputLabel>
        <Controller
          as={<TextField />}
          name="bio"
          type="text"
          variant="outlined"
          className={classes.bioBox}
          control={control}
          defaultValue=""
          multiline
          rows="8"
        />
        <Typography className={classes.error}>* required field</Typography>
        <Box className={classes.btnBox}>
          <SaveButton
            label={"Save & Quit"}
            ariaLabel="Click to save and continue later."
            onClick={onSave}
          />
          <NextButton
            label={"Next"}
            ariaLabel="Click here to complete step 1 and move onto step 2."
            onClick={onNext}
          />
        </Box>
      </form>
    </Box>
  );
}